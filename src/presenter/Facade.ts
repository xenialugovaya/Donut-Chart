import { MainModel } from '../model/MainModel';
import { Presenter } from './Presenter';
import { sliderOptions } from '../model/sliderOptions';
import { EventObserver } from '../observer/observer';

class Facade {
  private _model: MainModel;
  private _presenter: Presenter;
  public observer: EventObserver;

  constructor(parent: HTMLElement, sliderOptions: sliderOptions) {
    this.observer = new EventObserver();
    this._model = new MainModel(sliderOptions);
    this._presenter = new Presenter(parent, this._model);
    this.updateValues();
  }

  updateValues() {
    this._model.observer.subscribe((valueData: sliderOptions) => {
      this.observer.broadcast(valueData);
    });
  }

  get parent() {
    return this._presenter.parent;
  }

  get minMax(): number[] {
    return [this._model.min, this._model.max];
  }

  set minMax(value: number[]) {
    [this._model.min, this._model.max] = value;
  }

  get rangeValue(): number[] {
    return this._model.rangeValue;
  }

  set rangeValue(value: number[]) {
    this._model.rangeValue = value;
  }

  get step(): number {
    return this._model.step;
  }

  set step(value: number) {
    this._model.step = value;
  }

  get isVertical(): boolean {
    return this._model.isVertical;
  }

  set isVertical(vertical: boolean) {
    this._model.isVertical = vertical;
  }

  get hasRange(): boolean {
    return this._model.hasRange;
  }

  set hasRange(range: boolean) {
    this._model.hasRange = range;
  }
  get hasLabels(): boolean {
    return this._model.hasLabels;
  }

  set hasLabels(label: boolean) {
    this._model.hasLabels = label;
  }
}

export { Facade };
