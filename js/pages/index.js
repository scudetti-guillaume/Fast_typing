// import { baseUrl, apiUrl } from '../config.js'
const btnLogin = document.getElementById("btn-login");
const usernameInput = document.getElementById("pseudo-input");
const passwordInput = document.getElementById("password-input");

usernameInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    btnLogin.click();
  }
});

passwordInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    btnLogin.click();
  }
});

btnLogin.addEventListener("click", () => {
  axios
    .post(`${apiUrl}/api/auth/login`, {
      username: usernameInput.value,
      password: passwordInput.value,
    })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem("login-data", JSON.stringify(response.data));
        Toastify({
          text: `Bienvenue ${usernameInput.value}, Redirection en cours...`,
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
      // console.log(error);
      Toastify({
        text: "Mauvais identifiants, ou compte inexistant",
        duration: 3000,
        className: "error-toast",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () {}, // Callback after click
      }).showToast();
    });
});
