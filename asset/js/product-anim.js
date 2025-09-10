// Adds "in-view" class to product sections when they enter the viewport
(function(){
  const els = document.querySelectorAll('.product-hero, .product-info, .product-gallery');
  if(!els.length) return;

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // optional: unobserve so animation runs once
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach((el, i) => {
    // apply a small data-delay via inline style to stagger if desired
    const delay = (i * 60);
    el.style.animationDelay = `${delay}ms`;
    obs.observe(el);
  });

  })();
