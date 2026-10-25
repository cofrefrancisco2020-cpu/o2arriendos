'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const names = {maxus:'Maxus T60 4x4',ssangyong:'SsangYong 4x4',camion:'Camión de apoyo',asesoria:'Vehículo por definir · necesito asesoría'};
  const services = {vehiculos:'Arriendo de vehículos',flotas:'Gestión de flotas',equipos:'Arriendo de equipos',carga:'Transporte de carga',motos:'Transporte de motos',audiovisual:'Producción audiovisual'};
  const selected = new Map();
  const isVehicleService = () => ['vehiculos','flotas','audiovisual'].includes($('service').value);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toastTimer, requestText = '', galleryIndex = 0;

  $('year').textContent = new Date().getFullYear();
  const menuButton = document.querySelector('.menu-toggle');
  const nav = $('main-nav');
  const closeMenu = () => {nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');};
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
  window.matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

  if ('IntersectionObserver' in window && !reducedMotion) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }
  function toast(text) {
    $('toast').textContent=text;$('toast').classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3200);
  }
  function renderSelected() {
    const list=$('selected-vehicles');list.replaceChildren();
    if(!selected.size){const p=document.createElement('p');p.className='empty-selection';p.textContent='Agrega un vehículo o elige “Necesito asesoría”.';list.append(p);}
    selected.forEach((quantity,id)=>{
      const row=document.createElement('div');row.className='selected-row';
      const title=document.createElement('strong');title.textContent=names[id];
      const input=document.createElement('input');input.type='number';input.min='1';input.max='100';input.required=true;input.value=quantity;input.setAttribute('aria-label','Cantidad de '+names[id]);input.dataset.quantity=id;input.disabled=!isVehicleService();
      input.addEventListener('input',()=>{if(input.validity.valid){selected.set(id,Number(input.value));updateCount();}});
      const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label','Quitar '+names[id]);remove.addEventListener('click',()=>{selected.delete(id);renderSelected();});
      row.append(title,input,remove);list.append(row);
    });
    updateCount();
  }
  function updateCount(){ $('selection-count').textContent=[...selected.values()].reduce((a,b)=>a+b,0); }
  function addVehicle(id,count=1,notify=true) {
    if(!names[id])return;
    selected.set(id,Math.min(100,(selected.get(id)||0)+count));renderSelected();
    if(notify)toast(names[id]+' agregado a tu solicitud');
  }
  function updateService(){
    const vehicle=isVehicleService(),equipment=$('service').value==='equipos',transport=['carga','motos'].includes($('service').value);
    [['vehicle-selection',vehicle],['equipment-fields',equipment],['transport-fields',transport]].forEach(([id,show])=>{
      $(id).hidden=!show;$(id).querySelectorAll('input,select,button').forEach(el=>el.disabled=!show);
    });
    ['origin','destination','cargo','transport-quantity'].forEach(id=>$(id).required=transport);
    $('equipment-quantity').required=equipment;
    $('location-label').hidden=transport;$('location').disabled=transport;$('location').required=!transport;
    $('form-error').hidden=true;
  }
  $('service').addEventListener('change',updateService);
  document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{
    $('service').value=a.dataset.service;updateService();
  }));
  document.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>{
    if(!isVehicleService())$('service').value='vehiculos';
    updateService();addVehicle(button.dataset.add);
  }));
  $('add-selection').addEventListener('click',()=>addVehicle($('vehicle-choice').value));
  $('quick-quote').addEventListener('submit',e=>{
    e.preventDefault();$('service').value=$('quick-service').value;updateService();
    const count=Number($('quick-quantity').value);
    if(isVehicleService())addVehicle('asesoria',count,false);
    if($('service').value==='equipos')$('equipment-quantity').value=count;
    if(['carga','motos'].includes($('service').value))$('transport-quantity').value=count;
    $('cotizar').scrollIntoView({behavior:reducedMotion?'auto':'smooth'});
    toast('Completa los detalles de tu solicitud');
  });
  document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    let count=0;
    document.querySelectorAll('.vehicle-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden){card.classList.add('visible');count++;}});
    $('filter-status').textContent=count+' opciones de vehículos';
  }));

  const photos=[
    {id:'maxus-lateral',alt:'Maxus T60 roja de doble cabina, vista lateral',story:true},
    {id:'ssangyong',alt:'Camioneta SsangYong negra de doble cabina'},
    {id:'camion-apoyo',alt:'Camión de apoyo blanco con plataforma'},
    {id:'maxus-frontal',alt:'Frente de la camioneta Maxus roja',story:true},
    {id:'camioneta-bosque',alt:'Camioneta blanca en un camino de bosque',story:true},
    {id:'flota-maxus',alt:'Camionetas de la flota con implementos de faena'},
    {id:'camioneta-terreno',alt:'Camioneta en camino de terreno junto a un mirador',story:true}
  ];
  function drawPhoto(){
    const photo=photos[galleryIndex],img=new Image();img.src='./assets/'+photo.id+'.webp';img.alt=photo.alt;
    $('lightbox-photo').classList.toggle('story-view',!!photo.story);$('lightbox-photo').replaceChildren(img);
    $('lightbox-caption').textContent=photo.alt+' · '+(galleryIndex+1)+' / '+photos.length;
  }
  function openDialog(dialog){dialog.showModal();document.body.style.overflow='hidden';}
  document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{
    galleryIndex=photos.findIndex(p=>p.id===button.dataset.gallery);drawPhoto();openDialog($('image-dialog'));
  }));
  function changePhoto(step){galleryIndex=(galleryIndex+step+photos.length)%photos.length;drawPhoto();}
  $('lightbox-prev').addEventListener('click',()=>changePhoto(-1));$('lightbox-next').addEventListener('click',()=>changePhoto(1));
  $('image-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();changePhoto(1);}if(e.key==='ArrowLeft'){e.preventDefault();changePhoto(-1);}});
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>{document.body.style.overflow='';});
    dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
  });
  const track=$('gallery-track');
  function galleryScroll(step){track.scrollBy({left:step*(track.firstElementChild.clientWidth+20),behavior:reducedMotion?'auto':'smooth'});}
  $('gallery-prev').addEventListener('click',()=>galleryScroll(-1));$('gallery-next').addEventListener('click',()=>galleryScroll(1));
  track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();galleryScroll(1);}if(e.key==='ArrowLeft'){e.preventDefault();galleryScroll(-1);}});
  function galleryButtons(){$('gallery-prev').disabled=track.scrollLeft<=2;$('gallery-next').disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2;}
  track.addEventListener('scroll',galleryButtons,{passive:true});window.addEventListener('resize',galleryButtons);galleryButtons();

  function todayChile(){
    const p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Santiago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const v=type=>p.find(x=>x.type===type).value;return v('year')+'-'+v('month')+'-'+v('day');
  }
  $('start').min=todayChile();$('end').min=todayChile();
  function updateDates(){
    $('end').min=$('start').value||todayChile();
    $('end').setCustomValidity($('start').value&&$('end').value&&$('end').value<$('start').value?'La fecha de término debe ser igual o posterior al inicio.':'');
  }
  $('start').addEventListener('input',updateDates);$('end').addEventListener('input',updateDates);
  const formatDate=value=>{const [y,m,d]=value.split('-');return d+'/'+m+'/'+y;};
  const clean=id=>$(id).value.trim();
  function showError(message,id){$('form-error').textContent=message;$('form-error').hidden=false;if(id)$(id).focus();}
  $('quote-form').addEventListener('submit',e=>{
    e.preventDefault();$('form-error').hidden=true;
    if(isVehicleService()&&!selected.size){showError('Agrega al menos un vehículo o selecciona “Necesito asesoría”.','vehicle-choice');return;}
    if(clean('customer-name').length<2){showError('Escribe tu nombre para que podamos responder tu solicitud.','customer-name');return;}
    const transport=['carga','motos'].includes($('service').value);
    if(!transport&&!clean('location')){showError('Indica la ciudad o lugar de operación.','location');return;}
    if(transport&&['origin','destination','cargo'].some(id=>!clean(id))){showError('Completa el origen, destino y la descripción del traslado.','origin');return;}
    const lines=['Hola O2 Arriendos, quisiera solicitar una cotización.','','Servicio: '+services[$('service').value],'Nombre: '+clean('customer-name')];
    if(clean('company'))lines.push('Empresa: '+clean('company'));
    if(isVehicleService()){
      lines.push('','Vehículos solicitados:');
      selected.forEach((quantity,id)=>lines.push('• '+names[id]+' — '+quantity+' unidad'+(quantity===1?'':'es')));
    }
    if($('service').value==='equipos')lines.push('Equipo: '+$('equipment').value,'Cantidad: '+$('equipment-quantity').value);
    if(transport)lines.push('Origen: '+clean('origin'),'Destino: '+clean('destination'),'Carga / modelo de moto: '+clean('cargo'),'Unidades a trasladar: '+$('transport-quantity').value);
    else lines.push('Lugar de operación: '+clean('location'));
    lines.push('','Inicio: '+formatDate($('start').value),'Término: '+formatDate($('end').value));
    if(clean('notes'))lines.push('','Comentarios: '+clean('notes'));
    lines.push('','Por favor, confirmar disponibilidad, tarifa y condiciones.','Autorizo el uso de estos datos para responder esta solicitud.');
    requestText=lines.join('\n');$('quote-preview').textContent=requestText;
    $('send-whatsapp').href='https://wa.me/56992212300?text='+encodeURIComponent(requestText);
    $('copy-status').textContent='También puedes copiar el detalle y enviarlo manualmente.';
    openDialog($('quote-dialog'));
  });
  $('copy-request').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(requestText);$('copy-status').textContent='Solicitud copiada. Puedes pegarla en WhatsApp.';}
    catch{const selection=window.getSelection(),range=document.createRange();range.selectNodeContents($('quote-preview'));selection.removeAllRanges();selection.addRange(range);$('copy-status').textContent='Seleccionamos el mensaje. Usa la opción Copiar de tu dispositivo.';}
  });
  renderSelected();updateService();
})();
