const EVENTS=[{"date":"2026-08-17","type":"practice","title":"体験会・通常練習","time":"19:00〜21:00","place":"五泉中学校","detail":"ABC Basketball Club 体験会"},{"date":"2026-08-20","type":"practice","title":"体験会・通常練習","time":"19:00〜21:00","place":"五泉中学校","detail":"ABC Basketball Club 体験会"},{"date":"2026-08-22","type":"camp","title":"新発田合宿 1日目","time":"終日","place":"新発田方面","detail":"A戦・B戦を実施","result":"A戦 ●24-25 / B戦 ●11-17 / A戦 ○26-25 / B戦 △8-8"},{"date":"2026-08-23","type":"camp","title":"新発田合宿 2日目","time":"終日","place":"新発田方面","detail":"A戦・B戦を実施","result":"A戦 ●17-26 / B戦 ●13-26 / A戦 ○24-22 / B戦 ●4-15"},{"date":"2026-08-24","type":"practice","title":"体験会・通常練習","time":"19:00〜21:00","place":"五泉中学校","detail":"ABC Basketball Club 体験会"},{"date":"2026-08-27","type":"practice","title":"体験会・通常練習","time":"19:00〜21:00","place":"五泉中学校","detail":"ABC Basketball Club 体験会"},{"date":"2026-08-29","type":"practice","title":"チーム練習","time":"9:00〜11:00","place":"さくらアリーナ","detail":"チーム練習"},{"date":"2026-08-30","type":"game","title":"北区夏季リーグ戦","time":"8:00開場／8:15代表者会議／8:40第1試合","place":"新潟市北地区スポーツセンター","detail":"競技終了予定17:30。ABC参加。午前予選リーグ、午後順位リーグ。"},{"date":"2026-08-31","type":"practice","title":"体験会・通常練習","time":"19:00〜21:00","place":"五泉中学校","detail":"ABC Basketball Club 体験会"},{"date":"2026-09-05","type":"practice","title":"チーム練習・フリー練習","time":"9:00〜12:00","place":"五泉総合体育館","detail":"9:00〜11:00 チーム練習／11:00〜12:00 フリー練習"},{"date":"2026-09-06","type":"off","title":"オフ","time":"終日","place":"","detail":"活動なし"},{"date":"2026-09-12","type":"practice","title":"チーム練習・フリー練習","time":"9:00〜12:00","place":"小須戸体育館","detail":"9:00〜11:00 チーム練習／11:00〜12:00 フリー練習"},{"date":"2026-09-13","type":"practice","title":"チーム練習・フリー練習","time":"9:00〜12:00","place":"小須戸体育館","detail":"9:00〜11:00 チーム練習／11:00〜12:00 フリー練習"},{"date":"2026-09-19","type":"game","title":"強化練習試合","time":"時間未定","place":"分水","detail":"強化練習試合"},{"date":"2026-09-19","type":"staff","title":"コーチ出席","time":"","place":"分水","detail":"高田ヘッドコーチ／二瓶アシスタントコーチ／ゆいアシスタントコーチ"},{"date":"2026-09-20","end":"2026-09-22","type":"trip","title":"埼玉遠征 A","time":"2泊3日","place":"埼玉県","detail":"宿泊：いなり旅館"},{"date":"2026-09-20","type":"staff","title":"コーチ出席","time":"","place":"埼玉遠征","detail":"高田ヘッドコーチ"},{"date":"2026-09-21","end":"2026-09-22","type":"trip","title":"埼玉遠征 B","time":"1泊2日","place":"埼玉県","detail":"マイクロバス移動／宿泊：いなり旅館"},{"date":"2026-09-21","type":"staff","title":"コーチ出席","time":"","place":"埼玉遠征","detail":"浅井／洋介フィジカルコーチ"},{"date":"2026-09-22","type":"staff","title":"コーチ出席","time":"","place":"埼玉遠征","detail":"高田ヘッドコーチ／浅井／洋介フィジカルコーチ"},{"date":"2026-09-23","type":"off","title":"オフ","time":"終日","place":"","detail":"活動なし"},{"date":"2026-09-26","type":"practice","title":"練習予定","time":"時間未定","place":"会場未定","detail":"練習予定"},{"date":"2026-09-27","type":"off","title":"オフ","time":"終日","place":"","detail":"活動なし"}];

const RESOURCES={"2026-08-30":[{title:"20260830_北区夏季リーグ戦",url:"https://drive.google.com/file/d/1Q-7KlVkRr0Gpivu7f3AeP7SwZGQV3gS_/view?usp=drivesdk"}],"2026-08-08":[{title:"20260808_チャレンジトーナメント.pdf",url:"https://drive.google.com/file/d/1wva7jU06m4df6Sufdpxw0q8i2hhz5vQK/view?usp=drivesdk"}],"2026-07-18":[{title:"20260718_新潟ALLSTAR☆SUMMER+CAMP要項.pdf",url:"https://drive.google.com/file/d/1xFCkzVkjSXlgo9cNg3DxN8OQtFMzWWn5/view?usp=drivesdk"}],"2026-07-20":[{title:"20260720_富山（福光）.pdf",url:"https://drive.google.com/file/d/1i_HWAQ7-2PkH8BOugLL1E_bZfsg_4kKu/view?usp=drivesdk"}],"2026-06-14":[{title:"20260614_上越.pdf",url:"https://drive.google.com/file/d/1gVt2ELkuSBIc8aHeh-4uMEA3OZhFhqms/view?usp=drivesdk"}],"2026-06-13":[{title:"20260613_タイムスケジュール.pdf",url:"https://drive.google.com/file/d/17XkXwOvs8wPM5DucVp1KZgEIsjVEcySP/view?usp=drivesdk"}],"2026-05-30":[{title:"20260530_練習試合",url:"https://drive.google.com/file/d/1wvUnRhxFHhMKkPaUjypzfH9WvGmBvGNq/view?usp=drivesdk"}],"2026-05-17":[{title:"20260517_燕中等練習試合",url:"https://drive.google.com/file/d/1HOC83b_5CaDnUxaRAv-r5KW31DDhO3Ik/view?usp=drivesdk"}],"2026-05-16":[{title:"20260516_魚沼ブルーインズ",url:"https://drive.google.com/file/d/1gQJRHTXnJYQbuKrHZN_fTEhl4wFjHMDe/view?usp=drivesdk"}],"2026-05-04":[{title:"20260504_白根カルチャーセンター2階ギャラリー指定図",url:"https://drive.google.com/file/d/1HKqKgl7l9w1KYfJVMI1P3z2brUMMC6s0/view?usp=drivesdk"}],"2026-05-01":[{title:"20260501_佐渡SPRING CAMP",url:"https://drive.google.com/file/d/1xpqj91rny3hhdhcoOhTAJiOZVNX5XNQS/view?usp=drivesdk"}],"2026-04-25":[{title:"20260425_選手名簿.pdf",url:"https://drive.google.com/file/d/1LbqimGh1Hm4lT4P_Xk2pTW1xmv1ymIi_/view?usp=drivesdk"},{title:"20260425.26_チャレンジトーナメント.pdf",url:"https://drive.google.com/file/d/1VKQeILJ_GPBvYHTQXFIsieWMX91Tx4bf/view?usp=drivesdk"}],"2026-04-19":[{title:"20260419_下越Supring(２日目)【訂正版】.pdf",url:"https://drive.google.com/file/d/1rrwcAXwjPVoyV8iauLmIqpteiepGUhIG/view?usp=drivesdk"},{title:"20260419_下越スプリング２日目.pdf",url:"https://drive.google.com/file/d/1Wrw6OcXQGFvYIEE5vwD5_eRNAD7Ro9Qe/view?usp=drivesdk"}],"2026-04-12":[{title:"20260412_タイムスケジュール.pdf",url:"https://drive.google.com/file/d/1FPN9EKWF_ZoSudOaG3M6FqMejnJVS6fc/view?usp=drivesdk"}],"2026-04-11":[{title:"20260411_練習会.pdf",url:"https://drive.google.com/file/d/1xzODyOh2Auf-t3lzOC564ChWJDbfhwK8/view?usp=drivesdk"},{title:"20260411_ﾀｲﾑｽｹｼﾞｭｰﾙ.pdf",url:"https://drive.google.com/file/d/19mZiYQeMa17BJjJrnHZVwmJpMwfKhCtt/view?usp=drivesdk"}],"2026-04-04":[{title:"20260404_練習会.pdf",url:"https://drive.google.com/file/d/1pabVy_q-I18axjOq5sxpS_bDwuFIr4zF/view?usp=drivesdk"}],"2026-03-20":[{title:"20260320_希楽々カップ.pdf",url:"https://drive.google.com/file/d/1r4rtS1rhBurxujd3N0LwX-MkGgTNPVzR/view?usp=drivesdk"}],"2026-03-14":[{title:"20260314_SPRING CHALLENGE 2026.pdf",url:"https://drive.google.com/file/d/1ALsnzHYHQxjhRTFZM9JfTkD3LTwiULsX/view?usp=drivesdk"}],"2026-02-07":[{title:"20260207_AKIHA練習会.pdf",url:"https://drive.google.com/file/d/1NUW8mUyQUfLNQkGg-z4LoIOP-_IjEbvX/view?usp=drivesdk"}],"2026-01-24":[{title:"20260124_加治川",url:"https://drive.google.com/file/d/198jHKkDJ2Ff7bDn_RlQb88_6ouwewOXo/view?usp=drivesdk"}],"2026-01-10":[{title:"20260110_佐渡.pdf",url:"https://drive.google.com/file/d/1bOHtskoAjoYWUDEmgR7NflXPdhdJy65H/view?usp=drivesdk"}]};

const label={practice:"練習",game:"試合",camp:"合宿",trip:"遠征",off:"オフ",staff:"コーチ出席"};
const icon={practice:"⛹️",game:"🏀",camp:"🏕",trip:"🚌",off:"💤",staff:"👥"};
const now=new Date();
let view=new Date(now.getFullYear(),now.getMonth(),1);

function parse(s){let [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)}
function fmt(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function occurs(e,ds){const d=parse(ds),a=parse(e.date),b=parse(e.end||e.date);return d>=a&&d<=b}

const TODAY=fmt(new Date());

const RECURRING_RULES=[
  {weekday:1,start:"2026-04-01",end:"2027-03-31",type:"practice",title:"通常練習",time:"19:00〜21:00",place:"五泉中学校",detail:"月曜日 通常練習"},
  {weekday:3,start:"2026-04-01",end:"2027-03-31",type:"practice",title:"通常練習",time:"19:00〜21:00",place:"五泉総合体育館",detail:"水曜日 通常練習"},
  {weekday:4,start:"2026-04-01",end:"2027-03-31",type:"practice",title:"通常練習",time:"19:00〜21:00",place:"五泉中学校",detail:"木曜日 通常練習"}
];

const EVENTS_BY_DATE=new Map(),MONTH_EVENTS=new Map();
for(const e of EVENTS){
  const start=parse(e.date),end=parse(e.end||e.date),monthSeen=new Set();
  for(let d=new Date(start);d<=end;d.setDate(d.getDate()+1)){
    const ds=fmt(d);
    if(!EVENTS_BY_DATE.has(ds))EVENTS_BY_DATE.set(ds,[]);
    EVENTS_BY_DATE.get(ds).push(e);
    const mk=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    if(!monthSeen.has(mk)){
      if(!MONTH_EVENTS.has(mk))MONTH_EVENTS.set(mk,[]);
      MONTH_EVENTS.get(mk).push(e);
      monthSeen.add(mk)
    }
  }
}

function recurringForDate(d){
  const ds=fmt(d),out=[];
  const manualEvents=EVENTS_BY_DATE.get(ds)||[];
  const hasSpecialEvent=manualEvents.some(e=>["game","camp","trip","off"].includes(e.type));
  if(hasSpecialEvent)return out;
  for(const r of RECURRING_RULES){
    if(d.getDay()!==r.weekday||ds<r.start||ds>r.end)continue;
    const manual=manualEvents.some(e=>e.type===r.type&&e.time===r.time&&e.place===r.place);
    if(!manual)out.push({date:ds,type:r.type,title:r.title,time:r.time,place:r.place,detail:r.detail,recurring:true});
  }
  return out
}
function eventsForDate(d){return [...(EVENTS_BY_DATE.get(fmt(d))||[]),...recurringForDate(d)]}
function recurringForMonth(y,m){const out=[],last=new Date(y,m+1,0).getDate();for(let day=1;day<=last;day++)out.push(...recurringForDate(new Date(y,m,day)));return out}
function move(n){view=new Date(view.getFullYear(),view.getMonth()+n,1);render()}
function goToday(){const t=new Date();view=new Date(t.getFullYear(),t.getMonth(),1);render()}

function openEvent(e){
  document.getElementById("tag").textContent=(icon[e.type]||"")+" "+(label[e.type]||"予定");
  document.getElementById("dtitle").textContent=e.title;
  document.getElementById("ddate").innerHTML="<b>日時</b><br>"+e.date+(e.end?" ～ "+e.end:"")+"　"+(e.time||"");
  document.getElementById("dplace").innerHTML="<b>会場</b><br>"+(e.place||"未定");
  document.getElementById("dtext").innerHTML="<b>内容</b><br>"+(e.detail||"");
  const r=document.getElementById("dresult");
  if(e.result){r.style.display="block";r.innerHTML="<b>結果</b><br>"+e.result}else r.style.display="none";
  const docs=document.getElementById("driveDocs");
  docs.innerHTML="";
  const rs=RESOURCES[e.date]||[];
  rs.forEach(r=>{
    const a=document.createElement("a");
    a.className="action";
    a.target="_blank";
    a.rel="noopener noreferrer";
    a.href=r.url;
    a.textContent="📄 大会資料を見る："+r.title;
    docs.appendChild(a)
  });
  document.getElementById("detail").classList.add("show")
}
function closeDetail(){document.getElementById("detail").classList.remove("show")}
function openStaff(){document.getElementById("staffm").classList.add("show")}
function closeStaff(){document.getElementById("staffm").classList.remove("show")}

function render(){
  const y=view.getFullYear(),m=view.getMonth();
  document.getElementById("monthTitle").textContent=`${y}年 ${m+1}月`;
  const first=new Date(y,m,1),start=new Date(y,m,1-first.getDay());
  const grid=document.getElementById("grid");
  grid.innerHTML="";
  for(let i=0;i<42;i++){
    const d=new Date(start);
    d.setDate(start.getDate()+i);
    const ds=fmt(d);
    const cell=document.createElement("div");
    cell.className="day"+(d.getMonth()!=m?" other":"");
    const n=document.createElement("div");
    n.className="num";
    const isToday=ds===TODAY;
    n.innerHTML=isToday?`<span class="todaymark">${d.getDate()}</span>`:`${d.getDate()}`;
    if(d.getDay()==0&&!isToday)n.style.color="#c94d4d";
    if(d.getDay()==6&&!isToday)n.style.color="#4779c9";
    cell.appendChild(n);
    const es=eventsForDate(d);
    es.slice(0,3).forEach(e=>{
      const el=document.createElement("div");
      el.className="ev "+e.type;
      el.textContent=e.title;
      el.onclick=()=>openEvent(e);
      cell.appendChild(el)
    });
    if(es.length>3){
      const more=document.createElement("div");
      more.className="more";
      more.textContent=`＋${es.length-3}件`;
      cell.appendChild(more)
    }
    grid.appendChild(cell)
  }

  const cards=document.getElementById("cards");
  cards.innerHTML="";
  const mk=`${y}-${String(m+1).padStart(2,"0")}`;
  const mes=[...(MONTH_EVENTS.get(mk)||[]),...recurringForMonth(y,m)].sort((a,b)=>a.date.localeCompare(b.date));
  if(!mes.length)cards.innerHTML='<div class="card" style="display:block;text-align:center;color:#6b7570;font-size:12px">この月の予定はありません。</div>';
  mes.forEach(e=>{
    const d=parse(e.date),c=document.createElement("div");
    c.className="card";
    c.onclick=()=>openEvent(e);
    const hasDoc=(RESOURCES[e.date]||[]).length>0;
    c.innerHTML=`<div class="datebox">${d.getMonth()+1}/${d.getDate()}<small>${["日","月","火","水","木","金","土"][d.getDay()]}</small></div><div><h3>${icon[e.type]||""} ${e.title}${hasDoc?"　📄":""}</h3><div class="meta">${e.time||""}<br>${e.place||""}</div></div>`;
    cards.appendChild(c)
  })
}
render()