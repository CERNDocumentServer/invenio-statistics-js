import './style.scss'
import * as d3 from "d3";

/* test DOM manipulation */
function test_DOM() {
  var el = document.getElementsByTagName('body')[0];
  var para = document.createElement('p');
  para.appendChild(document.createTextNode('This is a test'));
  el.appendChild(para);
  return el;
}

/* test D3.js */
function test_d3() {
  var svg = d3.select('.test')
    .append('svg')
    .attr('width', 100)
    .attr('height', 50)
      .append('circle')
      .attr('cx', 50)
      .attr('cy', 30)
      .attr('r', 10)
      .attr('fill', 'orange')

  return svg;
}

module.exports = {
  test_DOM : test_DOM,
  test_d3 : test_d3
};
