
import logo from '../assets/LOGO.jpg';

function el(tag, props, children){ const e=document.createElement(tag); props=props||{}; for(const k in props) if(k==='style') e.style.cssText=props[k]; else e.setAttribute(k, props[k]); if(typeof children==='string') e.textContent=children; else (children||[]).forEach(c=>e.appendChild(c)); return e; }

function App(){
  const container = el('div', {class:'container'});
  const header = el('div', {style:'display:flex;align-items:center;gap:12px;'});
  const img = el('img', {src:logo, style:'height:56px;border-radius:8px'});
  const titleWrap = el('div');
  const h = el('h1', {style:'margin:0;font-size:20px;color:#000'}, 'Hairplus — Beauty at your doorstep');
  const p = el('p', {class:'muted', style:'margin:4px 0 0'}, 'Port Harcourt pilot • Suggest your price • Live stylists');
  titleWrap.appendChild(h); titleWrap.appendChild(p);
  header.appendChild(img); header.appendChild(titleWrap);
  container.appendChild(header);

  const card = el('div', {class:'card'});
  const intro = el('div', {}, [el('p', {style:'margin:0 0 8px'}, 'Multi-step booking demo (negotiation-style)')]);
  card.appendChild(intro);
  const startBtn = el('button', {class:'btn'}, 'Start Booking');
  startBtn.onclick = ()=> startFlow(container);
  card.appendChild(startBtn);
  container.appendChild(card);

  return container;
}

function startFlow(root){
  const card = root.querySelector('.card');
  card.style.display='none';

  const flow = el('div', {style:'margin-top:12px'});
  const s1 = el('div', {class:'card step'}, '');
  s1.appendChild(el('h3', {}, '1) Select Service'));
  const services = ['Hair Styling & Braids','Manicure & Pedicure','Makeup & Glam','Haircuts','Facials & Skincare'];
  services.forEach(s=>{
    const b = el('button', {style:'display:block;width:100%;margin:6px 0;padding:10px;border-radius:8px;border:1px solid #eee;background:#fff;cursor:pointer'}, s);
    b.onclick = ()=> { s1.style.display='none'; step2(root, s); };
    s1.appendChild(b);
  });
  flow.appendChild(s1);
  root.appendChild(flow);
}

function step2(root, service){
  const step = el('div', {class:'card step'}, '');
  step.appendChild(el('h3', {}, '2) Choose Date & Time'));
  const input = el('input', {placeholder:'e.g., Sat, 3 PM'});
  const btn = el('button', {class:'btn', style:'margin-top:8px'}, 'Next');
  btn.onclick = ()=> { step.style.display='none'; step3(root, service, input.value); };
  step.appendChild(input); step.appendChild(btn);
  root.appendChild(step);
}

function step3(root, service, time){
  const step = el('div', {class:'card step'}, '');
  step.appendChild(el('h3', {}, '3) Enter Location'));
  const input = el('input', {placeholder:'e.g., GRA, Port Harcourt'});
  const btn = el('button', {class:'btn', style:'margin-top:8px'}, 'Next');
  btn.onclick = ()=> { step.style.display='none'; step4(root, service, time, input.value); };
  step.appendChild(input); step.appendChild(btn);
  root.appendChild(step);
}

function step4(root, service, time, location){
  const step = el('div', {class:'card step'}, '');
  step.appendChild(el('h3', {}, '4) Propose Price (₦)'));
  const input = el('input', {placeholder:'Enter your offer (e.g., 5000)'});
  const btn = el('button', {class:'btn', style:'margin-top:8px'}, 'Next');
  btn.onclick = ()=> { step.style.display='none'; step5(root, service, time, location, input.value); };
  step.appendChild(input); step.appendChild(btn);
  root.appendChild(step);
}

function step5(root, service, time, location, price){
  const step = el('div', {class:'card step'}, '');
  step.appendChild(el('h3', {}, '5) Your Contact'));
  const name = el('input', {placeholder:'Your name'});
  const phone = el('input', {placeholder:'Phone (+234...)'});
  const btn = el('button', {class:'btn', style:'margin-top:8px'}, 'Confirm & Send');
  btn.onclick = ()=> { 
    step.innerHTML = '';
    const data = {service, time, location, price, name: name.value, phone: phone.value, timestamp: new Date().toISOString()};
    const p = el('pre', {style:'white-space:pre-wrap'}, 'Booking submitted (demo):\n' + JSON.stringify(data,null,2));
    step.appendChild(p);
    showStylists(step);
    const dl = el('a', {href:'data:application/json,' + encodeURIComponent(JSON.stringify(data)), style:'display:block;margin-top:8px'}, 'Download booking JSON');
    step.appendChild(dl);
  };
  step.appendChild(name); step.appendChild(document.createElement('br')); step.appendChild(phone); step.appendChild(btn);
  root.appendChild(step);
}

function showStylists(container){
  const box = el('div', {style:'margin-top:12px'});
  box.appendChild(el('h3', {}, 'Stylists Nearby (seeded Port Harcourt)'));
  const stylists = [
    {name:'Ada B.', dist:'1.2 km', rating:'4.9', eta:'20 mins'},
    {name:'Blessing S.', dist:'2.3 km', rating:'4.8', eta:'28 mins'},
    {name:'Tunde K.', dist:'3.1 km', rating:'4.7', eta:'35 mins'},
    {name:'Grace O.', dist:'2.6 km', rating:'4.8', eta:'22 mins'},
    {name:'Ngozi L.', dist:'3.9 km', rating:'4.6', eta:'40 mins'},
  ];
  stylists.forEach(s=>{
    const card = el('div', {style:'border:1px solid #eee;padding:8px;margin-top:8px;border-radius:8px'});
    card.appendChild(el('strong', {}, s.name));
    card.appendChild(el('div', {class:'muted'}, s.dist + ' • ⭐' + s.rating + ' • ' + s.eta));
    box.appendChild(card);
  });
  container.appendChild(box);
}

export default App;
