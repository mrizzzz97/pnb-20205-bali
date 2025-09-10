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
/* Newsletter removed */

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

/* =================== REVEAL ON SCROLL (PRODUCT PAGES) =================== */
function revealOnScroll() {
  const observers = [];
  const inView = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 80;
  };

  document.querySelectorAll('.product-hero, .product-info, .product-gallery').forEach(el => {
    // set initial state handled by CSS; check immediately
    if (inView(el)) el.classList.add('in-view');
  });

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.product-hero, .product-info, .product-gallery').forEach(el => {
      if (inView(el)) el.classList.add('in-view');
    });
  }, { passive: true });
}

revealOnScroll();

/* =================== LIGHTBOX FOR GALLERY =================== */
(function() {
  const galleryImgs = document.querySelectorAll('.product-gallery img');
  if (!galleryImgs.length) return;

  // create lightbox element
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = '<span class="close">&times;</span><img src="" alt="">';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('show');
  }
  function close() { lightbox.classList.remove('show'); lbImg.src = ''; }

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeBtn) close();
  });
  document.addEventListener('keyup', (e) => { if (e.key === 'Escape') close(); });
})();

/* =================== GALLERY CAROUSEL INIT =================== */
(function() {
  const galleries = document.querySelectorAll('.gallery-carousel');
  galleries.forEach(gallery => {
    const track = gallery.querySelector('.carousel-track');
    const prev = gallery.querySelector('.g-prev');
    const next = gallery.querySelector('.g-next');
    const slides = track.querySelectorAll('.slide');
    if (!track || slides.length === 0) return;

    // calculate slide width including margin
    function slideWidth() {
      const s = slides[0];
      const style = window.getComputedStyle(s);
      const mr = parseFloat(style.marginRight) || 0;
      return s.offsetWidth + mr;
    }

    let pos = 0;
    prev.addEventListener('click', () => {
      pos = Math.max(0, pos - 1);
      track.scrollTo({ left: pos * slideWidth(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      pos = Math.min(slides.length - 1, pos + 1);
      track.scrollTo({ left: pos * slideWidth(), behavior: 'smooth' });
    });

    // make slides focusable and open in lightbox on click
    slides.forEach(s => {
      const img = s.querySelector('img');
      if (!img) return;
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        // reuse existing lightbox if present
        const lb = document.getElementById('lightbox');
        if (lb) {
          const lbImg = lb.querySelector('img');
          lbImg.src = img.src;
          lb.classList.add('show');
        }
      });
    });
  });
})();

/* Large gallery (main + thumbnails) behavior */
(function() {
  // Robust init: attach behavior per .gallery-large instance
  const larges = document.querySelectorAll('.gallery-large');
  larges.forEach(large => {
  // avoid double initialization
  if (large.dataset.galleryInit === 'true') return;
    // find the nearest container that holds the thumbs: prefer .gallery-wrapper, then .product-gallery, then document
    const container = large.closest('.gallery-wrapper') || large.closest('.product-gallery') || document;
    const thumbs = container.querySelectorAll('.gallery-thumbs .thumb');
    if (!thumbs || thumbs.length === 0) return;

    const lgImg = large.querySelector('.lg-image');
    const prev = large.querySelector('.lg-prev');
    const next = large.querySelector('.lg-next');

    let idx = 0;
    function setActive(i) {
      idx = (i + thumbs.length) % thumbs.length;
      const src = thumbs[idx].getAttribute('data-src');
      if (lgImg && lgImg.src !== src) lgImg.src = src;
      thumbs.forEach(t => {
        t.classList.remove('active');
        t.removeAttribute('aria-current');
      });
      thumbs[idx].classList.add('active');
      thumbs[idx].setAttribute('aria-current', 'true');
      try { thumbs[idx].scrollIntoView({behavior:'smooth', inline:'center'}); } catch (e) {}
    }

    thumbs.forEach((t, i) => {
      t.setAttribute('role', 'button');
      t.tabIndex = 0;
      t.addEventListener('click', () => setActive(i));
      t.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i); } });
    });

    if (prev) {
      prev.style.cursor = 'pointer';
      prev.addEventListener('click', (e) => { e.preventDefault(); setActive(idx - 1); });
    }
    if (next) {
      next.style.cursor = 'pointer';
      next.addEventListener('click', (e) => { e.preventDefault(); setActive(idx + 1); });
    }

    // open lightbox on main image click
    if (lgImg) {
      lgImg.style.cursor = 'pointer';
      lgImg.addEventListener('click', () => {
        const lb = document.getElementById('lightbox');
        if (lb) { lb.querySelector('img').src = lgImg.src; lb.classList.add('show'); }
      });
    }

  // init
  setActive(0);

  // mark initialized
  large.dataset.galleryInit = 'true';

  // debug
  try { console.debug('gallery initialized', {large, thumbsCount: thumbs.length}); } catch (e) {}

    // Autoplay + controls (use the container as interactive area)
    let autoplayInterval = null;
    function startAutoplay() { if (!autoplayInterval && thumbs.length > 1) autoplayInterval = setInterval(() => setActive(idx + 1), 4000); }
    function stopAutoplay() { if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; } }
    startAutoplay();

    const area = container === document ? large : container;
    area.addEventListener('mouseenter', stopAutoplay);
    area.addEventListener('mouseleave', startAutoplay);
    area.addEventListener('focusin', stopAutoplay);
    area.addEventListener('focusout', startAutoplay);

    // keyboard navigation
    area.tabIndex = 0;
    area.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') setActive(idx - 1);
      if (e.key === 'ArrowRight') setActive(idx + 1);
    });

    // touch swipe
    let touchStartX = 0;
    area.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, {passive:true});
    area.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) { if (diff > 0) setActive(idx + 1); else setActive(idx - 1); }
    }, {passive:true});
  });
})();


