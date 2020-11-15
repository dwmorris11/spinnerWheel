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
    graph(node, this.props.data);
  }

  render(){
    return(
      <svg ref={node => this.node = node} width={550} height={1000}></svg>
    );
  }
}

export default BarChart;