import About from './pages/About/'
import Collections from './pages/Collections'
import Detail from './pages/Detail'
import Home from './pages/Home'

class App {
  constructor() {
    this.createContent()
    this.createPages()

    this.addLinkListeners()
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    }

    this.page = this.pages[this.template]
    this.page.create();
  }

  async onChange(url) {
    await this.page.hide()

    const response = await window.fetch(url)

    if (response.status === 200) {
      const html = await response.text()

      const div = document.createElement('div')
      div.innerHTML = html

      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template')

      this.content.setAttribute('data-template', divContent.getAttribute('data-template'));
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()
      this.page.show()

    } else {
      console.error('Error - something went wrong')
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    links.forEach(link => {
      link.onclick = e => {
        e.preventDefault();

        const { href } = link

        this.onChange(link)
      }
    })
  }
}

new App()

