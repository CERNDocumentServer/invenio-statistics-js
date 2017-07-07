/* eslint-disable */

import Graph from '../src/graph/graph';
import LineGraph from '../src/line/line';

describe('D3 line testing', () => {

  function getLine() {
    return d3.select('path');
  };

  beforeEach(function() {
    const myData = [{ date: '1-May-12', value: 58.13 }, { date: '30-Apr-12', value: 53.98 }, { date: '27-Apr-12', value: 67 }, { date: '26-Apr-12', value: 89.7 }, { date: '25-Apr-12', value: 99 }, { date: '24-Apr-12', value: 130.28 }, { date: '23-Apr-12', value: 166.7 }, { date: '20-Apr-12', value: 234.98 }, { date: '19-Apr-12', value: 345.44 }, { date: '18-Apr-12', value: 443.34 }, { date: '17-Apr-12', value: 543.7 }, { date: '16-Apr-12', value: 580.13 }, { date: '13-Apr-12', value: 605.23 }, { date: '12-Apr-12', value: 622.77 }, { date: '11-Apr-12', value: 626.2 }, { date: '10-Apr-12', value: 628.44 }, { date: '9-Apr-12', value: 636.23 }, { date: '5-Apr-12', value: 633.68 }, { date: '4-Apr-12', value: 624.31 }, { date: '3-Apr-12', value: 629.32 }, { date: '2-Apr-12', value: 618.63 }, { date: '30-Mar-12', value: 599.55 }, { date: '29-Mar-12', value: 609.86 }, { date: '28-Mar-12', value: 617.62 }, { date: '27-Mar-12', value: 614.48 }, { date: '26-Mar-12', value: 606.98 }];

    const config = {
      width: 800,
      height: 400,
      margin: {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
      },
      graph: {
        type: 'line',
        options: {
          curved: true,
          curveType: 'curveCardinal',
          fillArea: true,
          fillAreaColor: '#E8F5E9'
        }
      },
      axis: {
        x: {
          mapTo: 'date',
          scaleType: 'scaleTime',
          label: 'labelX',
          ticks: 5,
          ticksFormat: '',
          visible: false
        },
        y: {
          mapTo: 'value',
          scaleType: 'scaleLinear',
          label: 'labelY',
          ticks: 5,
          ticksFormat: '',
          visible: false
        }
      },
      data: myData,
      tooltip: false,
      gridlines: {
        x: false,
        y: false
      },
      title: 'Downloads',
      legend: {
        x: 'Date',
        y: 'Downloads'
      },
      color: {
        scale: 'linearGradient',
        thresholds: [
          {
            offset: 0,
            value: '#4CAF50',
            opacity: 0.9
          },
          {
            offset: 100,
            value: '#C8E6C9',
            opacity: 0.9
          }
        ]
      }
    };

    const graph = new LineGraph(config);
    graph.render(myData);
  });

  afterEach(function() {
    d3.selectAll('svg').remove();
  });

  it('should have a line path', function() {
    expect(getLine()).not.toBe(null);
  });

});
