import * as d3 from 'd3';

/** Class representing an abstract graph. */
export default class Graph {

  /**
   * Create a graph.
   * @param {object} config - The configuration of the graph.
  */
  constructor(config) {
    this.width = config.width;
    this.height = config.height;
    this.margin = config.margin;
    this.type = config.type;
  }

  /**
   * Get the type of the graph.
   * @return {string} The type value.
  */
  getType() {
    return this.type;
  }

  /**
   * Get the type of the graph.
   * @return {number} The area value.
  */
  getArea() {
    return this.height * this.width;
  }

  /**
   * Render respective graph to the DOM.
   * @return {obj} The SVG element.
  */
  render() {
    return d3.select('body')
      .append('svg')
       .attr('width', this.width + this.margin.left + this.margin.right)
       .attr('height', this.height + this.margin.top + this.margin.bottom)
         .append('g')
           .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

}
