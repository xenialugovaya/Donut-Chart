import { EventObserver } from '../observer/observer';
import { Handler } from './handler';
import { sliderOptions } from './sliderOptions';

class MainModel {
  public observer: EventObserver;
  private _min = 0;
  private _max = 100;
  private _step = 5;
  private _values = [10, 20];
  private _isVertical = false;
  private _hasRange = true;
  private _hasLabels = false;
  private _handlers: Handler[] = [];
  constructor(sliderOptions: sliderOptions) {
    this.observer = new EventObserver();
    this._min = sliderOptions.min ? sliderOptions.min : 0;
    this._max = sliderOptions.max ? sliderOptions.max : this._max;
    this._step = sliderOptions.step ? sliderOptions.step : this._step;
    this._values = sliderOptions.values ? sliderOptions.values : this._values;
    this._hasRange = sliderOptions.hasRange ? sliderOptions.hasRange : this._hasRange;
    this._isVertical = sliderOptions.isVertical ? sliderOptions.isVertical : this._isVertical;
    this._hasLabels = sliderOptions.hasLabels ? sliderOptions.hasLabels : this._hasLabels;
  }

  notifyPresenter(valueData: sliderOptions) {
    this.observer.broadcast(valueData);
  }

  get min(): number {
    this._min = Math.round(this._min / this._step) * this._step;
    return this._min;
  }

  set min(min: number) {
    this._min = min;
  }

  get max(): number {
    this._max = Math.round(this._max / this._step) * this._step;
    return this._max;
  }

  set max(max: number) {
    this._max = max;
  }

  get step(): number {
    return this._step;
  }

  set step(step: number) {
    this._step = step;
    this.notifyPresenter({
      step: this._step,
      values: this.rangeValue,
    });
  }

  get singleValue(): number {
    return this.calcValues(this._values)[0];
  }

  set singleValue(value: number) {
    this._values[0] = value;
  }

  get rangeValue(): number[] {
    return this.calcValues(this._values);
  }

  set rangeValue(values: number[]) {
    this._values = values;
    this.notifyPresenter({
      values: this.calcValues(this._values),
    });
  }

  get isVertical(): boolean {
    return this._isVertical;
  }

  set isVertical(vertical: boolean) {
    this._isVertical = vertical;
    this.notifyPresenter({
      values: this.rangeValue,
      isVertical: this._isVertical,
    });
  }

  get hasRange(): boolean {
    return this._hasRange;
  }

  set hasRange(range: boolean) {
    this._hasRange = range;
  }

  // get initial coordinates of any element, depending on dimension
  getCoords(elem: HTMLElement): object {
    const box = elem.getBoundingClientRect();
    if (this._isVertical) {
      return {
        x: box.left + pageXOffset,
        y: box.bottom + pageYOffset,
      };
    } else {
      return {
        x: box.left + pageXOffset,
        y: box.top + pageXOffset,
      };
    }
  }

  //check that values of handlers are within min and max
  //check that value 0 is less than value 1 for range
  calcValues(values: number[]): number[] {
    values = values.map(value => Math.round(value / this._step) * this._step);
    if (values[0] > values[1]) [values[0], values[1]] = [values[1], values[0]];
    values = values.map(value =>
      value < this._min ? this._min : value > this._max ? this._max : value,
    );

    return values;
  }
  //create handlers depending on range
  setHandlers(values: number[]): void {
    if (this._hasRange) {
      this._handlers = [new Handler(values[0]), new Handler(values[1])];
    } else {
      this._handlers = [new Handler(values[0])];
    }
  }
}

export { MainModel };
