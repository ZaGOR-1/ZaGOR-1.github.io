const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const translationsPath = path.join(__dirname, 'src', 'data', 'translations.js');
const translationsContent = fs.readFileSync(translationsPath, 'utf8');

const translationsMatch = translationsContent.match(/export const translations = ({[\s\S]*?});/);
const skillsDataMatch = translationsContent.match(/export const skillsData = (\[[\s\S]*?\]);/);

if (!translationsMatch || !skillsDataMatch) {
  console.error('Could not parse translations.js');
  process.exit(1);
}

const translations = eval(`(${translationsMatch[1]})`);
const skillsData = eval(`(${skillsDataMatch[1]})`);

const data = translations.en;

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

const outputPath = path.join(__dirname, 'public', 'resume.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

const primaryColor = '#3B82F6';
const textColor = '#1F2937';
const lightGray = '#6B7280';

doc.fontSize(28).fillColor(primaryColor).text(data.hero.name, { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(16).fillColor(lightGray).text(data.hero.role, { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(10).fillColor(textColor).text(data.hero.description, { align: 'center', width: 500 });

doc.moveDown(1.5);

doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke(primaryColor);
doc.moveDown(1);

doc.fontSize(16).fillColor(primaryColor).text('About Me');
doc.moveDown(0.5);
doc.fontSize(10).fillColor(textColor).text(data.about.bio1, { align: 'justify' });
doc.moveDown(0.3);
doc.text(data.about.bio2, { align: 'justify' });

doc.moveDown(1);
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke(primaryColor);
doc.moveDown(1);

doc.fontSize(16).fillColor(primaryColor).text('Skills');
doc.moveDown(0.5);

skillsData.forEach((category, idx) => {
  const categoryName = data.skills.categories[category.category] || category.category;
  doc.fontSize(12).fillColor(textColor).text(categoryName, { underline: true });
  doc.moveDown(0.3);
  
  category.skills.forEach(skill => {
    doc.fontSize(10).fillColor(textColor).text(`• ${skill.name} - ${skill.level}%`, { indent: 20 });
  });
  
  if (idx < skillsData.length - 1) {
    doc.moveDown(0.5);
  }
});

doc.moveDown(1);
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke(primaryColor);
doc.moveDown(1);

doc.fontSize(16).fillColor(primaryColor).text('Education');
doc.moveDown(0.5);
doc.fontSize(12).fillColor(textColor).text(data.education.university);
doc.fontSize(10).fillColor(lightGray).text(data.education.degree);
doc.fontSize(9).fillColor(lightGray).text(data.education.period);
doc.moveDown(0.3);
doc.fontSize(9).fillColor(textColor).text(data.education.gpa);

doc.moveDown(0.5);
doc.fontSize(10).fillColor(textColor).text(data.education.relevantCourses, { underline: true });
doc.moveDown(0.2);
data.education.courses.forEach(course => {
  doc.fontSize(9).fillColor(textColor).text(`• ${course}`, { indent: 20 });
});

if (doc.y > 650) {
  doc.addPage();
}

doc.moveDown(1);
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke(primaryColor);
doc.moveDown(1);

doc.fontSize(16).fillColor(primaryColor).text('Experience');
doc.moveDown(0.5);

data.experience.list.forEach((exp, idx) => {
  if (doc.y > 650) {
    doc.addPage();
  }
  
  doc.fontSize(12).fillColor(textColor).text(exp.position);
  doc.fontSize(10).fillColor(lightGray).text(`${exp.company} | ${exp.period}`);
  doc.moveDown(0.3);
  
  exp.description.forEach(item => {
    doc.fontSize(9).fillColor(textColor).text(`• ${item}`, { indent: 20 });
  });
  
  if (idx < data.experience.list.length - 1) {
    doc.moveDown(0.7);
  }
});

doc.moveDown(1);
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke(primaryColor);
doc.moveDown(1);

doc.fontSize(16).fillColor(primaryColor).text('Contact Information');
doc.moveDown(0.5);
doc.fontSize(10).fillColor(textColor).text(`${data.contact.info.location}: ${data.contact.info.locationValue}`);

doc.end();

stream.on('finish', () => {
  console.log('✅ Resume PDF generated successfully at public/resume.pdf');
});

stream.on('error', (err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
