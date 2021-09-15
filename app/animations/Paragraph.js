import GSAP from 'gsap'

import Animations from 'classes/Animations'

import { calculate, split } from 'utils/text'

import each from 'lodash/each'

export default class Paragraph extends Animations {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })

    this.elementLinesSpans = split({
      append: true,
      element: this.element
    })
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
        autoAlpha: 0,
        y: '100%'
      }, {
        autoAlpha: 1,
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