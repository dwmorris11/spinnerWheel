import React from 'react';
import Wheel from './wheel';
import styled from 'styled-components';
import regeneratorRuntime from "regenerator-runtime";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      names: ['Abel', 'Aliona', 'Apekshya', 'Bradley', 'Candace', 'Chris P', 'Chris R', 'Cody', 'Collin', 'Debbie', 'Dustin','Edgar', 'Gina', 'Jason', 'Kelson', 'Malik', 'Matthew', 'Mitchell', 'Nick', 'Paul', 'Randall', 'Ty'],
      currentNames: [
        ['Abel', 1], ['Aliona',1], ['Apekshya',1], ['Bradley',1], ['Candace',1], ['Chris P',1], ['Chris R',1], ['Cody',1], ['Collin',1], ['Debbie',1], ['Dustin',1],['Edgar',1], ['Gina',1], ['Jason',1], ['Kelson',1], ['Malik',1], ['Matthew',1],
        ['Mitchell',1],
        ['Nick',1],
        ['Paul',1],
        ['Randall',1], ['Ty',1]],
      test: {},
    }
    this.handleSpinClick = this.handleSpinClick.bind(this);
    this.shiftNames = this.shiftNames.bind(this);
  }

  handleSpinClick(e){
    e.preventDefault();
    let count = 0;
    const maxNames = this.state.names.length;
    const shiftBy = Math.floor((Math.random()*maxNames));
    let rotations = Math.floor((Math.random()*50*maxNames)+1);
    const gen = this.shiftNames(rotations);
    let first;
    for(let i=0 ; i < rotations; i++){
      gen.next();
    }
    first = this.state.currentNames[0];
    if(first[1] !== 1){
      const probability = first[1];
      const spinAgain = Math.floor(Math.random()*20*probability) > 7 ? true : false;
      if(spinAgain){
        for(let i=0; i < rotations; i++){
          gen.next();
        }
      }
    }
    let currentNames = this.state.currentNames;
    currentNames[0][1] *= .5;
  }

  *shiftNames(rotations){
      let newNameOrder = this.state.currentNames;
      let first;
      while(rotations >= 0){
        first = newNameOrder.pop();
        newNameOrder.unshift(first);
        this.setState({
          currentNames: newNameOrder
        });
        rotations--;
      }
    yield first;
  }

  render() {
    return (
      <>
        <button onClick={this.handleSpinClick}>Spin</button>
        <Wheel names={this.state.currentNames}></Wheel>
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