const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, 'NutraGrow_30000_Letter_Only_Discount_Codes.xlsx');
const outputPath = path.join(__dirname, 'supabase_seed.sql');

console.log('Reading Excel file...');
const workbook = xlsx.readFile(excelPath);

let sqlStatements = [];
// We want to bulk insert for performance, but PostgreSQL limits parameters.
// Doing it in chunks of 1000 is safe.
const BATCH_SIZE = 1000;

function generateInserts(sheetName, discountPercentage) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return;

  // The first row is title, second is empty, third is header (row index 2)
  const data = xlsx.utils.sheet_to_json(sheet, { range: 2 });
  // Expected columns: "Coupon Code", "Discount", "Maximum Uses", "Status"
  
  const codes = [];
  data.forEach(row => {
    const code = row['Coupon Code'];
    if (code) {
      codes.push(`('${code}', ${discountPercentage})`);
    }
  });

  for (let i = 0; i < codes.length; i += BATCH_SIZE) {
    const chunk = codes.slice(i, i + BATCH_SIZE);
    sqlStatements.push(`INSERT INTO discount_codes (code, discount_percentage) VALUES\n${chunk.join(',\n')}\nON CONFLICT (code) DO NOTHING;`);
  }
}

console.log('Generating SQL for 10% codes...');
generateInserts('10 Percent', 10);
console.log('Generating SQL for 15% codes...');
generateInserts('15 Percent', 15);
console.log('Generating SQL for 20% codes...');
generateInserts('20 Percent', 20);

fs.writeFileSync(outputPath, sqlStatements.join('\n\n'));
console.log(`Successfully generated ${outputPath} with ${sqlStatements.length} batch insert statements.`);
