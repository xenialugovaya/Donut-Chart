import './assets/scss/main.scss';
import { Facade } from '../src/Facade';

$(() => {
  $.fn.donutChart = function(options): Facade {
    const facade: Facade = new Facade(this.get(0), options);
    return facade;
  };
});
