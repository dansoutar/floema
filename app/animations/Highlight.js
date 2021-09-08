import GSAP from 'gsap'

import Animations from 'classes/Animations'

export default class Highlight extends Animations {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })
  }

  animateIn () {
    this.timeLineIn = GSAP.timeline({
      delay: 0.5
    })

    this.timeLineIn.fromTo(this.element, {
      autoAlpha: 0,
      scale: 1.2
    }, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'expo.out',
      scale: 1
    })
  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }
}
