// Навигация на галерею
document.querySelector(".gallery-btn").addEventListener("click", function () {
  window.location.href = "gallery.html";
});

// Эффект рассыпания
function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}

// Обработчик для фото
const photo = document.querySelector(".main-photo");

if (window.innerWidth > 768) {
  // Для десктопа - по hover
  photo.addEventListener("mouseenter", function () {
    this.classList.add("exploding");
    createParticles(this);

    setTimeout(() => {
      this.classList.remove("exploding");
    }, 800);
  });
} else {
  // Для мобильных - по клику
  photo.addEventListener("click", function () {
    this.classList.add("exploding");
    createParticles(this);

    setTimeout(() => {
      this.classList.remove("exploding");
    }, 800);
  });
}
