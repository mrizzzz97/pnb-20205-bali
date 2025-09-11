(()=> {
  const els = document.querySelectorAll('.product-hero,.product-info,.product-gallery');
  if (!els.length) return;
  const obs = new IntersectionObserver(e => e.forEach(x=>{
    if(x.isIntersecting){x.target.classList.add('in-view');obs.unobserve(x.target);}
  }), {threshold:.15});
  els.forEach((el,i)=>{el.style.animationDelay = i*60+"ms"; obs.observe(el);});
})();
