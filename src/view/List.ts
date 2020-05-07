class List {
  private _ul: HTMLElement;
  private _li: HTMLLIElement[];
  private _bullets: HTMLElement[];

  constructor(chartOptions: string[], colors?: string[], gradients?: string[][]) {
    this._ul = document.createElement('ul');
    this._ul.classList.add('chart__options');
    this._li = chartOptions.map(() => document.createElement('li'));
    this._li.map((li, indx) => {
      li.innerHTML = chartOptions[indx];
      li.classList.add('chart__option');
    });
    this._li.forEach(li => this._ul.append(li));
    this._bullets = chartOptions.map(() => document.createElement('span'));
    this._bullets.map(bul => bul.classList.add('chart__bullet'));
    this.setBulletStyle(colors, gradients);
  }

  get elem(): HTMLElement {
    return this._ul;
  }

  setBulletStyle(colors?: string[], gradients?: string[][]): void {
    this._li.forEach((li, indx) => li.prepend(this._bullets[indx]));
    this._bullets.forEach((bul, indx) => {
      if (colors) bul.style.background = colors[indx];
      if (gradients)
        bul.style.background = `linear-gradient(180deg, ${gradients[indx][0]} 0%, ${gradients[indx][1]} 100%)`;
    });
  }
}

export { List };
