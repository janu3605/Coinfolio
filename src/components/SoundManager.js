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
sounds.swoosh.volume = 0.4;
sounds.coinFlip.volume = 0.5;
sounds.countUp.volume = 0.1;
sounds.countUp.loop = true;

/**
 * Plays a sound. If the sound is already playing, it's rewound and played again.
 * @param {Audio} sound - The Audio object to play.
 */
const playSound = (sound) => {
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(error => {
      // Ignore errors that happen when the user hasn't interacted with the page yet
      if (error.name !== 'NotAllowedError') {
        console.error(`Error playing sound: ${error}`);
      }
    });
  }
};

/**
 * Stops a sound and rewinds it to the beginning.
 * @param {Audio} sound - The Audio object to stop.
 */
const stopSound = (sound) => {
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
};

// Export a manager object with methods to play each sound
export const SoundManager = {
  playSwoosh: () => playSound(sounds.swoosh),
  playCoinFlip: () => playSound(sounds.coinFlip),
  playCountUp: () => playSound(sounds.countUp),
  stopCountUp: () => stopSound(sounds.countUp),
};
