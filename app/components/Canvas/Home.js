/* eslint-disable no-new */
import { Plane, Transform } from 'ogl'

import map from 'lodash/map'

import Media from './Media'

export default class {
  constructor ({ gl, scene, sizes }) {
    this.group = new Transform()
    this.gl = gl
    this.sizes = sizes

    this.mediaElements = document.querySelectorAll('.home__gallery__media__image')

    this.createGeometry()
    this.createGallery()

    this.group.setParent(scene)
  }

  createGeometry () {
    this.geometry = new Plane(this.gl)
  }

  createGallery () {
    this.medias = map(this.mediaElements, (element, index) => {
      return new Media({
        element,
        index,
        geometry: this.geometry,
        scene: this.group,
        gl: this.gl,
        sizes: this.sizes
      })
    })
  }

  onResize (event) {
    map(this.medias, media => media.onResize(event))
  }
}