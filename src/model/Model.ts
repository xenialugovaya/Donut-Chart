import { Options } from '../../src/model/Options';

class Model {
  private _options: Options;
  constructor(options: Options) {
    this._options = options;
  }

  get options(): Options {
    this.countPercents();
    return this._options;
  }

  set options(options) {
    this._options = options;
  }

  countPercents(): void {
    if (!this._options.amountPrc && this._options.amountAbs) {
      const total = this._options.amountAbs.reduce((a, b) => a + b);
      const percents = this._options.amountAbs.map(
        a => Math.round((a / total) * 100).toString() + '%',
      );
      this._options.amountPrc = percents;
    }
  }
}

export { Model };
