// ========== NAVBAR ==========
let prev = scrollY, nav = document.getElementById("navbar");
addEventListener("scroll", () => {
  nav.style.top = scrollY < prev ? "0" : "-80px";
  prev = scrollY;
});

// ========== CAROUSEL ==========
const slides = [...document.querySelectorAll('.card')],
      track = document.querySelector('.carousel');
let idx = 0;
const go = i => {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
  track.style.transform = `translateX(-${i * slides[0].offsetWidth}px)`;
  idx = i;
};
document.querySelector('.prev')?.addEventListener('click', () => go((idx - 1 + slides.length) % slides.length));
document.querySelector('.next')?.addEventListener('click', () => go((idx + 1) % slides.length));
go(0);

// ========== ABOUT ==========
const about = document.querySelector(".about-container");
addEventListener("scroll", () => {
  if (about?.getBoundingClientRect().top < innerHeight - 100) about.classList.add("show");
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.onclick = e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href"))?.scrollIntoView({behavior:"smooth"});
  }
);

// ========== LIGHTBOX ==========
const imgs = document.querySelectorAll('.product-gallery img');
if (imgs.length) {
  document.body.insertAdjacentHTML("beforeend", '<div id="lightbox"><span>&times;</span><img></div>');
  const lb = document.getElementById("lightbox"), img = lb.querySelector("img");
  imgs.forEach(i => i.onclick = () => (img.src = i.src, lb.classList.add("show")));
  lb.querySelector("span").onclick = () => lb.classList.remove("show");
}
