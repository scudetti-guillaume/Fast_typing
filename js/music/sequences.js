const playSequence = (now) => {
  Tone.loaded().then(() => {
    playBass(now);
    playInstru1(now);
    playInstru3(now);
    playRythm(now);
  });
};
