const fs = require('fs');
const path = require('path');

const encrypted = Object.freeze({
  salt: '5py1GCg7AzmwV+K3j0U7/Q==',
  iv: 'P1Cok11+VN7Y0YnG',
  ciphertext: 'HqFAPsccC4SL6LGnmU+SqZPM+TMVRNXQ55fr90SbtfLmtCPdcLd4oUkWnXjM/uZR9zSQAlfCQWuP5FPli2gZIssNcZB6/dqNEJpx5tVDHuD2eUf45jvOTQ5Pqzsor3MOL3QspLRpk4v9DeJ+T4wgUjGgC6OxpbA5Os2nNL2vJ+eHxqGU2/8/EUZtCYZ7I+0dSSex95zvSfQ2v6vYON+E1sG4Vz9SZNoFAV56C5psBFLTlMCsH/xiN6mIo2sls3qCqGgjF6K4vN7w8FLXgc1nVKMgKKhEfKPu+lRO/8QpTjLnkGChygcz9aq61Qwn0cd4ZCOfYNAGJFAXmoAqgwifgTn3S6ryJn7Y9e2KQt1Cg2UTF1kEQM01JYCLOUgdC3yeUAZGlk1DOSBY/sher2IRvqhKd0VrFjoDZg1g0fjip9mXRzecfvimdgBwKIf9C8FhNEDTryzoRS/0NOC1MjWrS82Xocbf5NZorxgJ2+0iWeDRQS+bz+jIiTiTQhm0qKS+hT3OrDcM6jCgPKqmzVzHiDMg/54bSOqz9GqLurnxoxyCdibJU9VS+lr1kGM0Bkkq4sa1EVB8kE5hMxaVDnel2+hhhI1tBbU8Lmu61SCk0tcLE+w+nnskJnZgsOErVbFDwzeg9b/c7tPXA528gedkUbFVX4y2Ir2UThol+PAp7daIXFlungDcUGReM+2r7uH3jEVSGP59a7pLy6Vt5LJDPb50L0UDpMBg6NgouBCNtswq+vM=',
  iterations: 350000,
  aad: 'ABC-STAFF-TRIALS-v1'
});

const extension = `
;(() => {
  'use strict';

  const CONFIG = ${JSON.stringify(encrypted)};
  const KEY_STORAGE = 'abc_staff_trials_key_v1';
  const UNTIL_STORAGE = 'abc_staff_trials_until_v1';
  const ACCESS_DAYS = 30;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let staffData = null;
  let detailObserver = null;

  function bytesFromBase64(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  function base64FromBytes(bytes) {
    let binary = '';
    for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
    return btoa(binary);
  }

  async function deriveKey(pin) {
    const material = await crypto.subtle.importKey('raw', encoder.encode(pin), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name:'PBKDF2', salt:bytesFromBase64(CONFIG.salt), iterations:CONFIG.iterations, hash:'SHA-256' },
      material,
      { name:'AES-GCM', length:256 },
      true,
      ['decrypt']
    );
  }

  async function decryptData(key) {
    const plain = await crypto.subtle.decrypt(
      { name:'AES-GCM', iv:bytesFromBase64(CONFIG.iv), additionalData:encoder.encode(CONFIG.aad) },
      key,
      bytesFromBase64(CONFIG.ciphertext)
    );
    return JSON.parse(decoder.decode(plain));
  }

  async function cacheKey(key) {
    const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key));
    localStorage.setItem(KEY_STORAGE, base64FromBytes(raw));
    localStorage.setItem(UNTIL_STORAGE, String(Date.now() + ACCESS_DAYS * 24 * 60 * 60 * 1000));
  }

  async function loadCachedKey() {
    const until = Number(localStorage.getItem(UNTIL_STORAGE) || 0);
    const saved = localStorage.getItem(KEY_STORAGE);
    if (!saved || until <= Date.now()) return null;
    return crypto.subtle.importKey('raw', bytesFromBase64(saved), { name:'AES-GCM' }, true, ['decrypt']);
  }

  function clearAccess() {
    localStorage.removeItem(KEY_STORAGE);
    localStorage.removeItem(UNTIL_STORAGE);
    staffData = null;
    document.getElementById('staffTrialFold')?.remove();
    document.getElementById('staffTrialDetail')?.remove();
    const button = document.getElementById('staffTrialButton');
    if (button) button.textContent = 'スタッフ';
  }

  function make(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function groups() {
    const result = new Map();
    for (const participant of staffData?.trialParticipants || []) {
      if (!result.has(participant.date)) result.set(participant.date, []);
      result.get(participant.date).push(participant);
    }
    return [...result.entries()].sort(([a], [b]) => a.localeCompare(b));
  }

  function friendlyDate(value) {
    const date = new Date(value + 'T00:00:00');
    const day = ['日','月','火','水','木','金','土'][date.getDay()];
    return (date.getMonth() + 1) + '/' + date.getDate() + '(' + day + ')';
  }

  function installStyles() {
    if (document.getElementById('staffTrialStyles')) return;
    const style = document.createElement('style');
    style.id = 'staffTrialStyles';
    style.textContent = [
      '#staffTrialButton{margin-left:auto;border:0;border-radius:9px;background:#086044;color:#fff;padding:7px 10px;font-size:10px;font-weight:900;line-height:1;min-height:30px}',
      '#staffTrialModal{z-index:80}',
      '#staffTrialModal .staff-login{display:grid;gap:9px}',
      '#staffTrialModal label{display:grid;gap:5px;color:#42524b;font-size:11px;font-weight:800}',
      '#staffTrialModal input{width:100%;min-height:46px;border:1px solid #cbd9d2;border-radius:10px;padding:10px 12px;background:#fff;color:#16231e;font-size:16px}',
      '#staffTrialModal .staff-error{min-height:18px;color:#b33a3a;font-size:11px;line-height:1.4}',
      '#staffTrialModal .staff-note{margin:0;color:#66736d;font-size:10px;line-height:1.5}',
      '#staffTrialModal .staff-actions{display:grid;gap:7px;margin-top:10px}',
      '#staffTrialModal .secondary-action{width:100%;min-height:42px;border:0;border-radius:10px;background:#edf2ef;color:#26342e;font-weight:900}',
      '#staffTrialFold{background:#f5fbf8;border-color:#cfe2d9}',
      '#staffTrialFold summary{color:#086044}',
      '#staffTrialFold .detail-list-item strong{color:#086044}',
      '#staffTrialDetail b{color:#086044}',
      '.staff-trial-person{display:block;margin-top:2px;color:#37473f;font-size:11px;line-height:1.45}',
      '@media(max-width:480px){#staffTrialButton{padding:7px 9px;font-size:10px}#staffTrialModal .sheet{padding:18px}}'
    ].join('');
    document.head.append(style);
  }

  function modalParts() {
    let modal = document.getElementById('staffTrialModal');
    if (modal) return { modal, sheet:modal.querySelector('.sheet') };
    modal = make('div', 'modal');
    modal.id = 'staffTrialModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    const sheet = make('div', 'sheet');
    modal.append(sheet);
    modal.addEventListener('click', (event) => { if (event.target === modal) closeStaffModal(); });
    document.body.append(modal);
    return { modal, sheet };
  }

  function closeStaffModal() {
    const modal = document.getElementById('staffTrialModal');
    if (modal) modal.classList.remove('show');
    if (!document.getElementById('detail')?.classList.contains('show')) document.body.classList.remove('modal-open');
  }

  function openStaffModal() {
    const { modal, sheet } = modalParts();
    if (staffData) renderStaffData(sheet);
    else renderLogin(sheet);
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }

  function renderLogin(sheet, errorText = '') {
    sheet.replaceChildren();
    sheet.append(make('span', 'type-badge', 'スタッフ専用'), make('h2', '', 'スタッフ情報'));
    const note = make('p', 'staff-note', '体験参加者の氏名はスタッフ認証後のみ表示します。認証はこの端末・ブラウザで30日間保持されます。');
    const form = make('form', 'staff-login');
    const label = make('label', '', 'パスワード');
    const input = document.createElement('input');
    input.type = 'password';
    input.inputMode = 'numeric';
    input.autocomplete = 'current-password';
    input.maxLength = 12;
    input.required = true;
    label.append(input);
    const error = make('div', 'staff-error', errorText);
    const submit = make('button', 'primary-action', '認証して表示');
    submit.type = 'submit';
    const close = make('button', 'close', '閉じる');
    close.type = 'button';
    close.addEventListener('click', closeStaffModal);
    form.append(label, error, submit);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submit.disabled = true;
      submit.textContent = '確認中…';
      error.textContent = '';
      try {
        const key = await deriveKey(input.value.trim());
        const data = await decryptData(key);
        await cacheKey(key);
        activate(data);
        renderStaffData(sheet);
      } catch (authError) {
        error.textContent = 'パスワードが違います。';
        input.select();
      } finally {
        submit.disabled = false;
        submit.textContent = '認証して表示';
      }
    });
    sheet.append(note, form, close);
    setTimeout(() => input.focus({ preventScroll:true }), 50);
  }

  function appendParticipantRows(container) {
    for (const [date, participants] of groups()) {
      const row = make('div', 'detail-list-item');
      row.append(make('time', '', friendlyDate(date)));
      const text = make('span');
      text.append(make('strong', '', participants.length + '名'));
      for (const participant of participants) {
        text.append(make('small', 'staff-trial-person', participant.team + '｜' + participant.name + '｜' + participant.grade));
      }
      row.append(text);
      container.append(row);
    }
  }

  function renderStaffData(sheet) {
    sheet.replaceChildren();
    sheet.append(make('span', 'type-badge', 'スタッフ専用'), make('h2', '', '体験参加者'));
    const list = make('div', 'detail-list');
    appendParticipantRows(list);
    const actions = make('div', 'staff-actions');
    const logout = make('button', 'secondary-action', 'この端末のスタッフ認証を解除');
    logout.type = 'button';
    logout.addEventListener('click', () => { clearAccess(); renderLogin(sheet); });
    const close = make('button', 'close', '閉じる');
    close.type = 'button';
    close.addEventListener('click', closeStaffModal);
    actions.append(logout, close);
    sheet.append(list, actions);
  }

  function installFold() {
    const old = document.getElementById('staffTrialFold');
    old?.remove();
    const main = document.querySelector('main');
    if (!main || !staffData) return;
    const details = make('details', 'fold');
    details.id = 'staffTrialFold';
    const summary = document.createElement('summary');
    summary.append(make('span', '', '体'), make('span', '', '体験参加者'), make('small', '', (staffData.trialParticipants || []).length + '名'));
    const list = make('div', 'detail-list');
    appendParticipantRows(list);
    details.append(summary, list);
    const absence = main.querySelector('.fold.absence');
    if (absence) main.insertBefore(details, absence);
    else main.append(details);
  }

  function attachToEventDetail() {
    if (!staffData) return;
    const detail = document.getElementById('detail');
    const dateNode = document.getElementById('detailDate');
    const body = document.getElementById('detailBody');
    if (!detail?.classList.contains('show') || !dateNode || !body) return;
    const date = (dateNode.textContent || '').slice(0, 10);
    const participants = (staffData.trialParticipants || []).filter((participant) => participant.date === date);
    const existing = document.getElementById('staffTrialDetail');
    if (!participants.length) { existing?.remove(); return; }
    if (existing?.dataset.date === date) return;
    existing?.remove();
    const row = make('div', 'detail-row');
    row.id = 'staffTrialDetail';
    row.dataset.date = date;
    row.append(make('b', '', '体験参加者（スタッフのみ）'));
    const content = make('p');
    content.textContent = participants.map((participant) => participant.team + '｜' + participant.name + '｜' + participant.grade).join('\\n');
    row.append(content);
    body.append(row);
  }

  function installDetailObserver() {
    if (detailObserver) return;
    const detail = document.getElementById('detail');
    if (!detail) return;
    detailObserver = new MutationObserver(() => attachToEventDetail());
    detailObserver.observe(detail, { attributes:true, childList:true, subtree:true });
  }

  function activate(data) {
    staffData = data;
    const button = document.getElementById('staffTrialButton');
    if (button) button.textContent = 'スタッフ ✓';
    installFold();
    installDetailObserver();
    attachToEventDetail();
  }

  function installFooterButton() {
    if (document.getElementById('staffTrialButton')) return;
    const footer = document.querySelector('footer span');
    if (!footer) return;
    const button = make('button', '', 'スタッフ');
    button.id = 'staffTrialButton';
    button.type = 'button';
    button.addEventListener('click', openStaffModal);
    footer.append(button);
  }

  async function restoreAccess() {
    try {
      const key = await loadCachedKey();
      if (!key) { clearAccess(); return; }
      activate(await decryptData(key));
    } catch (error) {
      clearAccess();
    }
  }

  installStyles();
  installFooterButton();
  restoreAccess();
})();
`;

const outputDir = path.join(process.cwd(), 'dist');
fs.rmSync(outputDir, { recursive:true, force:true });
fs.mkdirSync(outputDir, { recursive:true });
fs.copyFileSync(path.join(process.cwd(), 'index.html'), path.join(outputDir, 'index.html'));
const app = fs.readFileSync(path.join(process.cwd(), 'app.js'), 'utf8');
fs.writeFileSync(path.join(outputDir, 'app.js'), app + extension, 'utf8');
