const XLSX = require('xlsx');
const XlsxStreamReader = require('xlsx-stream-reader');
const fs = require('fs');
const appConfig = require('./app-config');
const _ = require('lodash/core');
const moment = require('moment');
const { getJsDateFromExcel } = require('excel-date-to-js');

module.exports = class Spreadsheet {
  static read2014p() {
    const fileLocation = appConfig.h1bData('2014-p');
    const workbook = XLSX.readFile(fileLocation);
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNames[0]];
    const headers = [
      'LCA_CASE_NUMBER',
      'STATUS',
      'LCA_CASE_SUBMIT',
      'DECISION_DATE',
      'VISA_CLASS',
      'LCA_CASE_EMPLOYMENT_START_DATE',
      'LCA_CASE_EMPLOYMENT_END_DATE',
      'LCA_CASE_EMPLOYER_NAME',
      'LCA_CASE_EMPLOYER_ADDRESS',
      'LCA_CASE_EMPLOYER_CITY',
      'LCA_CASE_EMPLOYER_STATE',
      'LCA_CASE_EMPLOYER_POSTAL_CODE',
      'LCA_CASE_SOC_CODE',
      'LCA_CASE_SOC_NAME',
      'LCA_CASE_JOB_TITLE',
      'LCA_CASE_WAGE_RATE_FROM',
      'LCA_CASE_WAGE_RATE_TO',
      'LCA_CASE_WAGE_RATE_UNIT',
      'FULL_TIME_POS',
      'TOTAL_WORKERS',
      'LCA_CASE_WORKLOC1_CITY',
      'LCA_CASE_WORKLOC1_STATE',
      'PW_1',
      'PW_UNIT_1',
      'PW_SOURCE_1',
      'OTHER_WAGE_SOURCE_1',
      'YR_SOURCE_PUB_1',
      'LCA_CASE_WORKLOC2_CITY',
      'LCA_CASE_WORKLOC2_STATE',
      'PW_2',
      'PW_UNIT_2',
      'PW_SOURCE_2',
      'OTHER_WAGE_SOURCE_2',
      'YR_SOURCE_PUB_2',
      'LCA_CASE_NAICS_CODE'
    ];
    return XLSX.utils.sheet_to_json(worksheet, { headers });
  }

  static toJSON(year) {
    const fileLocation = appConfig.h1bData(year);
    const workbook = XLSX.readFile(fileLocation);
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNames[0]];
    const headers = appConfig.h1bDataHeaders(year);
    return XLSX.utils.sheet_to_json(worksheet, { headers });
  }

  static toJSONStream(year) {
    const fileLocation = appConfig.h1bData(year);
    const writeLocation = appConfig.h1bDataWrite(year);
    const workBookReader = new XlsxStreamReader();
    const xlsxAttributes = appConfig.h1bDateHeaderWithTypes(year);
    let headers;

    const rstream = fs.createReadStream(fileLocation);
    const wstream = fs.createWriteStream(writeLocation);

    return new Promise((resolve, reject) => {
      workBookReader.on('worksheet', function(workSheetReader) {
        if (workSheetReader.id > 1) {
          // we only want first sheet
          workSheetReader.skip();
          return;
        }

        // if we do not listen for rows we will only get end event
        // and have infor about the sheet like row count
        workSheetReader.on('row', function(row) {
          if (parseInt(row.attributes.r) === 1) {
            // do something with row 1 like save as column names
            // headers = _.compact(row.values);
            headers = _.map(row.values, val => {
              if (!val) {
                return;
              }

              return val
                .trim()
                .replace(/\s/g, '_')
                .toLowerCase();
            });
          } else {
            // second param to forEach colNum is very important as
            // null columns are not defined in the array, ie sparse array
            // row.values.forEach(function(rowVal, colNum) {
            //   // do something with row values
            //   // console.log(row);
            // });

            const json = Spreadsheet.jsonMaker(
              row.values,
              headers,
              xlsxAttributes
            );
            wstream.write(JSON.stringify(json));
            wstream.write('\n');
            // console.log(row.attributes.r);
          }
        });
        workSheetReader.on('end', function() {
          console.log(workSheetReader.rowCount);
          wstream.end();
          return resolve();
        });

        // call process after registering handlers
        workSheetReader.process();
      });

      rstream.pipe(workBookReader);
    });
  }

  static jsonMaker(row, headers, xlsxAttributes) {
    const obj = {};

    _.forEach(headers, (value, index) => {
      if (!value) {
        return;
      }

      if (row[index] !== undefined) {
        const headerType = xlsxAttributes[value];

        if (headerType === 'date') {
          if (_.isEmpty(row[index])) {
            obj[value] = null;
          }

          if (Number(row[index])) {
            obj[value] = getJsDateFromExcel(row[index]);
          } else {
            obj[value] = row[index];
          }
        } else if (headerType === 'datestring') {
          obj[value] = moment(row[index], 'MM/DD/YYYY');
        } else if (headerType === 'usd') {
          // Save all currency value in cents, and only deal with ints
          obj[value] = parseInt(100 * parseFloat(row[index]));
        } else if (headerType === 'usdrange') {
          if (!row[index]) {
            obj['wage_rate_of_pay'] = null;
            obj['wage_rate_of_pay_from'] = null;
            obj['wage_rate_of_pay_to'] = null;
            return;
          }

          obj['wage_rate_of_pay'] = row[index];
          const split = row[index].split('-');

          if (split.length > 0) {
            obj['wage_rate_of_pay_from'] = parseInt(
              100 * parseFloat(split[0].trim())
            );
            obj['wage_rate_of_pay_to'] = split[1].trim()
              ? parseInt(100 * parseFloat(split[1].trim()))
              : null;
          }
        } else if (headerType === 'string') {
          let newHeader = value === 'h-1b_dependent' ? 'h1b_dependent' : value;

          obj[newHeader] = row[index].replace(/[\\"\t\n\r\f]+/g, '');
        } else if (headerType === 'integer') {
          obj[value] = row[index] ? parseInt(row[index]) : 0;
        } else {
          // replace remove doublequotes
          obj[value] = row[index];
        }
      } else {
        obj[value] = null;
      }
    });
    return obj;
  }
};
