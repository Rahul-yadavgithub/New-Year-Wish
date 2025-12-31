// js/experience-controller.js
class ExperienceController {
  constructor(storage, audio, particles, textAnimator) {
    this.storage = storage;
    this.audio = audio;
    this.particles = particles;
    this.textAnimator = textAnimator;

    this.masterTimeline = gsap.timeline({ paused: true });
    this.subtleMotionFn = null;

    this.initTimeline();
  }

  initTimeline() {
    this.masterTimeline
      // Firecracker glow
      .to('.burst-glow', { className: '+=animate', duration: 0 }, 0.3)

      // Firecracker burst (sync-critical)
      .call(() => {
        this.audio.playBurst();
        this.particles.burst();
      }, null, 0.3)

      // Happy New Year reveal
      .to('.text-reveal-container', { opacity: 1, duration: 0.5 }, 0.8)
      .call(() => this.textAnimator.animateHappyNewYear(), null, 1.5)

      // Name reveal
      .call(() => this.textAnimator.animateName(), null, 2.0)

      // Messages section
      .to('.messages-section', { opacity: 1, duration: 0 }, 5.0)

      // Ending fade
      .to('.experience-container', { className: '+=end', duration: 3 }, '+=5')

      // Finalize experience
      .call(() => {
        this.audio.playSoftChime();
        this.audio.fadeOut();
        this.stopSubtleMotion();
        this.storage.markAsVisited();
      }, null, '+=1');
  }

  startExperience() {
    this.masterTimeline.play();
    this.startSubtleMotion();
  }

  startSubtleMotion() {
    if (this.subtleMotionFn) return;

    this.subtleMotionFn = () => this.particles.subtleMotion();
    gsap.ticker.add(this.subtleMotionFn);
  }

  stopSubtleMotion() {
    if (!this.subtleMotionFn) return;

    gsap.ticker.remove(this.subtleMotionFn);
    this.subtleMotionFn = null;
  }
}
