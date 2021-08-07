import Component from "../classes/Component";
import GSAP from 'gsap'

import each from 'lodash/each'

import { split } from 'utils/text'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        images: document.querySelectorAll('img')
      }
    })

    this.elements.titleSpans = split({
      element: this.elements.title
    })

    this.length = 0

    this.createLoader()
  }


  createLoader() {
    each(this.elements.images, element => {
      element.onload = () => this.onAssetLoaded()
      element.src = element.getAttribute('data-src')
    })
  }

  onAssetLoaded() {
    this.length += 1

    const percentLoaded = this.length / this.elements.images.length

    this.elements.number.innerHTML = `${Math.round(percentLoaded * 100)}%`

    if (percentLoaded === 1) {
      this.onLoaded()
    }
  }

  onLoaded() {
    return new Promise(resolve => {
      this.animateOut = GSAP.timeline({
        delay: 2
      })

      this.animateOut.to(this.element, {
        autoAlpha: 0
      })

      this.animateOut.call(() => {
        this.emit('completed')
      })
    })
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}
