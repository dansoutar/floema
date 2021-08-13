import GSAP from 'gsap'
import each from 'lodash/each'

export default class Page {
  constructor ({
    element,
    elements,
    id
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements
    }
    this.id = id
  }

  create () {
    if (this.selector instanceof window.HTMLElement) {
      this.element = this.selector
    } else {
      this.element = document.querySelector(this.selector)
    }
    this.elements = {}

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(this.selector)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(this.selector)
        }
      }
    })

    console.log(this.element, this.elements)
  }

  show () {
    return new Promise(resolve => {
      this.animationIn = GSAP.timeline()

      this.animationIn.fromTo(this.element, {
        autoAlpha: 0
      }, {
        autoAlpha: 1
      })

      this.animationIn.call(() => {
        this.addEventListeners()

        resolve()
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  onMousewheel(event) {
    console.log(event)
  }

  addEventListeners () {
    window.addEventListener('mousewheel', this.onMousewheel)
  }

  removeEventListeners () {
    window.addEventListener('mousewheel', this.onMousewheel)
  }
}
