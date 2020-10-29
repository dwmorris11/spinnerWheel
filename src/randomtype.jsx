import React from 'react';

const RandomType = () => {
  return (
    <div>
      <form>
        <input type="radio" id="male" name="random" value="random" />
        <label htmlFor="random">Random</label>
        <input type="radio" id="female" name="random" value="probability" />
        <label htmlFor="female">Fairly Random</label>
        <input type="radio" id="other" name="random" value="noDuplicates" />
        <label htmlFor="other">No Duplicates</label>
      </form>
    </div>
)};

export default RandomType;

