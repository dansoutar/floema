import Component from 'classes/Component'

export default class Animations extends Component {
  constructor ({ element, elements }) {
    super({
      element,
      elements
    })

    this.createObserver()

    this.animateOut()

    console.log(this)
    console.log(this.create)
  }

  createObserver () {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('animate in')
          this.animateIn()
        } else {
          console.log('animate out')
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.element)

  }

  animateIn () {

  }

  animateOut () {

  }
}
