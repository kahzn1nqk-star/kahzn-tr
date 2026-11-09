/**
 * TAROT MYSTIC - Web Audio Mystical Sound Synthesizer
 * Generates subtle crystalline chimes, card shuffle sounds, and flip effects
 * without external audio dependencies.
 */

class MysticSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) this.playChime(528, 0.25);
    return this.enabled;
  }

  playChime(freq = 528, duration = 0.45, volume = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Ignore audio errors on restricted autoplay
    }
  }

  playCardPick(slotIndex = 1) {
    const notes = [432, 528, 639];
    this.playChime(notes[(slotIndex - 1) % 3] || 528, 0.5, 0.09);
  }

  playCardFlip() {
    this.playChime(741, 0.65, 0.1);
    setTimeout(() => this.playChime(852, 0.55, 0.07), 120);
  }

  playShuffle() {
    if (!this.enabled) return;
    const freqs = [396, 417, 528, 639, 741, 852];
    freqs.forEach((f, idx) => {
      setTimeout(() => {
        this.playChime(f, 0.18, 0.045);
      }, idx * 75);
    });
  }

  playRevealComplete() {
    if (!this.enabled) return;
    [528, 639, 741, 963].forEach((f, idx) => {
      setTimeout(() => this.playChime(f, 0.7, 0.07), idx * 140);
    });
  }
}

window.SoundFX = new MysticSoundEngine();
