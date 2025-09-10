// =================== NAVBAR HIDE/SHOW ===================
let prev = window.pageYOffset;
const nav = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  nav.style.top = prev > window.pageYOffset ? "0" : "-80px";
  prev = window.pageYOffset;
});

// =================== CAROUSEL ===================
const slides = document.querySelectorAll('.card');
const track = document.querySelector('.carousel');
let idx = 0;

function go(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
  track.style.transform = `translateX(-${i * slides[0].offsetWidth}px)`;
  idx = i;
}
document.querySelector('.prev')?.addEventListener('click', () => go((idx - 1 + slides.length) % slides.length));
document.querySelector('.next')?.addEventListener('click', () => go((idx + 1) % slides.length));
go(0);

// =================== ABOUT REVEAL ===================
const about = document.querySelector(".about-container");
window.addEventListener("scroll", () => {
  if (about?.getBoundingClientRect().top < window.innerHeight - 100) about.classList.add("show");
});

// =================== SMOOTH SCROLL ===================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({behavior:"smooth"});
  });
});

// =================== LIGHTBOX ===================
const imgs = document.querySelectorAll('.product-gallery img');
if (imgs.length) {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = '<span>&times;</span><img>';
  document.body.appendChild(lb);
  const img = lb.querySelector('img');
  const close = lb.querySelector('span');

  imgs.forEach(i => i.addEventListener('click', () => {
    img.src = i.src;
    lb.classList.add('show');
  }));
  close.addEventListener('click', () => lb.classList.remove('show'));
}
