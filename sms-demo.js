(() => {
  'use strict';
  const thread=document.querySelector('#sms-thread'),input=document.querySelector('#sms-input'),notice=document.querySelector('#sms-notice');
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const routine={title:'E-JUAN Alert: Symptom logged.',text:"Demo guidance: Rest and keep hydrated if you can. Contact a health professional for assessment.\n\nNearest Clinic: San Jose Barangay Health Center\nHours: 8 AM–4 PM (sample; opening unverified)\nFree Paracetamol: Sample listing only. Confirm stock, eligibility and dispensing requirements.\n\nVisit Reference: #SJ-042 (demo). No queue reservation or priority.\n\nReply STOP to end this demo or EMERGENCY for urgent guidance. For serious symptoms, seek help now."};
  const urgent={title:'E-JUAN URGENT: Warning signs reported.',text:"Action Required: Seek immediate assessment at an emergency department. Call 911 if you may be in danger.\n\nNo dengue diagnosis or risk assessment is made by this demo.\n\nCity General Hospital ER: Fictional example; local emergency options are unverified.\n\nEmergency Alert: Not Submitted. No alert sent to City Emergency Services. No ambulance requested or dispatched.\n\nDo not wait for an SMS reply."};
  let scenario='routine',subscribed=true,messages=[];
  function render(scroll=false){
    thread.innerHTML=`<p class="thread-date"><strong>Text Message · SMS</strong>Today, 9:41 AM · Fictional conversation</p>`+messages.map(m=>`<div class="message-row ${m.outgoing?'outgoing':''} ${m.urgent?'urgent':''}"><div class="message-bubble">${m.title?`<span class="message-heading">${esc(m.title)}</span>`:''}${esc(m.text)}</div><div class="message-caption">${m.outgoing?'Jave Jayson · Not sent · Demo only':'Sample reply · No gateway connected'}</div></div>`).join('');
    document.querySelectorAll('[data-scenario]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scenario===scenario)));
    if(scroll)thread.scrollTop=thread.scrollHeight;else thread.scrollTop=0;
  }
  function load(next){scenario=next;subscribed=true;notice.textContent='';messages=next==='urgent'?[{outgoing:true,text:'EMERGENCY. I feel much worse.'},{...urgent,urgent:true}]:[{outgoing:true,text:'Fever & headache since yesterday. San Jose.'},{...routine}];showThread();render();}
  function showThread(){document.querySelector('#sms-inbox').hidden=true;thread.hidden=false;document.querySelector('#sms-footer').hidden=false;document.querySelector('.scenario-controls').hidden=false;}
  function send(text){
    const value=text.trim();if(!value){notice.textContent='Enter a demo message or choose a quick reply.';return;}
    messages.push({outgoing:true,text:value});const command=value.toUpperCase();
    if(command==='EMERGENCY'){messages.push({...urgent,urgent:true});scenario='urgent';notice.textContent='Urgent scene preview only. No emergency request has been submitted.';}
    else if(command==='STOP'){subscribed=false;messages.push({title:'E-JUAN demo: Conversation stopped.',text:'No real subscription was changed. Reply START to resume this scripted demo.'});notice.textContent='Demo replies paused. Nothing was sent.';}
    else if(command==='START'){subscribed=true;scenario='routine';messages.push({title:'E-JUAN demo: Conversation resumed.',text:'No real subscription was created.'},{...routine});notice.textContent='Scripted routine guidance restored.';}
    else{messages.push({text:subscribed?'This message was not sent or assessed. Choose Routine or Urgent, or reply STOP, START or EMERGENCY to explore the scripted demo.':'Demo replies are paused. Reply START to resume. For a real emergency, contact emergency services directly.'});notice.textContent='Local preview only. No symptom analysis or transmission.';}
    input.value='';render(true);
  }
  document.querySelector('#sms-form').addEventListener('submit',event=>{event.preventDefault();send(input.value);});
  document.addEventListener('click',event=>{const scenarioButton=event.target.closest('[data-scenario]'),replyButton=event.target.closest('[data-reply]');if(scenarioButton)load(scenarioButton.dataset.scenario);if(replyButton)send(replyButton.dataset.reply);});
  document.querySelector('#messages-back').addEventListener('click',()=>{document.querySelector('#sms-inbox').hidden=false;thread.hidden=true;document.querySelector('#sms-footer').hidden=true;document.querySelector('.scenario-controls').hidden=true;notice.textContent='';});
  document.querySelector('#open-sms-thread').addEventListener('click',()=>showThread());
  document.querySelector('#sms-info').addEventListener('click',()=>document.querySelector('#sms-info-dialog').showModal());
  load('routine');
})();
