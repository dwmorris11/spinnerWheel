import React from 'react';

const RandomType = ({randomChange}) => {
  return (
    <div>
      <form onChange={(e)=>(randomChange(e.target.defaultValue))}>
        <input type="radio" id="random" name="random" value="random" />
        <label htmlFor="random">Random</label>
        <input type="radio" id="probability" name="random" value="probability" />
        <label htmlFor="probability">Fairly Random</label>
        <input type="radio" id="noDuplicates" name="random" value="noDuplicates" />
        <label htmlFor="noDuplicates">No Duplicates</label>
      </form>
    </div>
)};

export default RandomType;

