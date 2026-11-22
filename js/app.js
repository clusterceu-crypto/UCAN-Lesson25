(()=>{'use strict';const KEY='ucan-l24-preview-v19-isolated';let state={page:0,seen:[0]};try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&Number.isInteger(x.page)&&x.page>=0&&x.page<10&&Array.isArray(x.seen))state={page:x.page,seen:x.seen.filter(n=>Number.isInteger(n)&&n>=0&&n<10)}}catch(e){}const pages=[...document.querySelectorAll('.page')];const toReflection=document.getElementById('to-reflection');const reflectionButtons=[...document.querySelectorAll('[data-go="9"]')];function syncReflection(){const ready=!!window.__ucanL24Assessment?.isPassed();toReflection.disabled=!ready;reflectionButtons.forEach(b=>{b.disabled=!ready;b.setAttribute('aria-disabled',String(!ready));});}window.__ucanL24SyncReflection=syncReflection;const nav=[...document.querySelectorAll('[data-go]')];const progress=document.getElementById('progress-bar'),label=document.getElementById('progress-label');function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}function go(n){if(n===9&&!window.__ucanL24Assessment?.isPassed()){n=8;}state.page=Math.max(0,Math.min(9,n));if(!state.seen.includes(state.page))state.seen.push(state.page);pages.forEach((p,i)=>p.hidden=i!==state.page);nav.forEach(b=>{b.classList.toggle('active',Number(b.dataset.go)===state.page);if(Number(b.dataset.go)===state.page)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});label.textContent=state.seen.length+' із 10 переглянуто';document.getElementById('mobile-progress-label').textContent=state.seen.length+' із 10';document.getElementById('mobile-progress-fill').style.width=(state.seen.length/10*100)+'%';progress.style.width=(state.seen.length/10*100)+'%';progress.setAttribute('aria-valuenow',String(state.seen.length));document.getElementById('mobile-progress-bar').setAttribute('aria-valuenow',String(state.seen.length));save();document.getElementById('mobile-nav').hidden=true;document.getElementById('menu').setAttribute('aria-expanded','false');window.scrollTo(0,0);document.getElementById('page-title-'+state.page).focus({preventScroll:true})}nav.forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.go))));document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>go(state.page===9?0:state.page+1)));document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>go(Math.max(0,state.page-1))));const data=JSON.parse(document.getElementById('source-check').textContent);function choose(c){document.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.choice===c)));const f=document.getElementById('feedback');f.textContent='';const p=document.createElement('p');p.textContent=data.feedback[c];f.append(p);f.focus()}document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.choice)));document.getElementById('reconsider').addEventListener('click',()=>{document.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed','false'));document.getElementById('feedback').textContent='Оберіть інший варіант для порівняння пояснень.';document.querySelector('[data-choice]').focus()});document.getElementById('menu').addEventListener('click',()=>{const m=document.getElementById('mobile-nav');m.hidden=!m.hidden;document.getElementById('menu').setAttribute('aria-expanded',String(!m.hidden))});function resetPreview(){if(window.confirm('Скинути локальний прогрес перегляду цього заняття?')){state={page:0,seen:[0]};window.__ucanL24Assessment?.reset();go(0);document.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed','false'));document.getElementById('feedback').textContent='Оберіть варіант, щоб прочитати відповідне пояснення.';window.__ucanL24Assessment?.reset();syncReflection();}}document.getElementById('reset').addEventListener('click',resetPreview);document.getElementById('mobile-reset').addEventListener('click',resetPreview);syncReflection();go(state.page)})();

(()=>{'use strict';
const items=[...document.querySelectorAll('.formative-item')];
const submit=document.getElementById('assessment-submit');
const retry=document.getElementById('assessment-retry');
const result=document.getElementById('assessment-result');
const goReflection=document.getElementById('to-reflection');
const feedback={};
// These are the 15 accepted explanations from v1.7, carried verbatim.
const explanations={"L24-Q01": ["Звіт може допомогти представити дані, але сам по собі не доводить, що потрібен ШІ або що рішення покращить послугу. Спочатку визначте проблему і критерій користі.", "Так. Спершу визначають проблему, альтернативи та перевірювану додаткову користь. Наявність нової технології ще не є підставою для її впровадження.", "Досвід інших міст може підказати запитання, але не замінює перевірки місцевих умов, даних і потреб."], "L24-Q02": ["Потенційна спроможність ШІ не компенсує неповні записи і невизначену відповідальність. Спершу потрібна перевірка користі проти простішої альтернативи.", "Тимчасове відкладення технологічного рішення іноді виправдане, але пасивне очікування не поліпшує облік. Організаційну перевірку можна розпочати зараз.", "Так. За наведених умов це пропорційний перший крок: поліпшити дані та управління, не закриваючи можливості пізніше дослідити ШІ."], "L24-Q03": ["Так. Без перевірки якості й порівнюваності даних та впливу на людей цифрова рекомендація не є достатньою підставою для управлінського рішення.", "Зрозумілий графік полегшує читання, але не пояснює походження різниці або її причин.", "Більша кількість записів не гарантує їхньої точності, зіставності чи правомірного використання."], "L24-Q04": ["Показання можуть підтвердити обсяг споживання, але не причинний ефект ШІ й не скорочення викидів. Для цього потрібні окремі зіставлення і методика.", "Так. Ви відокремлюєте спостереження, перевірювану гіпотезу та сценарій за припущеннями, не видаючи їх за встановлений результат.", "Сценарії не є гарантіями чи точними прогнозами. Навіть кращі дані не доводять користі ШІ без порівняння альтернатив."], "L24-Q05": ["Презентація може пояснити продукт, але не замінює місцевої перевірки проблеми, даних, ризиків і альтернатив.", "Відкладення без конкретної перевірки залишає невизначеність і не дає команді наступної дії.", "Так. Доручення визначає перевірювану роботу, відповідальну функцію, альтернативи та сигнал перегляду, не обіцяючи наперед впровадження."]};
const SESSION_KEY='ucan-l24-v19-verified-5of5';
let passed=false;let submitted=false;
function selected(item){const r=item.querySelector('input[type="radio"]:checked');return r?Number(r.value):null}
function selections(){return items.map(selected)}
function correctSelections(values){return Array.isArray(values)&&values.length===items.length&&items.length===5&&items.every((item,i)=>Number.isInteger(values[i])&&values[i]>=0&&values[i]<3&&values[i]===Number(item.dataset.correct))}
function clearStored(){try{sessionStorage.removeItem(SESSION_KEY)}catch(e){}}
function storeVerified(){if(!passed||!submitted||!correctSelections(selections()))return;try{sessionStorage.setItem(SESSION_KEY,JSON.stringify({version:'v1.9',passed:true,answers:selections()}))}catch(e){}}
function sync(){submit.disabled=submitted||!items.every(item=>selected(item)!==null)}
function gate(){goReflection.disabled=!passed;document.querySelectorAll('[data-go="9"]').forEach(b=>{b.disabled=!passed;b.setAttribute('aria-disabled',String(!passed));b.title=passed?'Рефлексія відкрита':'Спершу правильно дайте відповіді на всі п’ять запитань';});}
function clearResults(){submitted=false;passed=false;clearStored();result.hidden=true;result.replaceChildren();retry.hidden=true;items.forEach(item=>{item.querySelector('.formative-feedback').hidden=true;item.querySelector('.formative-takeaway').hidden=true;item.querySelectorAll('input[type="radio"]').forEach(r=>r.disabled=false)});gate();sync();}
function addResult(tag,content,cls){const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=content;result.append(e);return e}
function renderResult(values,restored=false){
 const count=items.reduce((n,item,i)=>n+(values[i]===Number(item.dataset.correct)?1:0),0);
 passed=count===5&&correctSelections(values);submitted=true;
 result.replaceChildren();addResult('h3','Результат перевірки');
 addResult('p',`Ваш результат: ${count} із 5 правильних відповідей.`,'assessment-score');
 addResult('p',passed?'Ви правильно відповіли на всі п’ять запитань. Перевірку завершено — тепер можете перейти до рефлексії.':`Ви правильно відповіли на ${count} із 5 запитань. Перегляньте пояснення та спробуйте ще раз.`);
 const details=document.createElement('div');details.className='assessment-explanations';
 addResult('h4','Пояснення до Ваших відповідей');
 items.forEach((item,i)=>{
  const choice=values[i];const entry=document.createElement('div');entry.className='assessment-explanation';
  const heading=document.createElement('h5');heading.textContent=`Запитання ${i+1} — ${choice===Number(item.dataset.correct)?'правильна відповідь':'потрібно переглянути'}`;
  const p=document.createElement('p');p.textContent=explanations[item.dataset.itemId][choice];entry.append(heading,p);details.append(entry);
  item.querySelector('.formative-feedback').hidden=true;item.querySelector('.formative-takeaway').hidden=true;
  item.querySelectorAll('input[type="radio"]').forEach(r=>r.disabled=true);
 });
 result.append(details);result.hidden=false;retry.hidden=passed;sync();gate();
 if(!restored)result.focus({preventScroll:true});
}
items.forEach(item=>item.querySelectorAll('input[type="radio"]').forEach(r=>r.addEventListener('change',()=>{if(submitted)clearResults();else sync();})));
submit.addEventListener('click',()=>{
 if(submitted||!items.every(item=>selected(item)!==null))return;
 const values=selections();renderResult(values);
 if(passed)storeVerified();else clearStored();
});
retry.addEventListener('click',()=>{items.forEach(item=>item.querySelectorAll('input[type="radio"]').forEach(r=>{r.checked=false;r.disabled=false}));clearResults();items[0].querySelector('input[type="radio"]').focus();});
function resetAssessment(){items.forEach(item=>item.querySelectorAll('input[type="radio"]').forEach(r=>{r.checked=false;r.disabled=false}));clearResults();}
function restore(){try{
 const x=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null');
 if(!x||x.version!=='v1.9'||x.passed!==true||!correctSelections(x.answers)){clearStored();return}
 items.forEach((item,i)=>item.querySelectorAll('input[type="radio"]').forEach(r=>{r.checked=Number(r.value)===x.answers[i]}));
 renderResult(x.answers,true);
 }catch(e){clearStored();}}
window.__ucanL24Assessment={isPassed:()=>passed,reset:resetAssessment,sync:gate};
restore();gate();sync();
})();