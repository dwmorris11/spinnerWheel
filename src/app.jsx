import React from 'react';
import Wheel from './wheel';

class App extends React.Component {
  constructor(){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Wheel names={['test1', 'test2', 'test3', 'test4']}></Wheel>
    )
  }
}

export default App;