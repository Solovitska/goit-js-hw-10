import"./assets/styles-2c2b182a.js";import{i as t}from"./assets/vendor-77e16229.js";const s=document.querySelector(".form"),n=s.elements.delay,i=s.elements.state;s.addEventListener("submit",a);function a(e){e.preventDefault(),m(n.value),e.target.reset()}function m(e){if(e>0){const r=i.value==="fulfilled"?Promise.resolve(`✅ Fulfilled promise in ${e}ms`):Promise.reject(`❌ Rejected promise in ${e}ms`);setTimeout(()=>{r.then(o=>{t.show({message:o,backgroundColor:"rgba(82, 223, 79, 0.3)",position:"topCenter"})}).catch(o=>{t.show({message:o,backgroundColor:"rgba(223, 79, 79, 0.3)",position:"topCenter"})})},e)}else t.show({message:"Value must be more than 0",backgroundColor:"lightgrey",position:"topCenter"})}
//# sourceMappingURL=commonHelpers2.js.map
