(() => {
  'use strict';
  const showcase=document.querySelector('.showcase'),phone=document.querySelector('#device');
  const workspace=document.querySelector('#workspace-preview'),display=workspace.querySelector('.workspace-display');
  const caption=document.querySelector('.device-caption'),label=document.querySelector('#screen-label');
  const frames={bhw:document.querySelector('#bhw-preview'),lgu:document.querySelector('#lgu-preview')};
  const smsPhone=document.querySelector('#sms-device'),smsFrame=document.querySelector('#sms-preview');
  let active='citizen',phoneLabel=label.textContent;
  function fit(){
    if(active==='citizen'||active==='sms')return;
    const frame=frames[active],width=Number(frame.dataset.width),height=Number(frame.dataset.height);
    const scale=display.clientWidth/width;
    display.style.height=`${height*scale}px`;
    frame.style.width=`${width}px`;frame.style.height=`${height}px`;frame.style.transform=`scale(${scale})`;
  }
  function select(client){
    if(!['citizen','sms','bhw','lgu'].includes(client))return;
    if(active==='citizen')phoneLabel=label.textContent;
    active=client;showcase.dataset.preview=client;
    phone.hidden=client!=='citizen';smsPhone.hidden=client!=='sms';workspace.hidden=!['bhw','lgu'].includes(client);
    if(client==='sms'&&!smsFrame.getAttribute('src'))smsFrame.src='sms-demo.html?embedded=1';
    for(const [id,frame] of Object.entries(frames)){
      frame.hidden=id!==client;
      if(id===client&&!frame.getAttribute('src'))frame.src=`${id}.html?embedded=1`;
    }
    label.textContent=client==='citizen'?phoneLabel:client==='sms'?'NATIVE SMS / PHONE PREVIEW':client==='bhw'?'BHW / TABLET PREVIEW':'LGU / DESKTOP PREVIEW';
    caption.lastElementChild.textContent=client==='citizen'?'Built for touch. Made to explore.':client==='sms'?'Phone Messages · Scripted demo':client==='bhw'?'Barangay health worker · Tablet interface':'Municipal operations · Desktop interface';
    document.querySelector('.preview-area').setAttribute('aria-label',client==='citizen'?'Interactive mobile app preview':client==='sms'?'Native Messages phone demo':client==='bhw'?'Interactive tablet app preview':'Interactive desktop app preview');
    document.querySelectorAll('.portal-links a[data-preview]').forEach(link=>{if(link.dataset.preview===client)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
    window.dispatchEvent(new CustomEvent('ejuan:preview-change',{detail:client}));
    fit();
    if(innerWidth<=780&&client!=='citizen')(client==='sms'?smsPhone:workspace).scrollIntoView({block:'start',behavior:'smooth'});
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('.portal-links a[data-preview]');
    if(link){if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();select(link.dataset.preview);return;}
    if(event.target.closest('.story-panel [data-nav]'))select('citizen');
  },true);
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin||!Object.values(frames).some(frame=>frame.contentWindow===event.source))return;
    if(event.data?.type==='ejuan-preview'&&event.data.client==='citizen')select('citizen');
  });
  new ResizeObserver(fit).observe(display);
})();
