import { Options } from '../model/Options';
import { SvgGroup } from './SvgGroup';
import { Arc } from './Arc';
import { List } from './List';

class Chart {
  private _svgGroup: SvgGroup;
  private _arcs: Arc[];
  private _storeArcLength: number[];
  private _text: HTMLElement[];
  private _textGroup: HTMLElement;
  private _options: Options;

  constructor(parent: HTMLElement, options: Options) {
    this._options = options;
    this._svgGroup = new SvgGroup(parent);
    this._arcs = [];
    this._storeArcLength = [];
    this._text = [];
    this._textGroup = document.createElement('div');
    this.setArcsParameters(parent, options);
    if (options.chartOptions) {
      const list = new List(options.chartOptions, options.colors, options.gradients);
      parent.after(list.elem);
    }
    this._arcs.forEach((arc, indx) => {
      arc.elem.addEventListener('mouseover', this.showText.bind(this, indx));
    });
    this.setText(this._svgGroup.svgElem);
  }

  setArcsParameters(parent: HTMLElement, options: Options): void {
    if (options.amountPrc) {
      this._arcs = options.amountPrc.map(() => new Arc(this._svgGroup.gElem));
      this.setArcsCoverage(options.amountPrc, this.getCircleLength(parent.offsetWidth));
      this.setArcsRadius(parent.offsetWidth);
      this.setArcsCenter(parent.offsetWidth, parent.offsetHeight);
      this.setArcsOffset(this.getCircleLength(parent.offsetWidth));
    }
    if (options.colors) {
      this.setArcsColor(options.colors);
    }
    if (options.gradients) {
      this.setArcsGradients(options.gradients);
    }
  }

  get arcs(): Arc[] {
    return this._arcs;
  }

  setArcsCenter(containerWidth: number, containerHeight: number): void {
    this._arcs.forEach(arc => arc.setCenter(containerWidth, containerHeight));
  }

  setArcsRadius(containerWidth: number): void {
    this._arcs.forEach(arc => arc.setRadius(containerWidth));
  }

  setArcsCoverage(percents: string[], circleLength: number): void {
    this._arcs.forEach((arc, index) => {
      arc.setCoverage(percents[index], circleLength, index);

      this._storeArcLength.push(arc.arcLength);
    });
  }

  setArcsOffset(circleLength: number): void {
    this._arcs.forEach((arc, indx) => {
      const prevLengthSum = this._storeArcLength.slice(0, indx).reduce(function(a, b) {
        return a + b;
      }, 0);
      arc.setOffset(circleLength, prevLengthSum);
    });
  }

  setArcsColor(colors: string[]): void {
    this._arcs.forEach((arc, index) => arc.setColor(colors[index]));
  }

  setArcsGradients(gradients: string[][]): void {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this._svgGroup.svgElem.append(defs);
    this._arcs.forEach((arc, indx) => arc.setGradient(gradients[indx], defs));
  }

  getCircleLength(containerWidth: number): number {
    const pi = 3.142;
    const r = containerWidth / 2 - 10;
    const circleLength = 2 * pi * r;
    return circleLength;
  }

  setText(parent: SVGElement): void {
    this._textGroup.classList.add('chart-text');
    if (parent.parentElement) {
      parent.parentElement.append(this._textGroup);
      this._textGroup.style.position = 'absolute';
    }
    const textAmount = document.createElement('div');
    textAmount.classList.add('chart-number');
    const textLabel = document.createElement('div');
    textLabel.classList.add('chart-label');
    this._text = [textAmount, textLabel];
    this._text.forEach(text => {
      this._textGroup.append(text);
    });
  }

  showText(indx: number): void {
    if (this._options.amountAbs) {
      this._text[0].innerHTML = this._options.amountAbs[indx].toString();
    }
    this._text[1].innerHTML = 'голосов';
    if (this._options.colors) {
      this._textGroup.style.color = this._options.colors[indx];
    } else if (this._options.gradients) {
      this._textGroup.style.color = this._options.gradients[indx][0];
    }
  }
}

export { Chart };
