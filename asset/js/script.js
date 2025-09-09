const slides = document.querySelectorAll('.card');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  const cardWidth = slides[0].offsetWidth + 20; // lebar kartu + margin kiri/kanan
  carousel.style.transform = `translateX(${-i * cardWidth}px)`;
  index = i;
}

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

// Init posisi awal
showSlide(index);
