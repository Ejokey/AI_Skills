/* Кодирует assets/*.png|jpg в base64 -> img.json */
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const files = fs.readdirSync(assetsDir).filter((f) => /\.(png|jpe?g)$/i.test(f));

const out = {};
for (const f of files) {
  const buf = fs.readFileSync(path.join(assetsDir, f));
  const ext = path.extname(f).toLowerCase();
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
  out[f] = `data:${mime};base64,${buf.toString('base64')}`;
}

fs.writeFileSync(path.join(__dirname, 'img.json'), JSON.stringify(out));
console.log('img.json built,', files.length, 'images');
