// js/experience-controller.js
class ExperienceController {
  constructor(storage, audio, particles, textAnimator) {
    this.storage = storage;
    this.audio = audio;
    this.particles = particles;
    this.textAnimator = textAnimator;
    this.masterTimeline = gsap.timeline({ paused: true });
    this.initTimeline();
  }

  async initTimeline() {
    await this.audio.resumeContext();

    this.masterTimeline
      .to('.burst-glow', { className: '+=animate', duration: 0 }, 0.3)
      .call(() => {
        this.audio.playBurst();
        this.particles.burst();
      }, null, 0.3)
      .to('.text-reveal-container', { opacity: 1, duration: 0.5 }, 0.8)
      .call(() => this.textAnimator.animateHappyNewYear(), null, 1.5)
      .call(() => this.textAnimator.animateName(), null, 2.0)
      .to('.messages-section', { opacity: 1, duration: 0 }, 5.0)
      .to('.experience-container', { className: '+=end', duration: 3 }, '+=5')
      .call(() => {
        this.audio.playSoftChime();
        this.audio.fadeOut();
      }, null, '-=2')
      .call(() => this.storage.markAsVisited(), null, '+=2');
  }

  startExperience() {
    this.masterTimeline.play();
    // Subtle background motion
    gsap.ticker.add(() => this.particles.subtleMotion());
  }
}