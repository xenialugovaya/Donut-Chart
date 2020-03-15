import { List } from '../../../src/view/List';

const colors = ['blue', 'red', 'yellow'];
const chartOptions = ['хорошо', 'удовлетворительно', 'плохо'];
const list = new List(chartOptions, colors);

describe('test list view', function() {
  it('should create ul element', function() {
    expect(list.elem).toExist();
  });
  it('should add options to list', function() {
    expect(list.elem.children[0].textContent).toEqual('хорошо');
  });
  it('should set bullet colors', function() {
    document.body.append(list.elem);
    const spanFirst = document.querySelector('span');
    if (spanFirst) expect(spanFirst.style.backgroundColor).toEqual('blue');
  });
});
