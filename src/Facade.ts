import { Model } from './model/Model';
import { Chart } from './view/Chart';
import { Options } from './model/Options';

class Facade {
  private _model: Model;
  private _chart: Chart;
  constructor(parent: HTMLElement, options: Options) {
    this._model = new Model(options);
    this._chart = new Chart(parent, this._model.options);
  }

  get chart(): Chart {
    return this._chart;
  }
}

export { Facade };
