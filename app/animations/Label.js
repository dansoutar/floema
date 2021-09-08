import GSAP from 'gsap'

import Animations from 'classes/Animations'

import { calculate, split } from 'utils/text'

import each from 'lodash/each'

export default class Label extends Animations {
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
    this.timeLineIn = GSAP.timeline({
      delay: 0.5
    })

    this.timeLineIn.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementLines, (line, index) => {
      this.timeLineIn.fromTo(line, {
        y: '100%'
      }, {
        delay: index * 0.2,
        duration: 1.5,
        ease: 'expo.out',
        y: '0%'
      }, 0)
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
