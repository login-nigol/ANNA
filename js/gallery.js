// Навигация назад
document.querySelector(".back-btn").addEventListener("click", function () {
  window.location.href = "main.html";
});

// Модальное окно
function openModal(src) {
  document.getElementById("modal-img").src = src;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Закрытие по клику вне фото
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Назначение обработчиков на фото
document.querySelectorAll(".photo-frame").forEach((frame) => {
  frame.addEventListener("click", function () {
    const imgSrc = this.querySelector("img").src;
    openModal(imgSrc);
  });
});

// Закрытие по кнопке
document.querySelector(".close").addEventListener("click", closeModal);

// НОВЫЙ КОД ДЛЯ СВАЙПОВ
let currentImageIndex = 0;
let images = [];
let isFullscreen = false;

// Инициализация галереи
function initGallery() {
  images = Array.from(document.querySelectorAll(".gallery-photo"));

  // Добавляем обработчики клика на фото
  images.forEach((img, index) => {
    img.addEventListener("click", () => openFullscreen(index));
  });
}

// Открыть полноэкранный режим
function openFullscreen(index) {
  currentImageIndex = index;
  isFullscreen = true;

  const fullscreenDiv = document.createElement("div");
  fullscreenDiv.className = "fullscreen";
  fullscreenDiv.innerHTML = `
    <img src="${images[currentImageIndex].src}" class="fullscreen-img">
  `;

  document.body.appendChild(fullscreenDiv);

  // Добавляем обработчики свайпов
  addSwipeHandlers(fullscreenDiv);
}

// Закрыть полноэкранный режим
function closeFullscreen() {
  const fullscreen = document.querySelector(".fullscreen");
  if (fullscreen) {
    fullscreen.remove();
    isFullscreen = false;
  }
}

// Свайп-навигация
function addSwipeHandlers(element) {
  let startY = 0;
  let startX = 0;

  element.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
  });

  element.addEventListener("touchend", (e) => {
    if (!isFullscreen) return;

    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const diffY = startY - endY;
    const diffX = startX - endX;

    // Свайп вверх - следующее фото
    if (
      Math.abs(diffY) > 50 &&
      diffY > 0 &&
      Math.abs(diffY) > Math.abs(diffX)
    ) {
      nextImage();
    }
    // Свайп вниз - выход
    else if (
      Math.abs(diffY) > 50 &&
      diffY < 0 &&
      Math.abs(diffY) > Math.abs(diffX)
    ) {
      closeFullscreen();
    }
    // Свайп влево/вправо - навигация
    else if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  });
}

// Следующее фото (циклически)
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateFullscreenImage();
}

// Предыдущее фото (циклически)
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateFullscreenImage();
}

// Обновить фото в полноэкранном режиме
function updateFullscreenImage() {
  const fullscreenImg = document.querySelector(".fullscreen-img");
  if (fullscreenImg) {
    fullscreenImg.src = images[currentImageIndex].src;
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", initGallery);
