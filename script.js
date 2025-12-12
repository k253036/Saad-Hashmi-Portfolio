document.addEventListener('DOMContentLoaded',()=>{
// year
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

// Mobile nav
const navToggle=document.getElementById('navToggle');
const mainNav=document.getElementById('mainNav');
navToggle?.addEventListener('click',()=>{const expanded=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!expanded));mainNav?.classList.toggle('open');if(mainNav){if(mainNav.classList.contains('open')) mainNav.style.display='flex';else mainNav.style.display='';}});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){const href=this.getAttribute('href');if(!href||href==='#')return;const target=document.querySelector(href);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});if(mainNav&&mainNav.classList.contains('open')){mainNav.classList.remove('open');navToggle.setAttribute('aria-expanded','false');mainNav.style.display='';}}});});

// Reveal on scroll
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');io.unobserve(entry.target);}})},{threshold:0.12});
reveals.forEach(el=>io.observe(el));

// Parallax shapes
const parallaxEl=document.querySelector('[data-parallax]');
if(parallaxEl){
const shapes=document.querySelectorAll('.bg-shape');
window.addEventListener('scroll',()=>{const sc=window.scrollY;shapes.forEach((s,i)=>{const speed=(i+1)*0.03;s.style.transform=`translateY(${sc*speed}px)`;});},{passive:true});
}

// Lightbox
window.openLightbox=function(src){const lb=document.getElementById('lightbox');const img=document.getElementById('lightboxImg');if(img&&lb){img.src=src;lb.classList.add('open');setTimeout(()=>{document.addEventListener('keydown',escHandler);},0);}};
window.closeLightbox=function(){const lb=document.getElementById('lightbox');if(lb){lb.classList.remove('open');document.removeEventListener('keydown',escHandler);const img=document.getElementById('lightboxImg');if(img)img.src='';}};
function escHandler(e){if(e.key==='Escape')closeLightbox();}

// Contact form demo
window.submitForm=function(e){e.preventDefault();const name=document.getElementById('name').value.trim();const email=document.getElementById('email').value.trim();const subject=document.getElementById('subject').value.trim()||'Message from portfolio';const message=document.getElementById('message').value.trim();const feedback=document.getElementById('formFeedback');if(!name||!email||!message){if(feedback){feedback.textContent='Please fill required fields.';feedback.style.color='salmon';}return;}if(feedback){feedback.style.color='lightgreen';feedback.textContent=`Thanks ${name}! Opening your mail client...`;}
// open mailto
const mailto=`mailto:saadjamil.aps@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: '+name+'\\nEmail: '+email+'\\n\\n'+message)}`;
window.open(mailto);setTimeout(()=>{document.getElementById('contactForm').reset();if(feedback)feedback.textContent='';},2000);}
});
