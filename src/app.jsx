import React from 'react';
import Wheel from './wheel';
import RandomType from './randomtype';
import styled from 'styled-components';
import regeneratorRuntime from "regenerator-runtime";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      names: ['Abel', 'Aliona', 'Apekshya', 'Bradley', 'Candace', 'Chris P', 'Chris R', 'Cody', 'Collin', 'Debbie', 'Dustin','Edgar', 'Gina', 'Jason', 'Kelson', 'Malik', 'Matthew', 'Mitchell', 'Nick', 'Paul', 'Randall', 'Ty'],
      currentNames: [
        ['Abel', 1, false], ['Aliona',1,false], ['Apekshya',1,false], ['Bradley',1,false], ['Candace',1,false], ['Chris P',1,false], ['Chris R',1,false], ['Cody',1,false], ['Collin',1,false], ['Debbie',1,false], ['Dustin',1,false],['Edgar',1,false], ['Gina',1,false], ['Jason',1,false], ['Kelson',1,false], ['Malik',1,false], ['Matthew',1,false],
        ['Mitchell',1,false],
        ['Nick',1,false],
        ['Paul',1,false],
        ['Randall',1,false], ['Ty',1,false]],
        selectionType: "random"
    }
    this.handleSpinClick = this.handleSpinClick.bind(this);
    this.shiftNames = this.shiftNames.bind(this);
    this.randomSelection = this.randomSelection.bind(this);
    this.probabilitySelection = this.probabilitySelection.bind(this);
    this.noDuplicatesSelection = this.noDuplicatesSelection.bind(this);
    this.randomChange = this.randomChange.bind(this);
  }

  handleSpinClick(e){
    e.preventDefault();
    if(this.state.selectionType === "random"){
      this.randomSelection();
    }else if(this.state.selectionType === "probability"){
      this.probabilitySelection();
    }else if(this.state.selectionType === "noDuplicates"){
      this.noDuplicatesSelection();
    }
    this.updateSelection();
  }

  randomChange(value){
    this.setState({
      selectionType: value
    });
  }

  updateSelection(){
    let currentNames = this.state.currentNames;
    currentNames[0][1] *= .5;
    currentNames[0][2] = true;
    this.setState({
      currentNames: currentNames
    });
  }

  randomSelection(){
    const maxNames = this.state.names.length;
    let rotations = Math.floor((Math.random()*50*maxNames)+1);
    const gen = this.shiftNames(rotations);
    for(let i=0 ; i < rotations; i++){
      gen.next();
    }
    return this.state.currentNames[0];
  }

  probabilitySelection(){
    let first = this.randomSelection();
    if(first[1] !== 1){
      const probability = first[1];
      const spinAgain = Math.floor(Math.random()*20*probability) > 7 ? true : false;
      if(spinAgain){
       this.randomSelection();
      }
    }
  }

  noDuplicatesSelection(count=0){
    if(count > this.state.currentNames.length){
      return;
    }
    let first = this.randomSelection();
    if(first[2]){
      this.noDuplicatesSelection(++count);
    }
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
        <RandomType randomChange={this.randomChange}></RandomType>
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