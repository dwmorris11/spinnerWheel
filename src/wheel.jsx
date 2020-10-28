import React from "react";
import styled, { keyframes } from 'styled-components';

function Wheel({names}) {
  const l = names.length;
   return (
     <PopUp>
      <Circle>
      { names.map((name,i)=>{
        let left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        let top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        let divStyle = {
        left: left,
        top: top,
        }
        if(i === l-1){
          divStyle['color'] = 'red';
        }
        return (<Icon id={name} style={divStyle} key={name+i}>{name}</Icon>);
      })
      }
      </Circle>
    </PopUp>
   );
}

const PopUp = styled.div`
  position: fixed;
  border-radius: 50%;
  background-color: white;
  width: calc(60vh);
  height: calc(60vh);
  top: 50%;
  left: 50%;
  bottom: auto;
  right: auto;
  display: block;
  transform: translate(-50%,-50%);
  z-index: 10104;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.35);
`;
const Circle = styled.div`
  width: 250px;
  height: 250px;
  opacity: 1;
`;
const rotate = keyframes`
  from {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;
const Icon = styled.div`
    color: black;
    display: block;
    height: 35px;
    width: 35px;
    line-height: 20px;
    margin-left: -10px;
    margin-top: -10px;
    position: absolute;
    text-align: center;

  &:hover {
    animation: ${rotate} 1s linear;
    animation-iteration-count: 1;
  }`;

export default Wheel;