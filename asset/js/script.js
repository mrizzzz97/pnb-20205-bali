// NAVBAR KECIL SAAT SCROLL
window.onscroll = function() {
  let header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

// SMOOTH SCROLL (klik link → geser halus)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.onclick = function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    document.querySelector("header nav").classList.remove("active");
  };
});

// ANIMASI MUNCUL SAAT SCROLL
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// TOGGLE MENU (untuk mobile)
  document.getElementById("menu-toggle").onclick = () => {
  document.querySelector("header nav").classList.toggle("active");
};

// FAQ toggle
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});

// Newsletter form (dummy)
document.querySelector(".newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Terima kasih sudah berlangganan! 🌿");
});
