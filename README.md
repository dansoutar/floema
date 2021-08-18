# floema


### Useful links
https://transfonter.org/


### Ajax page transition

```js
async onChange (url) {
  await this.page.hide()

  const request = await window.fetch(url)

  if (request.status === 200) {
    const html = await request.text()
    const div = document.createElement('div')
    div.innerHTML = html

    const divContent = div.querySelector('.content')

    this.template = divContent.getAttribute('data-template')
    this.content.setAttribute('data-template', this.template)
    this.content.innerHTML = divContent.innerHTML

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()

    this.addLinkListeners()
  } else {
    console.log('Error')
  }
}

addLinkListerners () {
  const links = document.querySelectorAll('a')
  each(links, link => {
    link.onclick = event => {
      event.preventDefault()

      const { href } = link

      this.onChange(href)
    }
  })
}
```


### Handling events

We use events lib to handle events through different classes

```js
//Preloader.js
setTimeout(_ => {
    this.emit('completed')
  }, 1000)

//App.js
this.preloader.once('completed', this.onPreloaded)
```
