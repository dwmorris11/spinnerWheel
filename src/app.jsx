import React from 'react';
import Wheel from './wheel';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      names: ['test1', 'test2', 'test3', 'test4']
    }
    this.handleSpinClick = this.handleSpinClick.bind(this);
    this.shiftNames = this.shiftNames.bind(this);
  }

  handleSpinClick(e){
    e.preventDefault();
    const maxNames = this.state.names.length;
    const shiftBy = Math.floor((Math.random()*maxNames));
    let rotations = Math.floor((Math.random()*500*maxNames)+1);
    while(rotations >= 0){
      console.log(rotations);
      setTimeout(() => {
        this.shiftNames();
      }, 1000);
      rotations--;
    }
  }

  shiftNames(){
    let newNameOrder = this.state.names;
    let first = newNameOrder.pop();
    newNameOrder.unshift(first);
    this.setState({
      names: newNameOrder
    });
  }

  render() {
    return (
      <>
        <button onClick={this.handleSpinClick}>Spin</button>
        <Wheel names={this.state.names}></Wheel>
        <Axel></Axel>
      </>
    )
  }
}

const Axel = styled.div`
  position: fixed;
  border-radius: 50%;
  background-color: black;
  width: calc(5vh);
  height: calc(5vh);
  top: 50%;
  left: 50%;
  bottom: auto;
  right: auto;
  display: block;
  transform: translate(-50%,-50%);
  z-index: 10104;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.35);
`;


export default App;