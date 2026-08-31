const fs = require('fs');
const path = require('path');

const appFile = path.join(process.cwd(), 'dist', 'app.js');
const indexFile = path.join(process.cwd(), 'dist', 'index.html');

let app = fs.readFileSync(appFile, 'utf8');
let index = fs.readFileSync(indexFile, 'utf8');

const required = [
  'staffTrialButton',
  '体験参加者',
  'ABC-STAFF-TRIALS-v1',
  'restoreAccess()'
];

for (const marker of required) {
  if (!app.includes(marker)) {
    throw new Error(`スタッフ用体験参加者機能がビルドに含まれていません: ${marker}`);
  }
}

const version = '20260831-trials-v3';
index = index.replace(/<script src="\/app\.js(?:\?[^\"]*)?" defer><\/script>/, `<script src="/app.js?v=${version}" defer></script>`);

if (!index.includes(`/app.js?v=${version}`)) {
  throw new Error('app.js のキャッシュ更新指定に失敗しました。');
}

fs.writeFileSync(indexFile, index, 'utf8');
