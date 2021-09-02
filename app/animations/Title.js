import GSAP from 'gsap'

import Animations from 'classes/Animations'

import { calculate, split } from 'utils/text'

export default class Title extends Animations {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })

    split({ element: this.element })
    split({ element: this.element })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn () {
    GSAP.set(this.element, {
      autoAlpha: 1
    })

    GSAP.fromTo(this.elementLines, {
      y: '100%'
    }, {
      delay: 0.5,
      duration: 1.5,
      stagger: 0.2,
      y: '0%'
    })
  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
    this.elementLines = calculate(this.elementLinesSpans)
  }
};
