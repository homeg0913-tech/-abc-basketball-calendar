const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'dist', 'app.js');
let source = fs.readFileSync(file, 'utf8');

const pattern = /"新津第一中":\[[^\]]*\],"新津第二中":\[[^\]]*\]/;
const replacement = '"新津第一中":["せり","あき"],"新津第二中":["渡辺あかり","しずく","ひまり","ゆうき"]';

if (!pattern.test(source)) {
  throw new Error('新津第一中・新津第二中の所属データを見つけられませんでした。');
}

source = source.replace(pattern, replacement);
fs.writeFileSync(file, source, 'utf8');
