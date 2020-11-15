import React from 'react';
import styled from 'styled-components';
import Wheel from './wheel';
import RandomType from './randomtype';
import BarChart from './barchart';
import { getUser, removeUserSession } from '../utils/common';
import 'regenerator-runtime/runtime';

class Dashboard extends React.Component {
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
      selectionType: "random",
      barChartNames: [
        { 'name': 'Abel', 'value': 0 }, { 'name': 'Aliona', 'value': 0 }, {'name': 'Apekshya', 'value': 0 }, { 'name': 'Bradley', 'value': 0}, {'name': 'Candace', 'value': 0},{'name': 'Chris P', 'value': 0 },
        { 'name': 'Chris R','value': 0}, {'name': 'Cody', 'value': 0}, {'name': 'Collin', 'value': 0},
        { 'name': 'Debbie', 'value': 0 },{'name': 'Dustin','value': 0}, {'name': 'Edgar','value': 0},
        { 'name': 'Gina', 'value':0}, {'name': 'Jason', 'value': 0},{'name': 'Kelson','value':0},
        { 'name': 'Malik','value': 0},{'name': 'Matthew', 'value': 0},{'name': 'Mitchell','value': 0},
        { 'name': 'Nick', 'value': 0},{'name': 'Paul', 'value':0},{'name': 'Randall','value':0},
        { 'name': 'Ty', 'value': 0}]
    }
    this.user = getUser();
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSpinClick = this.handleSpinClick.bind(this);
    this.shiftNames = this.shiftNames.bind(this);
    this.randomSelection = this.randomSelection.bind(this);
    this.probabilitySelection = this.probabilitySelection.bind(this);
    this.noDuplicatesSelection = this.noDuplicatesSelection.bind(this);
    this.randomChange = this.randomChange.bind(this);
    this.findBarChartName = this.findBarChartName.bind(this);
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

  handleLogOut(e){
    removeUserSession();
    this.props.history.push('/login');
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
    const barChartNameIndex = this.findBarChartName(currentNames[0][0]);
    let barChartNames = this.state.barChartNames;
    barChartNames[barChartNameIndex]['value'] += 1;
    this.setState({
      currentNames: currentNames,
      barChartNames: barChartNames
    });
    console.log(this.state.barChartNames);
  }

  findBarChartName(name){
    for(let i = 0; i < this.state.barChartNames.length; i++){
      if(this.state.barChartNames[i]['name'] === name){
        return i;
      }
    }
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
        <input type="button" onClick={this.handleLogOut} value="Logout" />
        <button onClick={this.handleSpinClick}>Spin</button>
        <RandomType randomChange={this.randomChange}></RandomType>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <div>
            <BarChart data={this.state.barChartNames}></BarChart>
          </div>
          <div>
            <Wheel names={this.state.currentNames}></Wheel>
            <Axel></Axel>
          </div>
        </div>
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


export default Dashboard;