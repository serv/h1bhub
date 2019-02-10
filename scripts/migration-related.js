const _ = require('lodash/core');
const firstline = require('firstline');
const path = require('path');
const appConfig = require('../server/lib/app-config');

module.exports = class MigrationRelated {
  static filepath(year) {
    return path.join('data', `h1b-${year}.json`);
  }

  static async getFirstLineJSON(year) {
    const location = MigrationRelated.filepath(year);
    const fl = await firstline(location);
    console.log(fl);
    return JSON.parse(fl);
  }

  static async getArrayOfAttributes(year) {
    const json = await MigrationRelated.getFirstLineJSON(year);
    return Object.keys(json);
  }

  static generateMigrationCode() {
    const years = ['2014', '2015', '2016', '2017', '2018'];

    _.each(years, y => {
      const common = `node_modules/.bin/sequelize model:generate --name h1b${y} --attributes`;
      const attributesObj = appConfig.h1bDateHeaderWithTypes(y);
      const attrAr = _.map(attributesObj, (val, key) => {
        let attType = '';

        if (val === 'datestring') {
          attType = 'date';
        } else if (val === 'usd') {
          attType = 'integer';
        } else if (val === 'usdrange') {
          attType = 'string';
        } else if (val === 'date') {
          attType = 'date';
        } else if (val === 'integer') {
          attType = 'integer';
        } else if (val === 'string') {
          attType = 'string';
        } else {
          console.log(val, key);
        }

        return [key, attType].join(':');
      });

      console.log(`${common} ${attrAr.join(',')}`);
    });
  }

  static columnsCommas(year) {
    const array = Object.keys(appConfig.h1bDateHeaderWithTypes(year));
    console.log(array.join(', '));
  }

  static migrationObj(year) {
    const obj = {
      '2014': {
        lca_case_number: 'string',
        status: 'string',
        lca_case_submit: 'date',
        decision_date: 'date',
        visa_class: 'string',
        lca_case_employment_start_date: 'date',
        lca_case_employment_end_date: 'date',
        lca_case_employer_name: 'string',
        lca_case_employer_address: 'string',
        lca_case_employer_city: 'string',
        lca_case_employer_state: 'string',
        lca_case_employer_postal_code: 'string',
        lca_case_soc_code: 'string',
        lca_case_soc_name: 'string',
        lca_case_job_title: 'string',
        lca_case_wage_rate_from: 'integer',
        lca_case_wage_rate_to: 'integer',
        lca_case_wage_rate_unit: 'string',
        full_time_pos: 'string',
        total_workers: 'integer',
        lca_case_workloc1_city: 'string',
        lca_case_workloc1_state: 'string',
        pw_1: 'integer',
        pw_unit_1: 'string',
        pw_source_1: 'string',
        other_wage_source_1: 'string',
        yr_source_pub_1: 'integer',
        lca_case_workloc2_city: 'string',
        lca_case_workloc2_state: 'string',
        pw_2: 'integer',
        pw_unit_2: 'string',
        pw_source_2: 'string',
        other_wage_source_2: 'string',
        yr_source_pub_2: 'string',
        lca_case_naics_code: 'integer'
      }
    };

    return obj[year];
  }
};
