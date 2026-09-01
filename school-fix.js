const fs = require('fs');
const path = require('path');

const appFile = path.join(process.cwd(), 'dist', 'app.js');
const indexFile = path.join(process.cwd(), 'dist', 'index.html');
let source = fs.readFileSync(appFile, 'utf8');

// 学校ごとの選手所属を正しい内容に保つ。
const playerPattern = /"新津第一中":\[[^\]]*\],"新津第二中":\[[^\]]*\]/;
const playerReplacement = '"新津第一中":["渡辺あかり","しずく","ひまり","ゆうき"],"新津第二中":["せり","あき"]';

if (!playerPattern.test(source)) {
  throw new Error('新津第一中・新津第二中の所属データを見つけられませんでした。');
}
source = source.replace(playerPattern, playerReplacement);

// 指定日の学校行事を完全に除外し、五泉中の「きなせや祭」を追加する。
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

// ビルド成果物を検証。指定日が1件でも残っていたら公開を失敗させる。
const finalSchoolMatch = source.match(schoolPattern);
if (!finalSchoolMatch) throw new Error('修正後の学校行事データを確認できませんでした。');
const finalSchoolEvents = JSON.parse(finalSchoolMatch[1]);
for (const date of hiddenDates) {
  if (finalSchoolEvents.some((event) => event.date === date)) {
    throw new Error(`削除対象の学校行事が残っています: ${date}`);
  }
}
if (!finalSchoolEvents.some((event) => event.date === '2026-10-25' && event.school === '五泉中' && event.title === 'きなせや祭')) {
  throw new Error('10/25 五泉中「きなせや祭」が追加されていません。');
}

fs.writeFileSync(appFile, source, 'utf8');

// iPhoneのホーム画面追加版などで古いapp.jsが残っても更新されるよう、
// app.jsをキャッシュバストし、表示時にも同じ除外処理をかける。
let indexSource = fs.readFileSync(indexFile, 'utf8');
const runtimeFix = `
<script id="schoolEventRuntimeFix">
window.addEventListener('DOMContentLoaded', function () {
  try {
    const hidden = new Set(['2026-09-14','2026-09-15','2026-10-09','2026-10-11','2026-10-13','2026-10-14']);
    if (typeof SCHOOL_EVENTS === 'undefined') return;
    for (let i = SCHOOL_EVENTS.length - 1; i >= 0; i -= 1) {
      if (hidden.has(SCHOOL_EVENTS[i].date)) SCHOOL_EVENTS.splice(i, 1);
    }
    if (!SCHOOL_EVENTS.some((event) => event.date === '2026-10-25' && event.school === '五泉中' && event.title === 'きなせや祭')) {
      SCHOOL_EVENTS.push({ date:'2026-10-25', school:'五泉中', title:'きなせや祭' });
    }
    SCHOOL_EVENTS.sort((a, b) => a.date.localeCompare(b.date) || a.school.localeCompare(b.school, 'ja'));
    if (typeof render === 'function') render();
  } catch (error) {
    console.error('school event runtime fix failed', error);
  }
});
</script>`;

const appScriptPattern = /<script src="\/app\.js(?:\?[^\"]*)?" defer><\/script>/;
if (!appScriptPattern.test(indexSource)) {
  throw new Error('index.html の app.js 読み込みタグを見つけられませんでした。');
}
indexSource = indexSource.replace(
  appScriptPattern,
  '<script src="/app.js?v=20260901-3" defer></script>' + runtimeFix
);
fs.writeFileSync(indexFile, indexSource, 'utf8');
