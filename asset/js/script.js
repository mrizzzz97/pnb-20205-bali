const slides = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

function showSlide(i) {
  const cardWidth = slides[0].offsetWidth + 30; // lebar card + margin (300 + 15+15)
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${(idx - i) * cardWidth}px)`;
  });
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

// Init
showSlide(index);
