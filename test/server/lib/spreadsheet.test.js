const chai = require('chai');
const assert = chai.assert;
const Spreadsheet = require('../../../server/lib/spreadsheet');
const fs = require('fs');

describe('Spreadsheet', () => {
  it('.read2014p', () => {
    const result = Spreadsheet.read2014p();

    // console.log(result);
  });

  it('.toJSON', () => {
    const result = Spreadsheet.toJSON('2014-p');
    console.log(result);
  });

  it.skip('.toJSONStream', async () => {
    await Spreadsheet.toJSONStream('2014');
  });
});
