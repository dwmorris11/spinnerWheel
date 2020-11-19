import React from "react";
import styled, { keyframes } from 'styled-components';

function Wheel({names}) {
  const l = names.length;
  const colors = ['red', 'yellow', 'green', 'blue'];
  const wheelGradient = generateWheelGradient(l, colors);
  let colorWheelStyle = {
    position: 'fixed',
    height: '75vh',
    width: '75vh',
    background: 'white',
    background: `conic-gradient(${wheelGradient})`,
  };
   return (
     <PopUp>
      <Circle>
      <ColorWheel style={colorWheelStyle}></ColorWheel>
      { names.map((name,i)=>{
        let left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        let top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        let divStyle = {
        left: left,
        top: top,
        };
        if(i === 0){
          divStyle['color'] = 'purple';
        }
        const rotation = (-90 + (360/l) * i).toString() + "deg";
        let rotateStyle = {
          "transform": `rotate(${rotation})`,
        };
      
      
        return (<Icon id={name[0]} style={divStyle} key={name[0]+i}>
          <Name style={rotateStyle}>{name[0]}</Name></Icon>);
      })
      }
      </Circle>
    </PopUp>

   );
}

const generateWheelGradient = (numberOfWedges, colors) => {
  const percentageOfWheel = (100/numberOfWedges).toPrecision(4);
  let result = [colors[0] + ' ' + percentageOfWheel + '%'];
  for(let i = 1; i < numberOfWedges; i++) {
    result.push(
      colors[i%colors.length] + ' ' + percentageOfWheel*(i).toPrecision(4) + '%' + "," +
      colors[i%colors.length] + ' ' + percentageOfWheel*(i+1).toPrecision(4) + '%'                          
    );
  }
  console.log(result.join(","));
  return result.join(",");
};

const ColorWheel = styled.div`
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 30px;
`;

const PopUp = styled.div`
  position: fixed;
  border-radius: 50%;
  background-color: white;
  width: calc(75vh);
  height: calc(75vh);
  top: 50%;
  left: 50%;
  bottom: auto;
  right: auto;
  display: block;
  transform: translate(-50%,-50%);
  z-index: 10000;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.35);
`;
const Circle = styled.div`
  width: 400px;
  height: 400px;
  opacity: 1;
`;
const pulse = keyframes`
  from {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
`;

const Icon = styled.div`
    color: black;
    display: block;
    height: 10px;
    width: 105px;
    line-height: 20px;
    margin-left: -30px;
    margin-top: -30px;
    position: absolute;
    text-align: center;
    z-index: 10005;
  &:hover {
    animation: ${pulse} 1s linear;
    animation-iteration-count: 1;
  }`;

export default Wheel;