document.addEventListener("DOMContentLoaded", function() {
  // Валидация формы
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", function(e) {
      form.setAttribute('novalidate', true);
      if (!validateForm(form)) {
        e.preventDefault();
      } else if (form.id === "news-form") {
        alert("Ваша новость была отправлена! Мы ее рассмотрим как можно скорее!");
      }
    });
  });

  function validateForm(form) {
    let valid = true;
    const email = form.querySelector("#email");
    const number = form.querySelector("#number");
    const newsTitle = form.querySelector("#news-title");
    const newsContent = form.querySelector("#news-content");
    const newsLink = form.querySelector("#news-link");

    // Регулярки для известных доменов
    const knownPatterns = {
      'mail.ru': /^[a-zA-Z0-9](?!.*[._-]{2})[a-zA-Z0-9._-]{1,28}[a-zA-Z0-9]@mail\.ru$/,
      'yandex.ru': /^[a-zA-Z0-9](?!.*[.-]{2})[a-zA-Z0-9.-]{1,28}[a-zA-Z0-9]@yandex\.ru$/,
      'gmail.com': /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]{1,28}[a-zA-Z0-9]@gmail\.com$/,
      'vk.com': /^[a-zA-Z0-9]{1,30}@vk\.com$/,
      'microsoft.com': /^[a-zA-Z0-9](?!.*[._-]{2})[a-zA-Z0-9._-]{1,28}[a-zA-Z0-9]@microsoft\.com$/
    };

    // Общая универсальная регулярка для неизвестных доменов
    const generalPattern = /^[a-zA-Z0-9](?!.*[._-]{2})[a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Проверка email
    if (email) {
      const domain = email.value.split('@')[1]; // Извлекаем домен
      if (domain && knownPatterns[domain]) {
        if (!knownPatterns[domain].test(email.value)) {
          alert("Введите правильный email");
          valid = false;
        }
      } else if (!generalPattern.test(email.value)) {
        alert("Введите правильный email");
        valid = false;
      }
    }

    // Проверка номера телефона
    const numberPattern = /^\d+$/;
    if (number) {
      if (!numberPattern.test(number.value)) {
        alert("Введите только числовое значение для телефона");
        valid = false;
      } else if (number.value.length !== 11) {
        alert("Введите корректный номер телефона (11 цифр)");
        valid = false;
      }
    }

    // Проверка заголовка новости
    if (newsTitle && newsTitle.value.trim() === "") {
      alert("Введите заголовок новости");
      valid = false;
    }

    // Проверка содержания новости
    if (newsContent && newsContent.value.trim() === "") {
      alert("Введите содержание новости");
      valid = false;
    }

    // Проверка ссылки на новость
    if (newsLink && newsLink.value.trim() === "") {
      alert("Введите ссылку на новость");
      valid = false;
    }

    return valid;
  }

// Ограничение длины номера телефона
  const numberInput = document.getElementById("number");
  if (numberInput) {
    numberInput.addEventListener("input", function () {
      if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
      }
    });
  }

});
