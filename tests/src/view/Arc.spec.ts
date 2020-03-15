import { Arc } from '../../../src/view/Arc';

const chartDiv = document.createElement('div');
chartDiv.classList.add('chart');
document.body.append(chartDiv);
const xmlns = 'http://www.w3.org/2000/svg';
const svgElem = document.createElementNS(xmlns, 'svg');
chartDiv.append(svgElem);
const g = document.createElementNS(xmlns, 'g');
svgElem.append(g);

const arc = new Arc(g);

describe('test arc view', function() {
  beforeEach(function() {
    chartDiv.style.width = '100px';
    chartDiv.style.height = '100px';
  });
  it('should create circle in div class chart', function() {
    expect(arc.elem).toBeInDOM();
  });

  it('arc center should be in div center', function() {
    const arc = new Arc(g);
    arc.setCenter(chartDiv.offsetWidth, chartDiv.offsetHeight);

    const centerX = arc.elem.getAttribute('cx');
    const centerY = arc.elem.getAttribute('cy');
    expect(centerX).toEqual('50');
    expect(centerY).toEqual('50');
  });
  it('arc radius should equal "cx-10"', function() {
    const arc = new Arc(g);
    arc.setRadius(chartDiv.offsetWidth);

    const radius = arc.elem.getAttribute('r');
    expect(radius).toEqual('40');
  });
});
