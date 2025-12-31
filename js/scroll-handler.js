// js/scroll-handler.js
class ScrollHandler {
  constructor(textAnimator, particleSystem) {
    this.textAnimator = textAnimator;
    this.particleSystem = particleSystem;
    this.initScrollTriggers();
  }

  initScrollTriggers() {
    const wrappers = document.querySelectorAll('.message-wrapper');
    wrappers.forEach((wrapper, index) => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (!wrapper.classList.contains('active')) {
            wrapper.classList.add('active');
            this.textAnimator.fadeOutPrevious();
            const textEl = wrapper.querySelector('.message-text');
            this.textAnimator.animateMessage(textEl, () => {
              gsap.to(wrapper.querySelector('.message-container'), {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
              });
            });
          }
        },
        onEnterBack: () => {
          wrapper.classList.add('active');
        }
      });
    });

    // Final message
    ScrollTrigger.create({
      trigger: '.final-message-container',
      start: "top center",
      onEnter: () => {
        gsap.to('.final-message', {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        });
      }
    });
  }
}