const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'dist', 'app.js');
let source = fs.readFileSync(file, 'utf8');

// 学校ごとの選手所属を正しい内容に保つ。
const playerPattern = /"新津第一中":\[[^\]]*\],"新津第二中":\[[^\]]*\]/;
const playerReplacement = '"新津第一中":["渡辺あかり","しずく","ひまり","ゆうき"],"新津第二中":["せり","あき"]';

if (!playerPattern.test(source)) {
  throw new Error('新津第一中・新津第二中の所属データを見つけられませんでした。');
}
source = source.replace(playerPattern, playerReplacement);

// 指定日の学校行事を非表示にし、五泉中の「きなせや祭」を追加する。
const schoolPattern = /"schoolEvents":(\[[\s\S]*?\]),"playerAbsences":/;
const schoolMatch = source.match(schoolPattern);
if (!schoolMatch) {
  throw new Error('学校行事データを見つけられませんでした。');
}

const hiddenDates = new Set([
  '2026-09-14',
  '2026-09-15',
  '2026-10-09',
  '2026-10-11',
  '2026-10-13',
  '2026-10-14'
]);

const schoolEvents = JSON.parse(schoolMatch[1])
  .filter((event) => !hiddenDates.has(event.date));

if (!schoolEvents.some((event) => event.date === '2026-10-25' && event.school === '五泉中' && event.title === 'きなせや祭')) {
  schoolEvents.push({ date:'2026-10-25', school:'五泉中', title:'きなせや祭' });
}

schoolEvents.sort((a, b) => a.date.localeCompare(b.date) || a.school.localeCompare(b.school, 'ja'));
source = source.replace(schoolPattern, `"schoolEvents":${JSON.stringify(schoolEvents)},"playerAbsences":`);

fs.writeFileSync(file, source, 'utf8');
