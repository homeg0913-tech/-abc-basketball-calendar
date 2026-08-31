const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'dist', 'app.js');
let source = fs.readFileSync(file, 'utf8');

if (!source.includes('staffTrialButton') || !source.includes('ABC-STAFF-TRIALS-v1')) {
  throw new Error('体験参加者のスタッフ認証機能が見つかりません。');
}

const detailExtension = `
;(() => {
  'use strict';
  const TRIAL_DATES = new Set(['2026-08-17','2026-08-27','2026-08-31']);
  let observer = null;

  function ensureStyle() {
    if (document.getElementById('trialDetailEntryStyle')) return;
    const style = document.createElement('style');
    style.id = 'trialDetailEntryStyle';
    style.textContent = [
      '#staffTrialButton{display:none!important}',
      '#staffTrialDetailEntry{width:100%;min-height:52px;border:0;border-radius:14px;background:#edf3f0;color:#26342e;font-size:14px;font-weight:900;margin-top:12px;padding:12px 14px;display:flex;align-items:center;justify-content:center;gap:8px}',
      '#staffTrialDetailEntry.authenticated{background:#e7f4ef;color:#086044}',
      '@media(max-width:480px){#staffTrialDetailEntry{min-height:50px;font-size:13px}}'
    ].join('');
    document.head.append(style);
  }

  function currentDate() {
    const node = document.getElementById('detailDate');
    return (node?.textContent || '').trim().slice(0, 10);
  }

  function addEntry() {
    const detail = document.getElementById('detail');
    const body = document.getElementById('detailBody');
    if (!detail?.classList.contains('show') || !body) return;

    const date = currentDate();
    const existing = document.getElementById('staffTrialDetailEntry');
    if (!TRIAL_DATES.has(date)) {
      existing?.remove();
      return;
    }
    if (existing?.dataset.date === date) return;
    existing?.remove();

    const button = document.createElement('button');
    button.id = 'staffTrialDetailEntry';
    button.dataset.date = date;
    button.type = 'button';
    button.textContent = '🔒 体験参加者（スタッフのみ）';
    button.addEventListener('click', () => {
      const hiddenStaffButton = document.getElementById('staffTrialButton');
      if (hiddenStaffButton) hiddenStaffButton.click();
    });

    const attendanceButton = [...detail.querySelectorAll('button')]
      .find((node) => (node.textContent || '').includes('スタッフ参加状況'));
    if (attendanceButton?.parentNode) attendanceButton.parentNode.insertBefore(button, attendanceButton);
    else body.append(button);
  }

  function start() {
    ensureStyle();
    const detail = document.getElementById('detail');
    if (!detail) return;
    addEntry();
    observer = new MutationObserver(addEntry);
    observer.observe(detail, { attributes:true, childList:true, subtree:true, characterData:true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();
})();
`;

source += detailExtension;
fs.writeFileSync(file, source, 'utf8');
