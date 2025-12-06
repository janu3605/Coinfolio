// A central place to manage all sound effects for the application.

// Define the paths to your sound files in the public directory
const soundFiles = {
  swoosh: process.env.PUBLIC_URL + '/assets/sfx/swoosh.mp3',
  coinFlip: process.env.PUBLIC_URL + '/assets/sfx/coin-flip.mp3',
  countUp: process.env.PUBLIC_URL + '/assets/sfx/count-up.mp3',
};

// Create and preload Audio objects
const sounds = {
  swoosh: new Audio(soundFiles.swoosh),
  coinFlip: new Audio(soundFiles.coinFlip),
  countUp: new Audio(soundFiles.countUp),
};

// Set volumes and loop properties
sounds.swoosh.volume = 0.4; // Slightly lower volume for swoosh
sounds.coinFlip.volume = 0.6;
sounds.countUp.volume = 0.2; // Lower volume for loop
sounds.countUp.loop = true;

// Preload
Object.values(sounds).forEach(sound => {
  sound.load();
  // Optional: unlock audio context on user interaction if needed by browser policy
});

/**
 * Plays a sound.
 * @param {Audio} sound - The Audio object to play.
 * @param {boolean} forceReset - Whether to force restart the sound from 0.
 */
const playSound = (sound, forceReset = true) => {
  if (!sound) return;

  // If we want to force a reset (like for coin flip), we do it.
  // For looping sounds like countUp, we might skip this if it's already playing.
  if (forceReset) {
    sound.currentTime = 0;
  }

  // Only play if paused or if we forced a reset
  if (sound.paused || forceReset) {
    sound.play().catch(error => {
      if (error.name !== 'NotAllowedError') {
        console.error(`Error playing sound: ${error}`);
      }
    });
  }
};

/**
 * Stops a sound and rewinds it.
 */
const stopSound = (sound) => {
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
};

export const SoundManager = {
  playSwoosh: () => playSound(sounds.swoosh, true),
  playCoinFlip: () => playSound(sounds.coinFlip, true),
  
  // For count up, we only start it if it's not already playing to avoid "double" sound
  playCountUp: () => {
    if (sounds.countUp.paused) {
      playSound(sounds.countUp, false);
    }
  },
  stopCountUp: () => stopSound(sounds.countUp),
};