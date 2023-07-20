// import { baseUrl, apiUrl } from '../config.js'
const backIcon = document.querySelector(".back-icon");
const usernameInput = document.getElementById("pseudo-input");
const passwordInput = document.getElementById("password-input");
const btnRegister = document.getElementById("btn-register");

usernameInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    btnRegister.click();
  }
});

passwordInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    btnRegister.click();
  }
});

backIcon.addEventListener("click", () => {
  window.location.href = `${baseUrl}`;
});

btnRegister.addEventListener("click", () => {
  const usernameInput = document.getElementById("pseudo-input");
  const passwordInput = document.getElementById("password-input");
  axios
    .post(`${apiUrl}/api/auth/register`, {
      username: usernameInput.value,
      password: passwordInput.value,
    })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("login-data", JSON.stringify(response.data));
        Toastify({
          text: `Compte ${usernameInput.value} créer avec succès , Redirection en cours...`,
          duration: 2000,
          className: "success-toast",
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          onClick: function () {}, // Callback after click
        }).showToast();
        setTimeout(() => {
          window.location.href =
            `${baseUrl}/loggedMenu.html`;
        }, 1000);
      }
    })
    .catch(function (error) {
      console.log(error);

      if (error.response && error.response.status === 409) {
        Toastify({
          text: "Pseudo déjà utilisé, veuillez réessayer",
          duration: 3000,
          className: "error-toast",
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          onClick: function () {}, // Callback after click
        }).showToast();
      } else {
        Toastify({
          text: "Une erreur est survenue, veuillez réessayer ou contacter un administrateur",
          duration: 3000,
          className: "error-toast",
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          onClick: function () {}, // Callback after click
        }).showToast();
      }
    });
});
