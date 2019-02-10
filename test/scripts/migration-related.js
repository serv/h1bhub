const assert = require('assert');
const MigrationRelated = require('../../scripts/migration-related');

describe('MigrationRelated', () => {
  it('.getFirstLineJSON', async () => {
    const json = await MigrationRelated.getFirstLineJSON(2018);
    console.log(json);
    assert.equal(typeof json, 'object');
  });

  it('.getArrayOfAttributes', async () => {
    const array = await MigrationRelated.getArrayOfAttributes(2014);

    assert(array.length > 0);
  });

  it.only('.getArrayOfAttributes', () => {
    MigrationRelated.generateMigrationCode();
  });
});
