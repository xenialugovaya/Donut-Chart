import { Chart } from '../../../src/view/Chart';
import { Options } from '../../../src/model/Options';

const chartDiv = document.createElement('div');
chartDiv.classList.add('chart');
document.body.append(chartDiv);

const options = {
  chartOptions: ['хорошо', 'удовлетворительно', 'плохо'],
  amountPrc: ['30%', '45%', '25%'],
  colors: ['blue', 'red', 'yellow'],
} as Options;

const chart = new Chart(chartDiv, options);

describe('test chart view', function() {
  it('should add svg group to chartDiv', function() {
    expect(chartDiv.querySelector('g')).toExist();
  });
  it('should add arcs to chartDiv', function() {
    expect(chartDiv.querySelector('circle')).toExist();
  });

  it('should create arcs according to percents in array', function() {
    if (options.amountPrc) {
      expect(chart.arcs.length).toEqual(options.amountPrc.length);
    }
  });

  it('should set color for arcs', function() {
    const color = chart.arcs[0].elem.getAttribute('stroke');
    expect(color).toEqual('blue');
  });

  it('should add list of options to dom', function() {
    expect(document.querySelector('ul')).toHaveClass('chart__options');
  });
});
