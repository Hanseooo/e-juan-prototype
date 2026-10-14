// @ts-check
(() => {
  'use strict';
  /** @typedef {'davao'|'santa-cruz'} TenantId */
  /** @typedef {{id:string,tenant:TenantId,name:string,barangay:string,address:string,type:string,services:string[],hours:string|null,contact:string|null,updated:string|null,verified:boolean,distance:string,x:number,y:number}} Facility */
  const tenants = [{id:'davao',name:'Davao City'}, {id:'santa-cruz',name:'Municipality of Santa Cruz, Davao del Sur'}];
  /** @type {Facility[]} */
  const facilities = [
    {id:'davao-bhc',tenant:'davao',name:'Sample Poblacion Health Center',barangay:'Poblacion',address:'Illustrative Poblacion address, Davao City',type:'Barangay Health Center',services:['Primary care','Maternal care','Immunization'],hours:'Mon–Fri, 8 AM–5 PM · sample',contact:null,updated:'2026-10-14T08:00:00+08:00',verified:true,distance:'1.2 km · sample',x:35,y:38},
    {id:'davao-cho',tenant:'davao',name:'Sample City Health Office',barangay:'Bajada',address:'Illustrative Bajada address, Davao City',type:'City Health Office',services:['Primary care','Immunization','Medicine dispensing'],hours:'Mon–Fri, 8 AM–5 PM · sample',contact:null,updated:'2026-09-01T08:00:00+08:00',verified:true,distance:'3.4 km · sample',x:68,y:25},
    {id:'davao-matina',tenant:'davao',name:'Sample Matina Health Center',barangay:'Matina',address:'Illustrative Matina address, Davao City',type:'Barangay Health Center',services:['Primary care','Maternal care'],hours:null,contact:null,updated:null,verified:false,distance:'4.1 km · sample',x:58,y:70},
    {id:'sc-rhu',tenant:'santa-cruz',name:'Sample Santa Cruz Rural Health Unit',barangay:'Zone I',address:'Illustrative Zone I address, Santa Cruz, Davao del Sur',type:'Rural Health Unit',services:['Primary care','Maternal care','Medicine dispensing'],hours:'Mon–Fri, 8 AM–5 PM · sample',contact:null,updated:'2026-10-14T09:00:00+08:00',verified:true,distance:'2.0 km · sample',x:38,y:45},
    {id:'sc-mho',tenant:'santa-cruz',name:'Sample Municipal Health Office',barangay:'Zone II',address:'Illustrative Zone II address, Santa Cruz, Davao del Sur',type:'Municipal Health Office',services:['Primary care','Immunization'],hours:null,contact:null,updated:null,verified:false,distance:'Not available',x:68,y:64}
  ];
  const medicines = [
    {id:'paracetamol',generic:'Paracetamol',brand:null,strength:'500 mg',form:'Tablet',requirements:'Ask the dispensing professional about eligibility and appropriate use.'},
    {id:'amoxicillin',generic:'Amoxicillin',brand:null,strength:'500 mg',form:'Capsule',requirements:'Valid prescription and facility dispensing assessment required.'},
    {id:'ors',generic:'Oral rehydration salts',brand:null,strength:'20.5 g',form:'Sachet',requirements:'Confirm formulation and dispensing requirements with the facility.'}
  ];
  const inventory = [
    {medicine:'paracetamol',facility:'davao-bhc',status:'Available',quantity:120,confirmed:'2026-10-14T08:00:00+08:00'},
    {medicine:'paracetamol',facility:'davao-cho',status:'Limited Stock',quantity:12,confirmed:'2026-09-01T08:00:00+08:00'},
    {medicine:'paracetamol',facility:'davao-matina',status:'Unconfirmed',quantity:null,confirmed:null},
    {medicine:'amoxicillin',facility:'davao-bhc',status:'Unavailable',quantity:0,confirmed:'2026-10-14T08:00:00+08:00'},
    {medicine:'ors',facility:'davao-cho',status:'Available',quantity:80,confirmed:'2026-10-14T08:00:00+08:00'},
    {medicine:'paracetamol',facility:'sc-rhu',status:'Available',quantity:64,confirmed:'2026-10-14T09:00:00+08:00'},
    {medicine:'amoxicillin',facility:'sc-rhu',status:'Limited Stock',quantity:8,confirmed:'2026-10-14T09:00:00+08:00'},
    {medicine:'ors',facility:'sc-mho',status:'Unconfirmed',quantity:null,confirmed:null}
  ];
  const stamp = value => value ? new Date(value).toLocaleString('en-PH',{timeZone:'Asia/Manila',dateStyle:'medium',timeStyle:'short'}) + ' PHT · sample' : 'No confirmed update';
  const stale = value => !value || Date.now()-new Date(value).getTime()>7*86400000;
  const scoped = tenant => facilities.filter(f=>f.tenant===tenant);
  const stocks = tenant => inventory.filter(i=>scoped(tenant).some(f=>f.id===i.facility)).map(i=>({...i,effectiveStatus:stale(i.confirmed)?'Unconfirmed':i.status}));
  // A disconnected production adapter must never silently fall back to demo success.
  const production = {mode:'production',async sync(){throw new Error('Authenticated backend is not configured. Reports remain on this device.');}};
  const demo = {mode:'demo',async sync(record, scenario='success') {
    if(!navigator.onLine)throw new Error('Offline. Retry when a connection is available.');
    if(scenario==='failed')throw new Error('Simulated connection failure; local report retained.');
    return {id:record.id,version:record.version,status:scenario==='conflict'?'conflict':'synced',demo:true};
  }};
  window.EJuan = {tenants,facilities,medicines,inventory,stamp,stale,scoped,stocks,adapters:{demo,production}};
})();
