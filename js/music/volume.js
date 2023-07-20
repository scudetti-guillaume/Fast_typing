let gain = new Tone.Gain(-1).toDestination();
let bassGain = new Tone.Gain(0).toDestination();
let instru1Gain = new Tone.Gain(-0.2).toDestination();
let instru2Gain = new Tone.Gain(0).toDestination();
let instru3Gain = new Tone.Gain(-0.4).toDestination();
let snareGain = new Tone.Gain(-0.7).toDestination();
let kickGain = new Tone.Gain(-0.3).toDestination();
let goodKeySoundGain = new Tone.Gain(-0.6).toDestination();
let wrongKeySoundGain = new Tone.Gain(-0.6).toDestination();
const volumeMusicRange = document.getElementById("volume-music-range");
let volumeMusicUserSave = localStorage.getItem("volumeMusic");
if (volumeMusicUserSave !== null) {
  if (volumeMusicUserSave === "-12") {
    Tone.Master.mute = true;
    volumeMusicRange.value = volumeMusicUserSave;
  } else {
    Tone.Master.volume.value = volumeMusicUserSave;
    volumeMusicRange.value = volumeMusicUserSave;
  }
} else {
  localStorage.setItem("volumeMusic", 0);
  Tone.Master.volume.value = 0;
  volumeMusicRange.value = 0;
}

volumeMusicRange.addEventListener("input", function () {
  volumeMusicUserSave = localStorage.getItem("volumeMusic");
  //mute tone master volume

  if (volumeMusicUserSave !== null) {
    Tone.Master.volume.value = volumeMusicUserSave;
    localStorage.removeItem("volumeMusic");
    localStorage.setItem("volumeMusic", this.value);
    volumeMusicRange.value = volumeMusicUserSave;
  } else {
    localStorage.setItem("volumeMusic", this.value);
    Tone.Master.volume.value = volumeMusicUserSave;
    volumeMusicRange.value = volumeMusicUserSave;
  }
  if (this.value === "-12") {
    Tone.Master.mute = true;
  }
});
