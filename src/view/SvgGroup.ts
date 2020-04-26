class SvgGroup {
  private _parent: HTMLElement;
  private _svgElem: SVGElement;
  private _g: SVGElement;

  constructor(parent: HTMLElement) {
    this._parent = parent;
    const xmlns = 'http://www.w3.org/2000/svg';
    this._svgElem = document.createElementNS(xmlns, 'svg');
    this._svgElem.classList.add('chart__svg-group');
    this._parent.append(this._svgElem);
    this._g = document.createElementNS(xmlns, 'g');
    this._g.classList.add('chart__circle');
    this._svgElem.append(this._g);
    this.setSVGAttributes();
    this.setGAttributes();
  }

  get svgElem(): SVGElement {
    return this._svgElem;
  }

  setSVGAttributes(): void {
    this._svgElem.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this._svgElem.setAttribute(
      'viewbox',
      `0 0 ${this._parent.offsetWidth} ${this._parent.offsetHeight}`,
    );

    this._svgElem.setAttribute('width', `${this._parent.offsetWidth}`);
    this._svgElem.setAttribute('height', `${this._parent.offsetHeight}`);
  }

  get gElem(): SVGElement {
    return this._g;
  }

  setGAttributes(): void {
    this._g.setAttribute('fill', 'none');
    this._g.setAttribute('stroke-width', '4');
  }
}

export { SvgGroup };
