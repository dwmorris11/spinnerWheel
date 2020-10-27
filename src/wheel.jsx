import React from "react";
import styled, { keyframes } from 'styled-components';

function Wheel({names}) {
   return (
     <PopUp>
      <Circle>
      names.map((name,i)=>{
        let left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        let top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        let divStyle = {
        left: left,
        top: top,
        }
        <div className='name' id={name} style={divStyle}></div>
      });
      </Circle>
    </PopUp>
   );
}

const PopUp = styled.nav`
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

export defaul Wheel;