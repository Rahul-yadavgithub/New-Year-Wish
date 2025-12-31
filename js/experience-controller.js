class ExperienceController {
  constructor(storage, audio, particles, textAnimator) {
    this.storage = storage;
    this.audio = audio;
    this.particles = particles;
    this.textAnimator = textAnimator;

    this.timeline = gsap.timeline({ paused: true });
    this.subtleFn = null;

    this.buildTimeline();
  }

  buildTimeline() {
    this.timeline
      .call(() => {
        this.audio.playBurst();
        this.particles.burst();
      }, null, 0.3)

      .call(() => {
        this.textAnimator.animateHappyNewYear();
      }, null, 1.2)

      .call(() => {
        this.textAnimator.animateName();
      }, null, 2.2)

      .call(() => {
        this.startSubtleMotion();
      }, null, 3.0)

      .call(() => {
        this.storage.markAsVisited();
      }, null, "+=5");
  }

  startExperience() {
    this.timeline.play();
  }

  startSubtleMotion() {
    if (this.subtleFn) return;
    this.subtleFn = () => this.particles.subtleMotion();
    gsap.ticker.add(this.subtleFn);
  }

  stopSubtleMotion() {
    if (!this.subtleFn) return;
    gsap.ticker.remove(this.subtleFn);
    this.subtleFn = null;
  }
}
