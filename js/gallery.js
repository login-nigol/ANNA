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
