// @ts-check
(() => {
  'use strict';
  const encoder=new TextEncoder(), decoder=new TextDecoder();
  const bytes = data => Array.from(data);
  const request = req => new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
  class OfflineVault {
    constructor({demo=false}={}){this.db=null;this.key=null;this.tenant=null;this.databaseName=demo?'ejuan-v6-bhw-demo':'ejuan-v6-bhw';}
    async open(){
      if(!window.isSecureContext || !crypto.subtle)throw new Error('Encrypted storage requires HTTPS or localhost.');
      if(this.db)return;
      const req=indexedDB.open(this.databaseName,1);
      req.onupgradeneeded=()=>{req.result.createObjectStore('meta');req.result.createObjectStore('records',{keyPath:'id'});};
      this.db=await request(req);
    }
    async read(store,id){return request(this.db.transaction(store).objectStore(store).get(id));}
    async write(store,value,id){
      return new Promise((resolve,reject)=>{
        const tx=this.db.transaction(store,'readwrite');
        if(id===undefined)tx.objectStore(store).put(value);else tx.objectStore(store).put(value,id);
        tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Storage transaction aborted'));
      });
    }
    async unlock(tenant,passphrase){
      this.lock();await this.open();
      if(!window.EJuan.tenants.some(t=>t.id===tenant))throw new Error('Unknown LGU.');
      if(passphrase.length<12)throw new Error('Use a passphrase with at least 12 characters.');
      const meta=await this.read('meta',tenant);
      const salt=meta?new Uint8Array(meta.salt):crypto.getRandomValues(new Uint8Array(16));
      const material=await crypto.subtle.importKey('raw',encoder.encode(passphrase),'PBKDF2',false,['deriveKey']);
      const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
      if(meta){
        try{const check=await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(meta.iv)},key,new Uint8Array(meta.check));if(decoder.decode(check)!=='E-JUAN vault')throw new Error();}
        catch{throw new Error('Incorrect passphrase. This LGU already has a vault: enter its original passphrase, not just any 12 characters. To explore without it, choose Open demo workspace. Your saved records have not changed.');}
      }else{
        const iv=crypto.getRandomValues(new Uint8Array(12));
        const check=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,encoder.encode('E-JUAN vault'));
        await this.write('meta',{salt:bytes(salt),iv:bytes(iv),check:bytes(new Uint8Array(check))},tenant);
      }
      this.key=key;this.tenant=tenant;
    }
    lock(){this.key=null;this.tenant=null;}
    async save(record){
      if(!this.key||record.tenant!==this.tenant)throw new Error('Unlock this LGU vault before saving.');
      if(!record.id||!['resident','report'].includes(record.kind))throw new Error('Invalid local record.');
      const key=this.key,tenant=this.tenant;
      const iv=crypto.getRandomValues(new Uint8Array(12));
      const ciphertext=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode(record.id)},key,encoder.encode(JSON.stringify(record)));
      if(this.key!==key||this.tenant!==tenant)throw new Error('Vault locked during save. Unlock and save again.');
      await this.write('records',{id:record.id,tenant,iv:bytes(iv),ciphertext:bytes(new Uint8Array(ciphertext))});
      return record;
    }
    async list(){
      if(!this.key)throw new Error('Vault locked.');
      const key=this.key,tenant=this.tenant;
      const records=await request(this.db.transaction('records').objectStore('records').getAll());
      const decoded=await Promise.all(records.filter(r=>r.tenant===tenant).map(async r=>{
        try{return JSON.parse(decoder.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(r.iv),additionalData:encoder.encode(r.id)},key,new Uint8Array(r.ciphertext))));}
        catch{throw new Error('A saved record could not be decrypted. Do not clear storage; contact support.');}
      }));
      if(this.key!==key||this.tenant!==tenant)throw new Error('Vault changed during read. Unlock again.');
      return decoded;
    }
  }
  window.EJuan.OfflineVault=OfflineVault;
})();
