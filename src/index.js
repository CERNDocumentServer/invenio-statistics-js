import LineGraph from './line/line';
import './styles.scss';

let myData = [{ date: '1-May-12', value: 58.13 }, { date: '30-Apr-12', value: 53.98 }, { date: '27-Apr-12', value: 67 }, { date: '26-Apr-12', value: 89.7 }, { date: '25-Apr-12', value: 99 }, { date: '24-Apr-12', value: 130.28 }, { date: '23-Apr-12', value: 166.7 }, { date: '20-Apr-12', value: 234.98 }, { date: '19-Apr-12', value: 345.44 }, { date: '18-Apr-12', value: 443.34 }, { date: '17-Apr-12', value: 543.7 }, { date: '16-Apr-12', value: 580.13 }, { date: '13-Apr-12', value: 605.23 }, { date: '12-Apr-12', value: 622.77 }, { date: '11-Apr-12', value: 626.2 }, { date: '10-Apr-12', value: 628.44 }, { date: '9-Apr-12', value: 636.23 }, { date: '5-Apr-12', value: 633.68 }, { date: '4-Apr-12', value: 624.31 }, { date: '3-Apr-12', value: 629.32 }, { date: '2-Apr-12', value: 618.63 }, { date: '30-Mar-12', value: 599.55 }, { date: '29-Mar-12', value: 609.86 }, { date: '28-Mar-12', value: 617.62 }, { date: '27-Mar-12', value: 614.48 }, { date: '26-Mar-12', value: 606.98 }];


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
      scaleType: 'scaleTime',
      label: 'labelX',
      ticks: 5,
      ticksFormat: '',
      visible: true
    },
    y: {
      scaleType: 'scaleLinear',
      label: 'labelY',
      ticks: 5,
      ticksFormat: '',
      visible: true
    }
  },
  data: myData,
  tooltip: false,
  gridlines: {
    x: true,
    y: true
  },
  title: 'Downloads',
  legend: {
    x: 'Date',
    y: 'Downloads'
  },
  duration: 750
};

const graph = new LineGraph(config);
graph.render(myData);

let toggle = true;

function update() {
  toggle = !toggle;
  if (toggle) {
    myData = [{ date: '1-May-12', value: 58.13 }, { date: '30-Apr-12', value: 53.98 }, { date: '27-Apr-12', value: 67 }, { date: '26-Apr-12', value: 89.7 }, { date: '25-Apr-12', value: 99 }, { date: '24-Apr-12', value: 130.28 }, { date: '23-Apr-12', value: 166.7 }, { date: '20-Apr-12', value: 234.98 }, { date: '19-Apr-12', value: 345.44 }, { date: '18-Apr-12', value: 443.34 }, { date: '17-Apr-12', value: 543.7 }, { date: '16-Apr-12', value: 580.13 }, { date: '13-Apr-12', value: 605.23 }, { date: '12-Apr-12', value: 622.77 }, { date: '11-Apr-12', value: 626.2 }, { date: '10-Apr-12', value: 628.44 }, { date: '9-Apr-12', value: 636.23 }, { date: '5-Apr-12', value: 633.68 }, { date: '4-Apr-12', value: 624.31 }, { date: '3-Apr-12', value: 629.32 }, { date: '2-Apr-12', value: 618.63 }, { date: '30-Mar-12', value: 599.55 }, { date: '29-Mar-12', value: 609.86 }, { date: '28-Mar-12', value: 617.62 }, { date: '27-Mar-12', value: 614.48 }, { date: '26-Mar-12', value: 606.98 }];

    graph.update(myData);
  } else {
    const myNewData = [{ date: '10-May-12', value: 99.55 }, { date: '8-May-12', value: 76.86 }, { date: '6-May-12', value: 67.62 }, { date: '4-May-12', value: 64.48 }, { date: '2-May-12', value: 60.98 }, { date: '1-May-12', value: 58.13 }, { date: '30-Apr-12', value: 53.98 }, { date: '27-Apr-12', value: 67 }, { date: '26-Apr-12', value: 89.7 }, { date: '25-Apr-12', value: 99 }, { date: '24-Apr-12', value: 90.28 }, { date: '23-Apr-12', value: 106.7 }, { date: '20-Apr-12', value: 94.98 }, { date: '19-Apr-12', value: 85.44 }, { date: '18-Apr-12', value: 73.34 }, { date: '17-Apr-12', value: 53.7 }, { date: '16-Apr-12', value: 50.13 }, { date: '13-Apr-12', value: 65.23 }, { date: '12-Apr-12', value: 62.77 }, { date: '11-Apr-12', value: 66.2 }, { date: '10-Apr-12', value: 68.44 }, { date: '9-Apr-12', value: 66.23 }, { date: '5-Apr-12', value: 63.68 }, { date: '4-Apr-12', value: 64.31 }, { date: '3-Apr-12', value: 69.32 }, { date: '2-Apr-12', value: 61.63 }];

    graph.update(myNewData);
  }
}

document.getElementById('option').addEventListener('click', update);