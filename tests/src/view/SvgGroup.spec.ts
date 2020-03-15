import { SvgGroup } from '../../../src/view/SvgGroup';

const chartDiv = document.createElement('div');
chartDiv.classList.add('chart');
document.body.append(chartDiv);

const svgGroup = new SvgGroup(chartDiv);

describe('test svg group view', function() {
  it('should create g group in div with class "chart"', function() {
    expect(svgGroup.gElem).toBeInDOM();
    expect(chartDiv.querySelector('g')).toExist();
  });

  it('g fill should be equal to none', function() {
    const fill = svgGroup.gElem.getAttribute('fill');
    expect(fill).toEqual('none');
  });
  it('g stroke-width should be equal to 4', function() {
    const strokeWidth = svgGroup.gElem.getAttribute('stroke-width');
    expect(strokeWidth).toEqual('4');
  });
});
