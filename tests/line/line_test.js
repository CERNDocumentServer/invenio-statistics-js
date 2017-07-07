/* eslint-disable */

import Graph from '../../src/graph/graph';
import LineGraph from '../../src/line/line';
import config from '../../examples/config';

describe('D3 line testing', () => {

  function getLine() {
    return d3.select('path.domain')['_groups'][0][0];
  };

  function getAxis() {
    return d3.select('.x.axis')['_groups'][0][0] && d3.select('.y.axis')['_groups'][0][0];
  }

  beforeEach(function() {
    const myData = [{ date: '1-May-12', value: 58.13 }, { date: '30-Apr-12', value: 53.98 }, { date: '27-Apr-12', value: 67 }, { date: '26-Apr-12', value: 89.7 }, { date: '25-Apr-12', value: 99 }, { date: '24-Apr-12', value: 130.28 }, { date: '23-Apr-12', value: 166.7 }, { date: '20-Apr-12', value: 234.98 }, { date: '19-Apr-12', value: 345.44 }, { date: '18-Apr-12', value: 443.34 }, { date: '17-Apr-12', value: 543.7 }, { date: '16-Apr-12', value: 580.13 }, { date: '13-Apr-12', value: 605.23 }, { date: '12-Apr-12', value: 622.77 }, { date: '11-Apr-12', value: 626.2 }, { date: '10-Apr-12', value: 628.44 }, { date: '9-Apr-12', value: 636.23 }, { date: '5-Apr-12', value: 633.68 }, { date: '4-Apr-12', value: 624.31 }, { date: '3-Apr-12', value: 629.32 }, { date: '2-Apr-12', value: 618.63 }, { date: '30-Mar-12', value: 599.55 }, { date: '29-Mar-12', value: 609.86 }, { date: '28-Mar-12', value: 617.62 }, { date: '27-Mar-12', value: 614.48 }, { date: '26-Mar-12', value: 606.98 }];

    const graph = new LineGraph(config);
    graph.render(myData);
  });

  afterEach(function() {
    d3.selectAll('svg').remove();
  });

  it('should have a line path', function() {
    expect(getLine()).not.toBe(null);
  });

  it('should have X and Y axis', function() {
    expect(getAxis()).not.toBe(null);
  });

});
