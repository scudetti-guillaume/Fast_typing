// import { baseUrl, apiUrl } from '../config.js'
let loopFire2 = 0;
const keysImages = {};
const letterToTypeBoss = document.querySelector("#letter-to-type-boss");

const loopFire2Values = [
  // ========== part 1 ==========
  //1-1
  46, 54, 62, 70, 72, 74,
  //1-2
  78, 86, 94, 102, 104, 106,
  //1-3
  110, 118, 126, 134, 136, 138,
  //1-4
  142, 150, 158, 166, 168, 170,
  // ========== part 2 ==========
  //2-1
  204, 208, 212, 216, 220, 222, 224, 226, 228,
  //2-2
  236, 240, 244, 248, 252, 254, 256, 258, 260,
  //2-3
  268, 272, 276, 280, 284, 286, 288, 290, 292,
  //2-4
  300, 304, 308, 312, 316, 318, 320, 322, 324,
  // ========== part 3 ==========
  396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
  411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425,
  426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440,
  441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455,
  456, 457, 458, 459,
];

// Charger les images et stocker les promesses
const loadKeysImages = () => {
  const keyImagePromise = new Promise((resolve, reject) => {
    keysImages["key-img"] = new Image();
    keysImages["key-img"].onload = resolve;
    keysImages["key-img"].src =
      `${baseUrl}/assets/icons/keyboard-key-up.png`;
    keysImages["key-img"].onerror = reject;
  });
  return Promise.all([keyImagePromise]);
};
loadKeysImages();

const spawnImageKeys = () => {
  // @ts-nocheck
  /* prettier-ignore */

  // @ts-check

  Tone.Transport.scheduleRepeat((now) => {
    loopFire2Values.forEach((value) => {
      if (loopFire2 === value) {
        const keyImg = document.createElement("img");
        keyImg.src = keysImages["key-img"].src;
        keyImg.classList.add("arrow-key");
        letterToTypeBoss.appendChild(keyImg);
      }
    });
    loopFire2++;
  }, "8n");
};
