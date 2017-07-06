import * as d3 from 'd3';
import Graph from '../graph/graph';

/**
 * Class representing a line graph.
 * @extends Graph
 */
export default class LineGraph extends Graph {

  /**
   * Create a line graph based on configuration.
   * @return {object} The SVG element containing the line graph.
   */
  render(data) {
    // Parse input data
    data.forEach((d) => {
      d.date = d3.timeParse('%d-%b-%y')(d.date);
      d.value = +d.value;
    });

    // Create the container SVG element
    const svg = super.render();

    // Create the scale for the X axis
    const x = d3[this.config.axis.x.scaleType]().range([0, this.config.width]);
    x.domain(d3.extent(data, d => d.date));

    // Create the scale for the Y axis
    const y = d3[this.config.axis.y.scaleType]().range([this.config.height, 0]);
    y.domain([0, d3.max(data, d => d.value)]);

    // Create the line graph
    const line = d3[this.config.type]();

    // Use curve instead of straight line
    line.curve(d3.curveCardinal)
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Create the x Axis
    const xAxis = d3.axisBottom(x).ticks(this.config.axis.x.ticks);

    // If defined, add gridlines along the X axis
    if (this.config.gridlines.x) {
      const gridlinesX = d3.axisBottom(x)
        .ticks(this.config.axis.x.ticks)
        .tickFormat(this.config.axis.x.ticksFormat)
        .tickSize(-this.config.height);

      svg.append('g')
        .attr('transform', `translate(0, ${this.config.height})`)
        .call(gridlinesX)
        .attr('class', 'grid');
    }

    // If defined, add legend to the X Axis
    if (this.config.legend.x.length > 0) {
      svg.append('text')
        .attr('transform',
          `translate(${(this.config.width / 2) - this.config.margin.left}, ${this.config.height + this.config.margin.top})`)
        .attr('text-anchor', 'middle')
        .text(this.config.legend.x);
    }

    // Add the X Axis to the SVG element
    svg.append('g')
      .attr('transform', `translate(0, ${this.config.height})`)
      .call(xAxis)
      .attr('class', 'x axis')
      .select('.domain')
        .remove();

    // Create the Y Axis
    const yAxis = d3.axisLeft(y).ticks(this.config.axis.y.ticks);

    // If defined, add gridlines along the Y axis
    if (this.config.gridlines.y) {
      const gridlinesY = d3.axisLeft(y)
        .ticks(this.config.axis.y.ticks)
        .tickFormat(this.config.axis.y.ticksFormat)
        .tickSize(-this.config.width);

      svg.append('g')
          .call(gridlinesY)
          .attr('class', 'grid');
    }

    // If defined, add legend to the Y Axis
    if (this.config.legend.y.length > 0) {
      svg.append('text')
        .attr('transform',
          `translate(${-this.config.margin.right - 22}, ${(this.config.height / 2) - this.config.margin.top})rotate(-90)`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.70em')
        .text(this.config.legend.y);
    }

    // Add the Y Axis to the SVG element
    svg.append('g')
      .call(yAxis)
      .attr('class', 'y axis')
      .select('.domain')
        .remove();

    // Add the line to the SVG element
    svg.append('path')
      .attr('class', 'line')
      .attr('d', line(data));

    // Define the linear gradient coloring of the line
    svg.append('linearGradient')
        .attr('id', 'value-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
      .selectAll('stop')
        .data([
          { offset: '0%', color: '#4CAF50', opacity: '0.9' },
          { offset: '100%', color: '#C8E6C9', opacity: '0.9' }
        ])
        .enter()
          .append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color)
            .attr('stop-opacity', d => d.opacity);
    return svg;
  }

  /**
   * Update the input data given to the line graph.
   * @return {object} The SVG element containing the updated line graph.
   */
  update(data) {
    const x = d3.scaleTime().range([0, this.config.width]);
    const y = d3.scaleLinear().range([this.config.height, 0]);
    const line = d3.line()
      .curve(d3.curveCardinal)
      // .interpolate('basis')
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
       .call(xAxis)
       .select('.domain')
         .remove();

    svg.select('.y.axis')
       .duration(750)
       .call(yAxis)
       .select('.domain')
         .remove();

    return svg;
  }
}
