import * as d3 from 'd3';
import _ from 'lodash';
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
    // Create the container SVG element
    const svg = super.render();
    this.keyX = this.config.axis.x.mapTo;
    this.keyY = this.config.axis.y.mapTo;

    // Parse input data
    data.forEach((d) => {
      if (this.config.axis.x.scaleType === 'scaleTime') {
        _.set(d, this.keyX, d3.timeParse('%d-%b-%y')(_.get(d, this.keyX)));
      }
      _.set(d, this.keyY, +_.get(d, this.keyY));
    });

    // Create the scale for the X axis
    const x = d3[this.config.axis.x.scaleType]();

    if (this.config.axis.x.scaleType === 'scaleTime') {
      x.range([0, this.config.width]);
      x.domain(d3.extent(data, d => _.get(d, this.keyX)));
    } else {
      x.range([this.config.width, 0]);
      x.domain(data.map(d => _.get(d, this.keyX)));
      x.padding(1);
    }

    // Create the scale for the Y axis
    const y = d3[this.config.axis.y.scaleType]()
      .range([this.config.height, 0])
      .domain([0, d3.max(data, d => _.get(d, this.keyY))]);

    // Create the line graph
    const line = d3[this.config.graph.type]()
      .x(d => x(_.get(d, this.keyX)))
      .y(d => y(_.get(d, this.keyY)));

    // If specified, create the area graph
    const area = d3.area()
      .curve(d3.curveCardinal)
      .x(d => x(_.get(d, this.keyX)))
      .y0(this.config.height)
      .y1(d => y(_.get(d, this.keyY)));

    // If specified, use curve instead of straight line
    if (this.config.graph.options.curved) {
      line.curve(d3[this.config.graph.options.curveType]);
    }

    // Create the x Axis
    const xAxis = d3.axisBottom(x);

    if (this.config.axis.x.scaleType === 'scaleTime') {
      xAxis.ticks(this.config.axis.x.ticks);
    } else {
      xAxis.tickValues(
        x.domain().filter((d, i) => !(i % this.config.axis.x.ticks))
      );
    }

    // If specified, add gridlines along the X axis
    if (this.config.gridlines.x) {
      const gridlinesX = d3.axisBottom(x)
        .tickFormat(this.config.axis.x.ticksFormat)
        .tickSize(-this.config.height);

      if (this.config.axis.x.scaleType === 'scaleTime') {
        gridlinesX.ticks(this.config.axis.x.ticks);
      } else {
        gridlinesX.tickValues(x.domain().filter((d, i) => !(i % this.config.axis.x.ticks)));
      }

      svg.append('g')
        .attr('transform', `translate(0, ${this.config.height})`)
        .call(gridlinesX)
        .attr('class', 'grid');
    }

    // If specified, add legend to the X Axis
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
      .attr('class', 'x axis');

    // If specified, hide the X axis path
    if (!this.config.axis.x.visible) {
      svg.selectAll('.x.axis path')
        .attr('style', 'display: none;');
      svg.selectAll('.x.axis line')
        .attr('style', 'display: none;');
    }

    // Create the Y Axis
    const yAxis = d3.axisLeft(y)
      .ticks(this.config.axis.y.ticks)
      .tickSizeOuter(0);

    // If specified, add gridlines along the Y axis
    if (this.config.gridlines.y) {
      const gridlinesY = d3.axisLeft(y)
        .ticks(this.config.axis.y.ticks)
        .tickFormat(this.config.axis.y.ticksFormat)
        .tickSize(-this.config.width);

      svg.append('g')
          .call(gridlinesY)
          .attr('class', 'grid');
    }

    // If specified, add legend to the Y Axis
    if (this.config.legend.y.length > 0) {
      svg.append('text')
        .attr('transform',
          `translate(${-this.config.margin.right - 28}, ${(this.config.height / 2) - this.config.margin.top})rotate(-90)`)
        .attr('text-anchor', 'middle')
        .attr('dy', '.70em')
        .text(this.config.legend.y);
    }

    // Add the Y Axis to the SVG element
    svg.append('g')
      .call(yAxis)
      .attr('class', 'y axis');

    // If specified, hide the Y axis path
    if (!this.config.axis.y.visible) {
      svg.selectAll('.y.axis path')
        .attr('style', 'display: none;');
      svg.selectAll('.y.axis line')
        .attr('style', 'display: none;');
    }

    // Add the line to the SVG element
    svg.append('path')
      .attr('class', 'line')
      .attr('d', line(data));

    // If specified, add colored aera under the line
    if (this.config.graph.options.fillArea) {
      svg.append('path')
       .attr('class', 'area')
       .attr('fill', this.config.graph.options.fillAreaColor)
       .attr('d', area(data));
    }

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
          { offset: `${this.config.color.thresholds[0].offset}%`,
            color: this.config.color.thresholds[0].value,
            opacity: `${this.config.color.thresholds[0].value}`
          },
          { offset: `${this.config.color.thresholds[1].offset}%`,
            color: this.config.color.thresholds[1].value,
            opacity: `${this.config.color.thresholds[1].value}`
          }
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
    const svg = d3.select('svg').transition();

    // Parse the updated input data
    data.forEach((d) => {
      if (this.config.axis.x.scaleType === 'scaleTime') {
        _.set(d, this.keyX, d3.timeParse('%d-%b-%y')(_.get(d, this.keyX)));
      }
      _.set(d, this.keyY, +_.get(d, this.keyY));
    });

    // Create the scale for the X axis
    const x = d3[this.config.axis.x.scaleType]();

    if (this.config.axis.x.scaleType === 'scaleTime') {
      x.range([0, this.config.width]);
      x.domain(d3.extent(data, d => _.get(d, this.keyX)));
    } else {
      x.range([this.config.width, 0]);
      x.domain(data.map(d => _.get(d, this.keyX)));
      x.padding(1);
    }

    // Create the scale for the Y axis
    const y = d3[this.config.axis.y.scaleType]()
      .range([this.config.height, 0])
      .domain([0, d3.max(data, d => _.get(d, this.keyY))]);

    // Create the line graph
    const line = d3[this.config.graph.type]()
      .x(d => x(_.get(d, this.keyX)))
      .y(d => y(_.get(d, this.keyY)));

    // If specified, create the area graph
    const area = d3.area()
      .curve(d3.curveCardinal)
      .x(d => x(_.get(d, this.keyX)))
      .y0(this.config.height)
      .y1(d => y(_.get(d, this.keyY)));

    // If specified, use curve instead of straight line
    if (this.config.graph.options.curved) {
      line.curve(d3[this.config.graph.options.curveType]);
    }

    // Create the x Axis
    const xAxis = d3.axisBottom(x);

    if (this.config.axis.x.scaleType === 'scaleTime') {
      xAxis.ticks(this.config.axis.x.ticks);
    } else {
      xAxis.tickValues(
        x.domain().filter((d, i) => !(i % this.config.axis.x.ticks))
      );
    }

    const yAxis = d3.axisLeft(y)
      .ticks(this.config.axis.y.ticks)
      .tickSizeOuter(0);

    svg.select('.line')
      .duration(750)
      .attr('d', line(data));

    svg.select('.area')
      .duration(750)
      .attr('d', area(data));

    svg.select('.x.axis')
       .duration(750)
       .call(xAxis);

    // If specified, hide the X axis path
    if (!this.config.axis.x.visible) {
      svg.selectAll('.x.axis path')
        .attr('style', 'display: none;');
      svg.selectAll('.x.axis line')
        .attr('style', 'display: none;');
    }

    svg.select('.y.axis')
       .duration(750)
       .call(yAxis);

    // If specified, hide the Y axis path
    if (!this.config.axis.y.visible) {
      svg.selectAll('.y.axis path')
        .attr('style', 'display: none;');
      svg.selectAll('.y.axis line')
        .attr('style', 'display: none;');
    }

    return svg;
  }
}
