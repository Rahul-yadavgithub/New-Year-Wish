// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const storage = new ExperienceStorage();
  storage.resetVisitStatus();

  if (storage.hasVisited()) {
    document.getElementById('already-viewed').classList.remove('hidden');
    const dateEl = document.getElementById('visit-date');
    const date = storage.getVisitDate();
    dateEl.textContent = date ? date : 'Recently';
    document.getElementById('experience-container').style.display = 'none';
    return;
  }

  const audio = new FirecrackerSynthesizer();
  const particles = new ParticleSystem();
  const textAnimator = new TextAnimator();

  // Wait for user gesture to start audio
  document.addEventListener('click', () => audio.resumeContext(), { once: true });

  const scrollHandler = new ScrollHandler(textAnimator, particles);
  const controller = new ExperienceController(storage, audio, particles, textAnimator);

  // Start after short delay
  setTimeout(() => controller.startExperience(), 100);

  // Resize handler
  window.addEventListener('resize', () => particles.resize());
});