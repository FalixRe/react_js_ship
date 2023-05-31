

import React from 'react';
import { createStore } from 'redux'
//import logo from './logo.svg';
//import ship from './images/drawing.svg';
import reducers from './reducers';
import { Provider } from 'react-redux';
import './App.css';

class Point {
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }

  move(pathX, pathY) {
    this.coordX += pathX;
    this.coordY += pathY;
    return this;
  }
}

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }

// // Create a Redux store holding the state of your app.
// // Its API is { subscribe, dispatch, getState }.
// let store = createStore(counterReducer)

export const store = createStore(reducers); //to see how to use


class SeaBackground extends React.Component {

  state = {
    position: new Point(0,0)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        position: this.state.position.move(1,1)
      })
      console.log("pozycja"+this.state.position);
    }, 10);
  }

  render() {
    return(
      <g id="sea" >
        <defs>
          <pattern id="buoysPatterns" viewBox="0,0,500,500" width="500" height="500" patternUnits="userSpaceOnUse">
            <circle
            fill="#ffdf12"
            stroke="black"
            id="paternBuoy"
            cx={250}
            cy={250}
            r="10" 
            />
          </pattern>
        </defs>
        <rect
          fill="#60c4e6"
          id="seaColor"
          width="2000"
          height="2000"
          x="-500"
          y="-500" 
        />
        <rect
          style={{
            fill: "url(#buoysPatterns)"
          }}
          id="buoys"
          width="2000"
          height="2000"
          x={-500}
          y={-500}
          transform={"matrix(1,0,0,1,"+this.state.position.coordX%500+","+this.state.position.coordY%500+")"}
        />
      </g>
    )
    }
}

class Boat extends React.Component {
  render() {
    return(
      <g>
        <rect
        style={{
          fill: "#ffa600",
          stroke: "black"
        }}
        id="s"
        width="40"
        height="80"
        x="500"
        y="500"
        transform={"matrix(1,0,0,1,0,0"}
        />
      </g>
    )
  }
}

function EnginePowerInput() {
  return(
    <input type='number' name="enginePower">

    </input>
  )
}

function Course() {
  return(

    <input type='number'  name="boatCourse">
      
    </input>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Provider store={store}>
        <EnginePowerInput />
        <Course />
        <svg id="shipAplet" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1000 1000">
          <SeaBackground/>
          <Boat/>
        </svg>
        </Provider>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Pfreact
        </a>
      </header>
    </div>
  );
}

export default App;
