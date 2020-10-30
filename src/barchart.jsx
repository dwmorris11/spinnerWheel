import React from 'react';
import graph from './graph';
class BarChart extends React.Component {
  constructor(props){
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount(){
    this.createBarChart();
  }

  componentDidUpdate(){
    this.createBarChart();
  }

  createBarChart(){
    const node = this.node;
    graph(node);
  }

  render(){
    return(
      <svg ref={node => this.node = node} width={500} height={500}></svg>
    );
  }
}

export default BarChart;