const reverbShort = new Tone.Reverb({
  decay: 0.1,
}).toDestination();

const reverb = new Tone.Reverb({
  decay: 2,
}).toDestination();

const reverbLong = new Tone.Reverb({
  decay: 4,
}).toDestination();
