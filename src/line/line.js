/*
 * This file is part of Invenio.
 * Copyright (C) 2017 CERN.
 *
 * Invenio is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * Invenio is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Invenio; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

import _ from 'lodash';
import * as d3 from 'd3';
import Graph from '../graph/graph';

/**
 * Class representing a Line Graph.
 * @extends Graph
 */
class LineGraph extends Graph {
  /**
   * Create a line graph in the DOM.
   * @param {Array<Object>} - The input data.
   * @param {String} - The class of the SVG element.
   * @return {Object} - The SVG element containing the line graph.
   */
  render(data, classElement) {
    // If does not exist, create a container SVG element
    this.svg = d3.select(`.${classElement}`).empty() ?
      super.initialize(classElement) : d3.select(`.${classElement}`);

    // Get the options for the X, Y axis
    const xAxisOptions = this.config.axis.x.options;
    const yAxisOptions = this.config.axis.y.options;

    // Reference to the current class
    const that = this;

    // Parse input data
    data.forEach((d) => {
      if (this.config.axis.x.scale.type === 'scaleTime') {
        _.set(d, this.keyX, new Date(_.get(d, this.keyX)));
      }
      _.set(d, this.keyY, +_.get(d, this.keyY));
    });

    // Create the scale for the X axis
    const x = d3[this.config.axis.x.scale.type]();

    if (this.config.axis.x.scale.type === 'scaleTime') {
      x.range([0, this.config.width]);
      x.domain(d3.extent(data, d => _.get(d, this.keyX)));
    } else {
      x.range([this.config.width, 0]);
      x.domain(data.map(d => _.get(d, this.keyX)));
      x.padding(1);
    }

    // Create the X Axis
    const xAxis = d3.axisBottom(x)
      .tickSizeOuter(0);

    if (this.config.axis.x.scale.type === 'scaleTime') {
      xAxis.ticks(xAxisOptions.ticks.number);
      xAxis.tickFormat(d3.timeFormat(this.config.axis.x.scale.format));
    } else {
      xAxis.tickValues(
        x.domain().filter((d, i) => !(i % xAxisOptions.ticks.number)));
    }

    // Add the X Axis to the container element
    if (d3.select(`.${classElement}`).select('.x.axis').empty()) {
      this.svg.append('g')
        .attr('transform', `translate(0, ${this.config.height})`)
        .attr('class', 'x axis')
        .call(xAxis);
    } else {
      d3.select(`.${classElement}`).select('.x.axis')
        .transition()
        .duration(500)
        .call(xAxis);
    }

    // If specified, add gridlines along the X axis
    if (xAxisOptions.gridlines) {
      if (d3.select(`.${classElement}`).select('.gridX').empty()) {
        this.svg.append('g')
          .attr('class', 'gridX')
          .attr('transform', `translate(0, ${this.config.height})`)
          .call(this.makeGridlinesX(x));
      } else {
        d3.select(`.${classElement}`).select('.gridX')
          .transition()
          .duration(200)
          .style('stroke-opacity', 1e-6)
          .transition()
          .duration(300)
          .call(this.makeGridlinesX(x))
          .style('stroke-opacity', 0.7);
      }
    }

    // If specified, rotate the tick labels
    if (xAxisOptions.tickLabels.rotated) {
      d3.select(`.${classElement}`).selectAll('g.x.axis g.tick text')
        .style('text-anchor', 'middle')
        .attr('dx', '-.8em')
        .attr('dy', '.85em')
        .attr('transform', 'rotate(-25)');
    }

    // If specified, add label to the X Axis
    if (xAxisOptions.label.visible) {
      if (d3.select(`.${classElement}`).select('.labelX').empty()) {
        this.svg.append('text')
          .attr('class', 'labelX')
          .attr('transform',
            `translate(${(this.config.width / 2)}, ${this.config.height + this.config.margin.bottom})`)
          .attr('text-anchor', 'middle')
          .text(xAxisOptions.label.value);
      } else {
        d3.select(`.${classElement}`).select('.labelX')
          .text(xAxisOptions.label.value);
      }
    }

    // If specified, hide the X axis line
    if (!xAxisOptions.line.visible) {
      d3.select(`.${classElement}`).selectAll('.x.axis path')
        .attr('style', 'display: none;');
    }

    // If specified, hide the X axis ticks
    if (!xAxisOptions.ticks.visible) {
      d3.select(`.${classElement}`).selectAll('.x.axis line')
        .attr('style', 'display: none;');
    }

    // If specified, hide the X axis tick labels
    if (!xAxisOptions.tickLabels.visible) {
      d3.select(`.${classElement}`).selectAll('.x.axis g.tick text')
        .attr('style', 'display: none;');
    }

    // Create the scale for the Y Axis
    const y = d3[this.config.axis.y.scale.type]()
      .range([this.config.height, 0])
      .domain([0, d3.max(data, d => _.get(d, this.keyY))]);

    // Create the Y Axis
    const yAxis = d3.axisLeft(y)
      .ticks(yAxisOptions.ticks.number, 's')
      .tickSizeOuter(0);

    // If specified, add gridlines along the Y axis
    if (yAxisOptions.gridlines) {
      if (d3.select(`.${classElement}`).select('.gridY').empty()) {
        this.svg.append('g')
          .attr('class', 'gridY')
          .call(this.makeGridlinesY(y));
      } else {
        d3.select(`.${classElement}`).select('.gridY')
          .transition()
          .duration(200)
          .style('stroke-opacity', 1e-6)
          .transition()
          .duration(300)
          .call(this.makeGridlinesY(y))
          .style('stroke-opacity', 0.7);
      }
    }

    // If specified, add label to the Y Axis
    if (yAxisOptions.label.visible) {
      if (d3.select(`.${classElement}`).select('.labelY').empty()) {
        this.svg.append('text')
          .attr('class', 'labelY')
          .attr('transform',
            `translate(${-this.config.margin.right - 50},
            ${(this.config.height / 2) - this.config.margin.top})rotate(-90)`)
          .attr('text-anchor', 'middle')
          .attr('dy', '.70em')
          .text(yAxisOptions.label.value);
      } else {
        d3.select(`.${classElement}`).select('.labelY')
          .text(yAxisOptions.label.value);
      }
    }

    // Add the Y Axis to the container element
    if (d3.select(`.${classElement}`).select('.y.axis').empty()) {
      this.svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    } else {
      d3.select(`.${classElement}`).select('.y.axis')
        .transition()
        .duration(550)
        .call(yAxis);
    }

    // If specified, hide the Y axis line
    if (!yAxisOptions.line.visible) {
      d3.select(`.${classElement}`).selectAll('.y.axis path')
        .attr('style', 'display: none;');
    }

    // If specified, hide the Y axis ticks
    if (!yAxisOptions.ticks.visible) {
      d3.select(`.${classElement}`).selectAll('.y.axis line')
        .attr('style', 'display: none;');
    }

    // If specified, hide the Y axis tick labels
    if (!yAxisOptions.tickLabels.visible) {
      d3.select(`.${classElement}`).selectAll('.y.axis g.tick text')
        .attr('style', 'display: none;');
    }

    // Create the line graph
    const line = d3[this.config.graph.type]()
      .x(d => x(_.get(d, this.keyX)))
      .y(d => y(_.get(d, this.keyY)));

    // If specified, use curve instead of straight line
    if (this.config.graph.options.curved) {
      line.curve(d3[this.config.graph.options.curveType]);
    }

    // If specified, add colored aera under the line
    if (this.config.graph.options.fillArea) {
      const area = d3.area()
        .curve(d3[this.config.graph.options.curveType])
        .x(d => x(_.get(d, this.keyX)))
        .y0(this.config.height)
        .y1(d => y(_.get(d, this.keyY)));

      if (d3.select(`.${classElement}`).select('.area').empty()) {
        this.svg.append('path')
          .transition()
          .delay(400)
          .duration(500)
          .attr('class', 'area')
          .attr('fill', this.config.graph.options.fillAreaColor)
          .attr('d', area(data));
      } else {
        d3.select(`.${classElement}`).select('.area')
          .transition()
          .duration(500)
          .attr('d', area(data));
      }
    }

    // Add the line to the SVG element
    if (d3.select(`.${classElement}`).select('.line').empty()) {
      this.svg.append('path')
        .attr('class', 'line')
        .attr('stroke', `url(#${classElement})`)
        .attr('d', line(data));

      const totalLength = d3.select(`.${classElement}`).select('.line')
        .node().getTotalLength();

      // Smoothly draw the line on the SVG element
      d3.select(`.${classElement}`).select('.line')
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .delay(400)
        .duration(1750)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    } else {
      d3.select(`.${classElement}`).select('.line')
        .transition()
        .delay(100)
        .duration(400)
        .attr('d', line(data));
    }

    // If specified, add tooltip
    const tooltip = d3.tip()
      .attr('class', `${classElement} d3-tip`)
      .offset((d) => {
        const offset = [0, 0];
        const out = this.isOut(x(_.get(d, this.keyX)), y(_.get(d, this.keyY)));
        if (out.top) {
          offset[0] = 10;
        } else {
          offset[0] = -10;
        }
        if (out.left) {
          offset[0] = 5;
          offset[1] = 10;
        } else if (out.right) {
          offset[0] = -5;
          offset[1] = -10;
        }
        return offset;
      })
      .direction((d) => {
        let dir = '';
        const out = this.isOut(x(_.get(d, this.keyX)), y(_.get(d, this.keyY)));
        if (out.top) {
          d3.select(`.${classElement}.d3-tip`).attr('class', `${classElement} d3-tip top`);
          dir = 's';
        } else {
          d3.select(`.${classElement}.d3-tip`).attr('class', `${classElement} d3-tip d3-tip bottom`);
          dir = 'n';
        }
        if (out.left) {
          d3.select(`.${classElement}.d3-tip`).attr('class', `${classElement} d3-tip left`);
          dir = 'e';
        } else if (out.right) {
          d3.select(`.${classElement}.d3-tip`).attr('class', `${classElement} d3-tip right`);
          dir = 'w';
        }
        return dir;
      })
      .html(d => `
        <strong>${this.config.axis.x.options.label.value}:</strong>
        ${d3.timeFormat(this.config.axis.x.scale.format)(_.get(d, this.keyX))}</br>
        <strong>${this.config.axis.y.options.label.value}:</strong>
        ${_.get(d, this.keyY)}
      `);

    d3.select(`.${classElement}`)
      .call(tooltip);

    const focus = d3.select(`.${classElement}`).select('g')
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('circle')
      .attr('stroke', this.config.circles.color)
      .attr('fill', this.config.circles.color);

    // If specified, add circles to the line
    const circles = this.svg.selectAll('.dot');
    if (circles.empty()) {
      circles.data(data)
        .enter().append('circle')
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide)
        .transition()
        .delay(500)
        .duration(750)
        .attr('class', 'dot')
        .attr('cx', d => x(_.get(d, this.keyX)))
        .attr('cy', d => y(_.get(d, this.keyY)))
        .attr('r', this.config.circles.radius)
        .attr('fill', this.config.circles.color)
        .attr('opacity', this.config.circles.visible ? 1 : 0);
    } else {
      circles
        .data(data)
        .transition()
        .delay(100)
        .duration(250)
        .style('fill-opacity', 1e-6)
        .remove();

      circles
        .data(data)
        .transition()
        .delay(100)
        .duration(400)
        .attr('cx', d => x(_.get(d, this.keyX)))
        .attr('cy', d => y(_.get(d, this.keyY)))
        .attr('r', this.config.circles.radius);
    }

    // Define the linear gradient coloring of the line
    if (this.svg.select(`#${classElement}`).empty()) {
      this.svg.append('linearGradient')
        .attr('id', `${classElement}`)
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
    }

    // If specified, add title to the graph
    if (this.config.title.visible) {
      const graphTitle = d3.select(`.${classElement}`).select('g').select('.title');
      if (graphTitle.empty()) {
        this.svg.append('text')
          .attr('x', (this.config.width / 2))
          .attr('y', 0 - (this.config.margin.top / 2))
          .attr('class', 'title')
          .attr('text-anchor', 'middle')
          .text(this.config.title.value);
      } else {
        graphTitle.text(this.config.title.value);
      }
    }

    function mousemove() {
      const x0 = x.invert(d3.mouse(this)[0]);
      // Check if mouse is inside the SVG element
      if (d3.mouse(this)[0] <= that.config.width && d3.mouse(this)[1] <= that.config.height) {
        const i = d3.bisector(d => _.get(d, 'time')).left(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const point = x0 - d0.time > d1.time - x0 ? d1 : d0;
        focus.attr('transform', `translate(${x(point.time)}, ${y(point.count)})`);
      }
    }

    this.svg
      .on('mouseover', () => {
        focus.style('display', null);
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
      })
      .on('mousemove', mousemove);

    return this.svg;
  }

  // helper function to calculate position of tooltip
  isOut(valX, valY) {
    const out = {};
    out.top = (valY / this.config.height) < 0.1;
    out.left = (valX / this.config.width) < 0.1;
    out.right = (valX / this.config.width) > 0.9;
    return out;
  }
}

export default LineGraph;
