class ControlPanel {
  private _parent: HTMLElement;
  private _controlPanel: HTMLElement;
  private _valueInputs: HTMLInputElement[];
  private _stepInput: HTMLInputElement;
  private _orientationRadios: HTMLInputElement[];
  private _rangeRadios: HTMLInputElement[];
  private _hasRange: boolean;
  private _isVertical: boolean;

  constructor(parent: HTMLElement, hasRange: boolean, isVertical: boolean) {
    this._parent = parent;
    this._controlPanel = document.createElement('div');
    this._controlPanel.classList.add('controlPanel');
    this._parent.after(this._controlPanel);
    this._valueInputs = [];
    this._stepInput = document.createElement('input');
    this._orientationRadios = [];
    this._rangeRadios = [];
    this._hasRange = hasRange;
    this._isVertical = isVertical;
    this.createValueInputs();
    this.createStepInput();
    this.createOrientationRadios();
    this.createRangeRadios();
  }
  createValueInputs() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Значение бегунков';
    const inputSingle = document.createElement('input');
    inputSingle.classList.add('handlerValue');
    this._controlPanel.append(inputSingle);
    this._valueInputs.push(inputSingle);
    if (this._hasRange) {
      const inputMin = document.querySelector('.handlerValue');
      if (inputMin) inputMin.classList.add('value_min');
      const inputMax = document.createElement('input');
      inputMax.classList.add('handlerValue', 'value_max');
      this._controlPanel.append(inputMax);
      this._valueInputs.push(inputMax);
    }
  }
  get valueInputs() {
    return this._valueInputs;
  }

  createStepInput() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Значение шага';
    this._stepInput.classList.add('stepValue');
    this._controlPanel.append(this._stepInput);
  }

  get stepInput() {
    return this._stepInput;
  }

  createOrientationRadios() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Вертикальный/горизонтальный';
    const radioVertical = document.createElement('input');
    radioVertical.id = 'radio_vertical';
    const radioHorizontal = document.createElement('input');
    radioHorizontal.id = 'radio_horizontal';
    this._orientationRadios = [radioVertical, radioHorizontal];
    this._orientationRadios.forEach(radio => {
      radio.type = 'radio';
      radio.name = 'orientation';
      this._controlPanel.append(radio);
    });
  }

  get orientationRadios() {
    return this._orientationRadios;
  }

  createRangeRadios() {
    const title = document.createElement('p');
    this._controlPanel.append(title);
    title.innerText = 'Одиночное/интервал';
    const radioSingle = document.createElement('input');
    radioSingle.id = 'radio_single';
    const radioDouble = document.createElement('input');
    radioDouble.id = 'radio_double';
    this._rangeRadios = [radioSingle, radioDouble];
    this._rangeRadios.forEach(radio => {
      radio.type = 'radio';
      radio.name = 'range';
      this._controlPanel.append(radio);
    });
  }

  get rangeRadios() {
    return this._rangeRadios;
  }
}

export { ControlPanel };