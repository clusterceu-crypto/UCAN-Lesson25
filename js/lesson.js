/* Lesson-specific semantic content, formative self-check, optional clipboard; no duplicate shared navigation/storage/PDF. */
window.UCAN_L25_RENDERER=(()=>{'use strict';
const pages=window.UCAN_L25_PAGES,Qs=window.UCAN_L25_QUESTIONS;const $=id=>document.getElementById(id);
const e=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n};
function add(parent,child){parent.append(child);return child}
function withEmoji(node,emoji){const icon=e('span',emoji,'heading-emoji');icon.setAttribute('aria-hidden','true');node.prepend(icon,document.createTextNode(' '));return node}
function applyBlock(parent,b){const kind=b.kind;
 if(['title','h2','h3','h4','eyebrow','p','sub','quote','thought'].includes(kind)){
  let tag={title:'h1',h2:'h2',h3:'h3',h4:'h4',eyebrow:'p',p:'p',sub:'p',quote:'blockquote',thought:'aside'}[kind];const n=e(tag,kind==='thought'?undefined:b.text,kind==='thought'?'thought':kind==='eyebrow'?'eyebrow':'source-paragraph');if(kind==='h3'&&/^Запитання [1-5]\./.test(b.text))n.classList.add('expert-question');if(kind==='h4'&&b.text==='Слабка відповідь')n.classList.add('expert-weak-label');if(kind==='h4'&&b.text==='Сильніша відповідь')n.classList.add('expert-strong-label');if(kind==='h4'&&b.text==='Чому ця відповідь переконливіша?')n.classList.add('expert-why-label');if(b.emoji)withEmoji(n,b.emoji);if(kind==='thought'){add(n,withEmoji(e('strong','Ключова думка'),'💡'));add(n,e('p',b.text))}add(parent,n);return;
 }
 if(kind==='list'){const ul=add(parent,e('ul'));b.items.forEach(s=>add(ul,e('li',s)));return}
 if(kind==='cards'){const g=add(parent,e('div',undefined,'visual-cards'));g.dataset.visual=b.visual;
  b.items.forEach(it=>{const c=add(g,e('section',undefined,'visual-card'));add(c,e('h3',it.title));if(it.subtitle)add(c,e('h4',it.subtitle));if(it.body)add(c,e('p',it.body));if(it.fields){const dl=add(c,e('dl'));it.fields.forEach(([name,body])=>{add(dl,e('dt',name));add(dl,e('dd',body))})}if(it.footer)add(c,e('p',it.footer))});return}
 if(kind==='flow'){const ol=add(parent,e('ol',undefined,'flow-diagram'));ol.dataset.visual=b.visual;b.items.forEach(([h,t])=>{const li=add(ol,e('li'));add(li,e('strong',h));add(li,e('span',t))});return}
 if(kind==='expert'){const div=add(parent,e('div'));div.dataset.visual=b.visual;b.items.forEach(([q,a])=>{const sec=add(div,e('section',undefined,'expert-row'));add(sec,e('h3',q));add(sec,e('p',a))});return}
 if(kind==='resources'){b.items.forEach(r=>{const sec=add(parent,e('section',undefined,'resource-item'));add(sec,e('h3',r.title));if(r.metadata)add(sec,e('p',r.metadata,'resource-meta'));add(sec,e('p',r.body));if(r.reading)add(sec,e('p',r.reading,'resource-reading'));for(const l of (r.links||[{label:r.label,url:r.url}])){const a=add(sec,e('a',l.label));a.href=l.url;a.target='_blank';a.rel='noopener noreferrer'}});return}
 if(kind==='ucan-guide'){const sec=add(parent,e('section',undefined,'resource-item ucan-practical-guide'));add(sec,e('p',b.category,'resource-category'));add(sec,e('h3',b.title));add(sec,e('p',b.body));const actions=add(sec,e('div',undefined,'resource-actions'));b.links.forEach((l,i)=>{const a=add(actions,e('a',l.label,i===0?'button resource-primary':'button button-outline resource-secondary'));a.href=l.url;a.target='_blank';a.rel='noopener noreferrer'});return}
 if(kind==='template'){add(parent,e('h2',b.title));const ol=add(parent,e('ol',undefined,'template-steps'));ol.dataset.visual=b.visual;b.items.forEach(([h,t])=>{const li=add(ol,e('li'));add(li,e('h3',h));add(li,e('p',t))});return}
 if(kind==='example'){add(parent,e('h2',b.title));const box=add(parent,e('section',undefined,'worked-example'));box.dataset.visual=b.visual;add(box,e('p',b.subtitle,'eyebrow'));let indicators=null;
  b.blocks.forEach(([typ,t])=>{if(typ==='indicator'){if(!indicators){indicators=add(box,e('div',undefined,'visual-cards'))}const c=add(indicators,e('section',undefined,'visual-card'));const parts=t.split('|');add(c,e('h4',parts.shift()));parts.forEach(s=>add(c,e('p',s)));return}if(typ==='h4'&&indicators){indicators=null}add(box,e(typ,t))});return}
 if(kind==='portfolio'){const host=$('editor-host');host.classList.remove('hidden');add(parent,host);return}
 if(kind==='ai'){const s=add(parent,e('section',undefined,'ai-review'));s.dataset.visual=b.visual;add(s,withEmoji(e('h2','Перевірте Вашу концепцію за допомогою ШІ'),'🤖'));add(s,e('p','За бажанням отримайте короткий відгук щодо обґрунтованості Вашого рішення, доказів, кліматичного показника та наступного доручення команді.'));add(s,e('p','Перед копіюванням запиту вилучіть чутливі дані. Відкрийте обраний сервіс, самостійно вставте запит і надішліть його.'));
   const row=add(s,e('div',undefined,'ai-actions'));const c=add(row,e('button','Скопіювати запит для перевірки','button'));c.type='button';c.id='ai-copy';for(const [label,url] of [['Відкрити ChatGPT','https://chatgpt.com/'],['Відкрити Gemini','https://gemini.google.com/']]){const a=add(row,e('a',label,'button button-outline'));a.href=url;a.target='_blank';a.rel='noopener noreferrer'}
   const status=add(s,e('p','', 'ai-status'));status.id='ai-copy-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');add(s,e('p','Використайте отриманий відгук, щоб за потреби уточнити Вашу концепцію.'));return}
 if(kind==='quiz'){const region=add(parent,e('section',undefined,'self-check'));region.id='self-check';region.dataset.visual=b.visual;Qs.forEach((q,i)=>{
   const field=add(region,e('fieldset',undefined,'quiz-question'));field.dataset.question=String(i+1);add(field,e('legend','Запитання '+(i+1)+'. '+q.q));const options=add(field,e('div',undefined,'quiz-options'));
   q.opts.forEach((val,j)=>{const label=add(options,e('label',undefined,'quiz-option'));const radio=add(label,e('input'));radio.type='radio';radio.name='quiz-q'+i;radio.value=String(j);radio.setAttribute('aria-label',String.fromCharCode(1040+j)+'. '+val);add(label,e('span',String.fromCharCode(1040+j)+'. '+val))});
   const fb=add(field,e('div','', 'quiz-feedback'));fb.id='quiz-feedback-'+i;fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');
  });const controls=add(region,e('div',undefined,'quiz-actions'));const check=add(controls,e('button','Перевірити відповіді','button'));check.type='button';check.id='quiz-check';const retry=add(controls,e('button','Повторити спробу','button button-outline'));retry.type='button';retry.id='quiz-retry';const score=add(region,e('div','', 'quiz-score'));score.id='quiz-score';score.setAttribute('role','status');score.setAttribute('aria-live','polite');add(region,e('p','Ви можете перейти до рефлексії незалежно від результату самоперевірки.'));return}
}
function sectionView(sec){const i=Number(sec.id.slice(1))-1;const p=pages[i];const wrap=e('section',undefined,'component');wrap.dataset.component='L25-'+sec.id;wrap.dataset.route=p.id;p.blocks.forEach(b=>applyBlock(wrap,b));return wrap}
function titleElement(){const h=e('h1','Презентація проєктів: проєктування кліматично нейтрального розумного міста');return h}
return Object.freeze({sectionView,titleElement})})();
const l25Runtime=window.UCAN_RUNTIME.createRuntime(window.UCAN_L25_CONFIG,{renderer:window.UCAN_L25_RENDERER,content:window.UCAN_L25_CONTENT,storage:window.UCAN_STORAGE});
const $=id=>document.getElementById(id);
const started=l25Runtime.start();
if(started){
 // F03: the shared runtime's editor input listener runs first and updates state.
 // Persist the most recent value synchronously in the same input event (after consent),
 // without any debounced/pending write that could resurrect a deleted draft.
 const draftButton=$('delete-concept');
 const syncDeleteVisibility=()=>{const state=l25Runtime.getState();draftButton.classList.toggle('hidden',!(state?.concept?.trim()||state?.corrupt||state?.deletePending))};
 syncDeleteVisibility();
 document.addEventListener('input',event=>{
  if(event.target.id!=='concept-editor')return;
  syncDelete();
  window.UCAN_RUNTIME.save(); // Runtime owns truthful error/consent and status messages.
 });
 // P06: replace only the lesson's delete control to detach its earlier generic
 // runtime click confirmation without modifying the shared runtime code.
 const secondaryDelete=draftButton.cloneNode(true);draftButton.replaceWith(secondaryDelete);
 const syncDelete=()=>{const state=l25Runtime.getState();secondaryDelete.classList.toggle('hidden',!(state?.concept?.trim()||state?.corrupt||state?.deletePending))};
 syncDelete();
 const confirmDialog=$('confirm-dialog');let pendingL25Delete=false;
 secondaryDelete.addEventListener('click',()=>{
  if(secondaryDelete.disabled||secondaryDelete.classList.contains('hidden'))return;
  $('dialog-title').textContent='Видалити чернетку';
  $('dialog-copy').textContent='Видалити чернетку з цього браузера? Цю дію не можна скасувати';
  pendingL25Delete=true;confirmDialog.showModal();$('dialog-cancel').focus();
 });
 $('dialog-confirm').addEventListener('click',event=>{
  if(!pendingL25Delete)return;
  event.preventDefault();event.stopImmediatePropagation();pendingL25Delete=false;
  confirmDialog.close();
  // No delayed writes exist. The runtime removes only the concept record;
  // its failure path retains the editor text and reports the failure.
  l25Runtime.actions.reset('portfolio');syncDelete();secondaryDelete.focus();
 },true);
 $('dialog-cancel').addEventListener('click',()=>{if(pendingL25Delete){pendingL25Delete=false;secondaryDelete.focus()}});
 confirmDialog.addEventListener('cancel',()=>{pendingL25Delete=false});
 // Keep action visibility aligned with the shared editor when navigating.
 new MutationObserver(syncDelete).observe($('editor-host'),{attributes:true,attributeFilter:['class']});

 // Explicit user action; never place the composed prompt in DOM, tooltip, modal, URL or logs.
 document.addEventListener('click',async event=>{
  if(event.target.id==='ai-copy'){
   const status=$('ai-copy-status');if(!status)return;const concept=$('concept-editor').value;
   const prompt=window.UCAN_L25_AI_PROMPT.replace('[АКТУАЛЬНИЙ ТЕКСТ КОНЦЕПЦІЇ З РЕДАКТОРА]',()=>concept);
   try{if(!navigator.clipboard||typeof navigator.clipboard.writeText!=='function')throw Error('Clipboard unavailable');await navigator.clipboard.writeText(prompt);status.textContent='Запит скопійовано'}catch(_){status.textContent='Не вдалося скопіювати. Спробуйте ще раз'}
  }
  if(event.target.id==='quiz-check'){
   let count=0;window.UCAN_L25_QUESTIONS.forEach((q,i)=>{const selected=document.querySelector('input[name="quiz-q'+i+'"]:checked');const fb=$('quiz-feedback-'+i);const chosen=selected?Number(selected.value):-1;if(chosen===q.answer)count++;
    const label=chosen<0?'Відповідь не обрано':chosen===q.answer?'Правильно':'Варто переглянути відповідь';const answer='Правильна відповідь: '+String.fromCharCode(1040+q.answer);fb.textContent=label+'\n'+answer+'\n'+q.why});
   $('quiz-score').textContent=count+' із 5 · Правильних відповідей';
  }
  if(event.target.id==='quiz-retry'){document.querySelectorAll('#self-check input[type="radio"]').forEach(input=>input.checked=false);document.querySelectorAll('#self-check .quiz-feedback').forEach(f=>f.textContent='');$('quiz-score').textContent='';}
 });
 // Lesson-level route transition correction (UX019). Runtime remains byte-identical.
 // Capture the previous route before shared handlers run, then inspect after render.
 // The delegated click also receives keyboard-generated click events.
 document.addEventListener('click',event=>{
  const control=event.target.closest('#prev-page,#next-page,#route-nav button');
  if(!control||control.disabled)return;
  const before=l25Runtime.getState().route;
  requestAnimationFrame(()=>{
   const after=l25Runtime.getState().route;
   if(after===before)return; // same-route, blocked and failed navigation are inert
   const heading=$('lesson-content').querySelector('h1,h2');
   if(!heading)return;
   // Reset both the document and any actual internal scroll container.
   document.scrollingElement?.scrollTo({top:0,behavior:'instant'});
   const main=$('lesson-main');
   if(main&&main.scrollHeight>main.clientHeight)main.scrollTop=0;
   const content=$('lesson-content');
   if(content&&content.scrollHeight>content.clientHeight)content.scrollTop=0;
   heading.setAttribute('tabindex','-1');
   heading.focus({preventScroll:true});
   const sticky=document.querySelector('.site-header');
   const offset=(sticky&&getComputedStyle(sticky).position==='sticky'?sticky.getBoundingClientRect().height:0)+12;
   const rect=heading.getBoundingClientRect();
   if(rect.top<offset||rect.top>innerHeight-60){
    const owner=document.scrollingElement;
    owner?.scrollTo({top:Math.max(0,owner.scrollTop+rect.top-offset),behavior:'instant'});
   }
  });
 },true);
 // Isolated namespace for changed 5->8 route registry. No silent progress migration.
 // The old concept remains untouched; explicit opt-in import only, never automatic overwrite.
 (function legacyImport(){try{const raw=localStorage.getItem('ucan.l25.preview.v1:concept');if(!raw)return;const val=JSON.parse(raw);if(!val||val.v!==1||typeof val.text!=='string'||!val.text.trim())return;
   const region=$('legacy-draft');region.classList.remove('hidden');region.replaceChildren();region.append(Object.assign(document.createElement('p'),{textContent:'Знайдено попередню чернетку концепції. Можна імпортувати текст до нового редактора. Попередній запис залишиться незмінним.'}));
   const btn=document.createElement('button');btn.type='button';btn.className='button button-outline';btn.textContent='Імпортувати попередню чернетку';region.append(btn);
   btn.addEventListener('click',()=>{const state=l25Runtime.getState();if(state?.concept){region.querySelector('p').textContent='У поточному редакторі вже є текст. Імпорт не виконано, щоб не перезаписати Вашу роботу.';return}if(l25Runtime.actions.updatePortfolio({concept:val.text})){region.querySelector('p').textContent='Текст імпортовано в редактор. Попередній запис збережено окремо.';syncDelete();window.UCAN_RUNTIME.save()}});
  }catch(_){const region=$('legacy-draft');region.classList.remove('hidden');region.textContent='Попередню чернетку не вдалося прочитати. Старий запис не змінено.'}})();
}
