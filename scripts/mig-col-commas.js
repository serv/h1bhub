const MigrationRelated = require('./migration-related');

if (process.argv.length < 3) {
  MigrationRelated.columnsCommas(2014);
} else {
  const year = process.argv[2];
  const years = [2014, 2015, 2016, 2017, 2018];

  if (years.indexOf(parseInt(year)) < 0) {
    throw new Error('Invalid year.');
  }

  MigrationRelated.columnsCommas(year);
}
