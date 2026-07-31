import fs from 'fs';
import path from 'path';

const dir = '/Users/alex/pi/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace exact occurrences
  content = content.replace(/ lei</g, ' €<');
  content = content.replace(/ lei\n/g, ' €\n');
  content = content.replace(/ lei"/g, ' €"');
  content = content.replace(/ lei'/g, " €'");
  content = content.replace(/ lei}/g, " €}");
  content = content.replace(/ Lei</g, ' €<');
  content = content.replace(/ LEI'/g, " €'");
  
  // Specific phrases
  content = content.replace(/PREȚ \(LEI \/ €\)/g, 'PREȚ (€)');
  content = content.replace(/PREȚ \(LEI\)/g, 'PREȚ (€)');
  content = content.replace(/SALARIU ESTIMAT \(LEI\)/g, 'SALARIU ESTIMAT (€)');
  content = content.replace(/Preț Redus \(lei\)/g, 'Preț Redus (€)');
  content = content.replace(/Preț Inițial \(lei\)/g, 'Preț Inițial (€)');
  content = content.replace(/ 99 lei/g, ' 99 €');
  content = content.replace(/} lei</g, '} €<');
  content = content.replace(/} lei\b/g, '} €');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
