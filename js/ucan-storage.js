/* UCAN-L25 scoped storage adapter. Cache successful reads and never report an unconfirmed deletion. */
window.UCAN_STORAGE=(()=>{'use strict';
 const root=window.UCAN_LESSON_CONFIG?.storageNamespace; if(typeof root!=='string'||!root)throw Error('Storage namespace is missing');
 const keys=Object.freeze({consent:root+':consent',concept:root+':concept',progress:root+':progress'});
 const mem=Object.create(null);let degraded=false;const failures=Object.create(null);
 const checked=k=>{if(!Object.prototype.hasOwnProperty.call(keys,k))throw Error('Unknown storage key: '+k);return keys[k]};
 function read(k){const key=checked(k);if(degraded)return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null;
   try{const value=localStorage.getItem(key);if(value===null)delete mem[k];else mem[k]=value;return value}
   catch(e){degraded=true;failures[k]='read';return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null}
 }
 function write(k,value){const key=checked(k);if(typeof value!=='string')throw Error('Storage value must be string');
   try{localStorage.setItem(key,value);mem[k]=value;degraded=false;delete failures[k];return true}
   catch(e){mem[k]=value;degraded=true;failures[k]='write';return false}
 }
 function remove(k){const key=checked(k);
   try{localStorage.removeItem(key);delete mem[k];degraded=false;delete failures[k];return true}
   catch(e){degraded=true;failures[k]='remove';/* Preserve loaded concept even if deletion failed. */return false}
 }
 function parse(k,guard){const raw=read(k);if(raw==null)return null;try{const v=JSON.parse(raw);if(!guard(v))throw Error('invalid schema');return v}catch(e){failures[k]='corrupt';return {corrupt:true}}}
 function status(){return Object.freeze({degraded,failures:{...failures}})}
 return Object.freeze({keys,read,write,remove,parse,usingFallback:()=>degraded,status});
})();
