import { sliderOptions } from '../model/sliderOptions';
import { Facade } from '../presenter/Facade';
import { ControlPanel } from './ControlPanel/ControlPanel';

class SliderInit {
  private _options: sliderOptions;
  private _slider: HTMLElement;
  private _wraper: HTMLElement;

  constructor(options: sliderOptions) {
    this._options = options;
    this._slider = document.createElement('div');
    this._slider.classList.add('slider');
    this._wraper = document.createElement('div');
    this._wraper.classList.add('slider__wraper');
    document.body.append(this._wraper);
    this._wraper.append(this._slider);
    this.init();
  }
  init() {
    const facade: Facade = new Facade(this._slider, this._options);
    const panel: ControlPanel = new ControlPanel(facade);
    return { facade, panel };
  }
}

export { SliderInit };