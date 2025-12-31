// js/text-animator.js
class TextAnimator {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  animateHappyNewYear() {
    const chars = document.querySelectorAll('.happy-new-year .char');
    gsap.timeline()
      .to('.happy-new-year', { opacity: 1, duration: 0.5 })
      .to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to('.happy-new-year', {
        className: '+=pulse',
        duration: 0
      });
  }

  animateName() {
    gsap.timeline()
      .to('.dear-manisha', { opacity: 1, y: -20, duration: 1, ease: "power2.out" })
      .to('.dear-manisha', {
        className: '+=dissolve',
        duration: 2,
        delay: 2
      });
  }

  animateMessage(textElement, callback) {
    const text = textElement.dataset.text;
    textElement.innerHTML = '';
    let index = 0;
    const tl = gsap.timeline({ onComplete: callback });

    function typeNext() {
      if (index < text.length) {
        const char = document.createElement('span');
        char.textContent = text[index];
        char.style.opacity = 0;
        char.style.transform = 'translateY(20px)';
        textElement.appendChild(char);
        gsap.to(char, {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
          onComplete: typeNext
        });
        index++;
      }
    }

    typeNext();
  }

  fadeOutPrevious() {
    gsap.to('.message-wrapper.active .message-container', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in"
    });
  }
}