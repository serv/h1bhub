const Spreadsheet = require('../server/lib/spreadsheet');
const years = ['2014', '2015', '2016', '2017', '2018'];
const selected = process.argv.slice(2)[0];

async function main() {
  if (!selected) {
    for (let i = 0; i < years.length; i++) {
      await Spreadsheet.toJSONStream(years[i]);
    }

    return;
  }

  if (selected && years.indexOf(selected) < 0) {
    throw new Error('invalid year');
  }

  return Spreadsheet.toJSONStream(years[i]);
}

main();
