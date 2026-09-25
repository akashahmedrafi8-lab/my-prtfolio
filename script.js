const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu-btn');
menu?.addEventListener('click',()=>{
  const open=nav?.classList.toggle('open');
  menu?.setAttribute('aria-expanded',String(!!open));
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
}));
const revealObserver=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');revealObserver.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}});
const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];
const activeObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55%'});
sections.forEach(s=>activeObserver.observe(s));
