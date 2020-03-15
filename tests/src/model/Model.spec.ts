import { Model } from '../../../src/model/Model';

let model = new Model({});

describe('test model', function() {
  beforeEach(function() {
    const options = {
      chartOptions: ['хорошо', 'плохо'],
      amountAbs: [5, 10],
    };
    model = new Model(options);
  });

  it('should return chartOptions', function() {
    expect(model.options.chartOptions).toEqual(['хорошо', 'плохо']);
  });
  it('should set new options', function() {
    model.options = {};
    expect(model.options).toEqual({});
  });
  it('should count percents', function() {
    expect(model.options.amountPrc).toEqual(['33%', '67%']);
  });
  it('should return percents', function() {
    model.options = {};
    expect(model.options).toEqual({});
    model.options.amountPrc = ['20%', '30%', '50%'];
    expect(model.options.amountPrc).toEqual(['20%', '30%', '50%']);
  });
});
