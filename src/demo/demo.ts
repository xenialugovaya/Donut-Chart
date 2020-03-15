import './demo.scss';
import { Facade } from '../Facade';
import { Options } from '../model/Options';

const chartDiv = document.createElement('div');
chartDiv.classList.add('chart');
document.body.append(chartDiv);

const options = {
  chartOptions: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
  amountAbs: [520, 260, 260],
  gradients: [
    ['#FFE39C', '#FFBA9C'],
    ['#6FCF97', '#66D2EA'],
    ['#BC9CFF', '#8BA4F9'],
    ['#919191', '#3D4975'],
    ['#BC9CFF', '#8BA4F9'],
  ],
} as Options;

new Facade(chartDiv, options);
