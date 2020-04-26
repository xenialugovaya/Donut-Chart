class Arc {
  private _parent: SVGElement;
  private _arc: SVGCircleElement;
  private _arcLength: number;

  constructor(parent: SVGElement) {
    this._parent = parent;
    const xmlns = 'http://www.w3.org/2000/svg';
    this._arc = document.createElementNS(xmlns, 'circle');
    this._arc.classList.add('chart__arc');
    this._parent.append(this._arc);
    this._arcLength = 0;
  }

  get elem(): SVGCircleElement {
    return this._arc;
  }
  get arcLength(): number {
    return this._arcLength;
  }

  setCenter(containerWidth: number, containerHeight: number): void {
    this._arc.setAttribute('cx', `${containerWidth / 2}`);
    this._arc.setAttribute('cy', `${containerHeight / 2}`);
  }
  setRadius(containerWidth: number): void {
    this._arc.setAttribute('r', `${containerWidth / 2 - 10}`);
  }

  setCoverage(percent: string, circleLength: number, between: number): void {
    this._arcLength = circleLength * (parseInt(percent) / 100) - between;
    const space = circleLength - this._arcLength + between;
    this._arc.setAttribute('stroke-dasharray', `${this._arcLength} ${space}`);
  }

  setOffset(circleLength: number, prevArcsLength: number): void {
    const initialOffset = circleLength * 0.25;
    const nextOffset = circleLength - prevArcsLength + initialOffset;
    if (prevArcsLength) {
      this._arc.setAttribute('stroke-dashoffset', `${nextOffset}`);
    } else {
      this._arc.setAttribute('stroke-dashoffset', `${initialOffset}`);
    }
  }

  setColor(color: string): void {
    this._arc.setAttribute('stroke', color);
  }

  setGradient(gradient: string[], defs: SVGElement): void {
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    const id = gradient.join('').substr(1);
    linearGradient.id = id;
    this._arc.setAttribute('stroke', `url(#${id})`);
    linearGradient.setAttribute('x1', '60');
    linearGradient.setAttribute('y1', '0');
    linearGradient.setAttribute('x2', '60');
    linearGradient.setAttribute('y2', '120');
    linearGradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    const stopElements = gradient.map(() =>
      document.createElementNS('http://www.w3.org/2000/svg', 'stop'),
    );
    stopElements.forEach((stop, indx) => {
      linearGradient.append(stop);
      stop.setAttribute('stop-color', gradient[indx]);
      if (indx === 1) stop.setAttribute('offset', '1');
    });
    defs.append(linearGradient);
  }
}

export { Arc };
