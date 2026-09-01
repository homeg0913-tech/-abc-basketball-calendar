const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'dist', 'index.html');
let source = fs.readFileSync(file, 'utf8');

const version = '20260901-school-events-v2';
source = source.replace(/src=["']\/app\.js(?:\?[^"']*)?["']/g, `src="/app.js?v=${version}"`);

fs.writeFileSync(file, source, 'utf8');
