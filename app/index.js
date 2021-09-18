import each from 'lodash/each'

// import Detection from 'classes/Detection'
import Canvas from 'components/Canvas'

import Preloader from 'components/Preloader'
import Navigation from 'components/Navigation'

import About from 'pages/about'
import Collections from 'pages/collections'
import Detail from 'pages/detail'
import Home from 'pages/home'

class App {
  constructor () {
    this.createContent()

    this.createPreloader()
    this.createNavigation()
    this.createCanvas()
    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.update()
  }

  /**
   * Events
   */

  createNavigation () {
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  onPreloaded () {
    this.preloader.destroy()
    this.onResize()
    this.page.show()
  }

  createCanvas () {
    this.canvas = new Canvas()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home()
    }
    this.page = this.pages[this.template]
    this.page.create()

    this.onResize()
  }

  async onChange ({ url, push = true }) {
    await this.page.hide()

    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      this.navigation.onChange(this.template)

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()

      this.onResize()

      this.page.show()

      this.addLinkListeners()
    } else {
      console.log('Error')
    }
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  onResize () {
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onResize()
    }

    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  onTouchDown (event) {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(event)
    }
  }

  onTouchMove (event) {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(event)
    }
  }

  onTouchUp (event) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(event)
    }
  }

  /**
   * Listeners
   */
  addEventListeners () {
    // window.addEventListener('popstate', this.onPopState.bind(this))

    // window.addEventListener('mousewheel', this.onWheel.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')
    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link

        this.onChange({ url: href })
      }
    })
  }

  /**
   * Loop
   */
  update () {
    if (this.canvas && this.canvas.update) {
      this.canvas.update()
    }

    if (this.page && this.page.update) {
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }
}

new App()
