const slides = document.querySelectorAll('.card');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function updateActiveSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
    if (idx === i) {
      slide.classList.add('active');
    }
  });

  const card = slides[0];
  const style = window.getComputedStyle(card);
  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  const cardWidth = card.offsetWidth + margin;

  carousel.style.transform = `translateX(${-i * cardWidth}px)`;
  index = i;
}

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateActiveSlide(index);
});

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateActiveSlide(index);
});

// Init
updateActiveSlide(index);
