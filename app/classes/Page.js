export default class Page {
  constructor({
    id,
    element,
    elements
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.id = id
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.selectorChildren.forEach(entry => {
      console.log(entry);
    })

    console.log('Create', this.id, this.element);
  }
}
