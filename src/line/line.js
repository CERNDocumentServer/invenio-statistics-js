import * as d3 from 'd3';
import Graph from '../graph/graph';

/**
 * Class representing a line graph.
 * @extends Graph
 */
export default class LineGraph extends Graph {

  constructor(config) {
    super(config);
    console.log(this.type);
  }

  render(data) {
    const svg = super.render();

    const x = d3.scaleTime().range([0, this.width]);
    const y = d3.scaleLinear().range([this.height, 0]);
    const line = d3.line()
      .curve(d3.curveCardinal)
      .x(d => x(d.date))
      .y(d => y(d.value));

    data.forEach((d) => {
      d.date = d3.timeParse('%d-%b-%y')(d.date);
      d.value = +d.value;
    });

    // Gridlines
    const gridlinesX = d3.axisBottom(x)
      .ticks(5)
      .tickFormat('')
      .tickSize(-this.height);

    const gridlinesY = d3.axisLeft(y)
      .ticks(5)
      .tickFormat('')
      .tickSize(-this.width);

    x.domain(d3.extent(data, d => d.date));
    y.domain([0, d3.max(data, d => d.value)]);

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(gridlinesX)
      .attr('class', 'grid');

    svg.append('g')
      .call(gridlinesY)
      .attr('class', 'grid');

    svg.append('path')
      .attr('class', 'line')
      .attr('d', line(data));

    svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
      .attr('class', 'x axis');
      // .select('.domain')
      // .remove();

    svg.append('g')
      .call(yAxis)
      .attr('class', 'y axis');
      // .select('.domain')
      // .remove();
  }

  update(data) {
    const x = d3.scaleTime().range([0, this.width]);
    const y = d3.scaleLinear().range([this.height, 0]);
    const line = d3.line()
      .curve(d3.curveCardinal)
      .x(d => x(d.date))
      .y(d => y(d.value));

    data.forEach((d) => {
      d.date = d3.timeParse('%d-%b-%y')(d.date);
      d.value = +d.value;
    });

    x.domain(d3.extent(data, d => d.date));
    y.domain([0, d3.max(data, d => d.value)]);

    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(5);
    const svg = d3.select('svg').transition();

    svg.select('.line')
      .duration(750)
      .attr('d', line(data));

    svg.select('.x.axis')
       .duration(750)
       .call(xAxis);
    svg.select('.y.axis')
       .duration(750)
       .call(yAxis);
  }
}
