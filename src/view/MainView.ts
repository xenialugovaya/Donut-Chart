import { HandlerView } from './HandlerView';
import { ControlPanel } from './ControlPanelView';
import { EventObserver } from '../observer/observer';
import { sliderOptions } from '../model/sliderOptions';

class MainView {
  public observer: EventObserver;
  private _sliderBody: HTMLElement;
  private _parent: HTMLElement;
  private _selectedRange: HTMLElement;
  private _handlers: HandlerView[];
  private _min: number;
  private _max: number;
  private _values: number[];
  private _controlPanel: ControlPanel;
  private _step: number;
  private _isVertical: boolean;

  constructor(
    parent: HTMLElement,
    hasRange: boolean,
    isVertical: boolean,
    min: number,
    max: number,
    values: number[],
    step: number,
  ) {
    this.observer = new EventObserver();
    this._min = min;
    this._max = max;
    this._values = values;
    this._step = step;
    this._isVertical = isVertical;
    this._sliderBody = document.createElement('div');
    this._sliderBody.classList.add('sliderBody');
    this._parent = parent;
    this._parent.appendChild(this._sliderBody);
    this._handlers = hasRange
      ? [
          new HandlerView(this._sliderBody, isVertical, min, max),
          new HandlerView(this._sliderBody, isVertical, min, max),
        ]
      : [new HandlerView(this._sliderBody, isVertical, min, max)];
    this._selectedRange = document.createElement('div');
    this._sliderBody.appendChild(this._selectedRange);
    this._selectedRange.classList.add('selectedRange');
    if (isVertical) {
      this._parent.classList.add('slider_vertical');
    } else {
      this._parent.classList.add('slider_horizontal');
    }
    if (hasRange) this._selectedRange.classList.add('range_between');
    this._controlPanel = new ControlPanel(this._parent, hasRange, isVertical);
    this._controlPanel.valueInputs.forEach(input =>
      input.addEventListener('input', this.notifyPresenter.bind(this)),
    );
    this._controlPanel.orientationRadios.forEach(radio =>
      radio.addEventListener('change', this.notifyPresenter.bind(this)),
    );
    this.setOrientationToRadio();
  }

  notifyPresenter() {
    const newValues = this._controlPanel.valueInputs.map(input => parseInt(input.value));
    const newOrientation = this._controlPanel.orientationRadios[0].checked == true;

    this.observer.broadcast({
      values: newValues,
      isVertical: newOrientation,
    });
  }

  update(valueData: sliderOptions) {
    this._handlers.forEach((handler, index) => {
      if (valueData.values) handler.setPosition(valueData.values[index]);
    });
    if (valueData.isVertical) this._isVertical = valueData.isVertical;
  }

  setHandlerPosition() {
    this._handlers.forEach((handler, index) => handler.setPosition(this._values[index]));
  }

  setValuesToInputs() {
    this._controlPanel.valueInputs.map(
      (input, index) => (input.value = this._values[index].toString()),
    );
  }

  setStepToInput() {
    this._controlPanel.stepInput.value = this._step.toString();
  }

  setOrientationToRadio() {
    this._controlPanel.orientationRadios.map((radio, index) =>
      this._isVertical
        ? (this._controlPanel.orientationRadios[0].checked = true)
        : (this._controlPanel.orientationRadios[1].checked = true),
    );
  }
}

export { MainView };
