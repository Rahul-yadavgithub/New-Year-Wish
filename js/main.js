// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const storage = new ExperienceStorage();
  storage.resetVisitStatus();

  // 🔒 Already viewed logic
  if (storage.hasVisited()) {
    document.getElementById('already-viewed').classList.remove('hidden');

    const dateEl = document.getElementById('visit-date');
    const date = storage.getVisitDate();
    dateEl.textContent = date ? date : 'Recently';

    document.getElementById('experience-container').style.display = 'none';
    return;
  }

  // 🎬 Create systems (do NOT start experience yet)
  const audio = new FirecrackerSynthesizer();
  const particles = new ParticleSystem();
  const textAnimator = new TextAnimator();

  const scrollHandler = new ScrollHandler(textAnimator, particles);
  const controller = new ExperienceController(
    storage,
    audio,
    particles,
    textAnimator
  );

  let experienceStarted = false;

  // 👆 SINGLE user gesture controls EVERYTHING
  document.addEventListener(
    'click',
    async () => {
      if (experienceStarted) return;
      experienceStarted = true;

      // Resume audio context safely
      await audio.resumeContext();

      // Start cinematic experience
      controller.startExperience();
    },
    { once: true }
  );

  // 📐 Resize handling
  window.addEventListener('resize', () => particles.resize());
});
