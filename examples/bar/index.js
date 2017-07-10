import BarChart from '../../src/bar/bar';
import config from './config';
import './styles.scss';

const dataSet0 = [{ user: 'Bob', downloads: 33 }, { user: 'Robin', downloads: 12 }, { user: 'Anne', downloads: 41 }, { user: 'Mark', downloads: 16 }, { user: 'Joe', downloads: 59 }, { user: 'Eve', downloads: 38 }, { user: 'Karen', downloads: 21 }, { user: 'Kirsty', downloads: 25 }, { user: 'Chris', downloads: 30 }, { user: 'Lisa', downloads: 47 }, { user: 'Tom', downloads: 5 }, { user: 'Stacy', downloads: 20 }, { user: 'Charles', downloads: 13 }, { user: 'Mary', downloads: 29 }];
let toggle = true;
const graph = new BarChart(config);
graph.render(dataSet0);

function update() {
  toggle = !toggle;
  if (toggle) {
    const dataSet1 = [{ user: 'Bob', downloads: 33 }, { user: 'Robin', downloads: 12 }, { user: 'Anne', downloads: 41 }, { user: 'Mark', downloads: 16 }, { user: 'Joe', downloads: 59 }, { user: 'Eve', downloads: 38 }, { user: 'Karen', downloads: 21 }, { user: 'Kirsty', downloads: 25 }, { user: 'Chris', downloads: 30 }, { user: 'Lisa', downloads: 47 }, { user: 'Tom', downloads: 5 }, { user: 'Stacy', downloads: 20 }, { user: 'Charles', downloads: 13 }, { user: 'Mary', downloads: 29 }];
    graph.render(dataSet1);
  } else {
    const dataSet2 = [{ user: 'Bob', downloads: 15 }, { user: 'Robin', downloads: 25 }, { user: 'Anne', downloads: 44 }, { user: 'Mark', downloads: 4 }, { user: 'Joe', downloads: 65 }, { user: 'Eve', downloads: 21 }, { user: 'Karen', downloads: 28 }, { user: 'Kirsty', downloads: 35 }, { user: 'Chris', downloads: 50 }, { user: 'Lisa', downloads: 12 }, { user: 'Tom', downloads: 16 }, { user: 'Stacy', downloads: 15 }, { user: 'Charles', downloads: 5 }, { user: 'Mary', downloads: 75 }];
    graph.render(dataSet2);
  }
}

if (document.getElementById('option')) {
  document.getElementById('option').addEventListener('click', update);
}
