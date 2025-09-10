/* =================== NAVBAR HIDE/SHOW =================== */
let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";
  }
  prevScrollPos = currentScrollPos;
});

/* =================== CAROUSEL =================== */
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

/* =================== NEWSLETTER =================== */
document.getElementById("newsletter-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg");

  if (email.includes("@")) {
    msg.textContent = "Terima kasih sudah berlangganan!";
    msg.style.color = "lightgreen";
    document.getElementById("email").value = "";
  } else {
    msg.textContent = "Masukkan email yang valid.";
    msg.style.color = "salmon";
  }
});

/* =================== REVEAL ABOUT SECTION =================== */
const aboutSection = document.querySelector(".about-container");
window.addEventListener("scroll", () => {
  if (!aboutSection) return;
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    aboutSection.classList.add("show");
  }
});

/* =================== SMOOTH SCROLL =================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
