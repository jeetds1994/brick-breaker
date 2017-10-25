import React, { Component } from 'react';
import './App.css';

import SayHello from './SayHello'

class App extends Component {
  constructor(){
    super()
    this.state = {
      paddleLeft: 0,
      ballLeft: 100,
      ballTop: 200,
      ballVX: 300,
      ballVY: -300,
      blockPositions: []
    }

    this.collisionChecker = this.collisionChecker.bind(this)
  }

  getBlockPos = () => {
    let blockPositions = []
    let allBlocks = document.querySelectorAll(".block")
    allBlocks.forEach(block => {
      let position = block.getBoundingClientRect()
      let leftPos = position.left
      let rightPos = position.right
      let topPos = position.top
      let bottomPos = position.bottom
      let id = block.id
      blockPositions.push([leftPos, rightPos, topPos, bottomPos, id])
    })
    this.setState({blockPositions})
  }

  collisionChecker = (e) => {
    let ball = document.getElementById("ball").getBoundingClientRect()
    let leftPos = ball.left
    let rightPos = ball.right
    let topPos = ball.top
    let bottomPos = ball.bottom
    this.state.blockPositions.forEach((block, index, arr) => {
      if(block[0] < leftPos && block[1] > rightPos && block[2] < topPos && block[3] > bottomPos){
        document.getElementById(block[4]).remove()
        arr[index] = []
        this.setState({blockPositions: arr, ballVX: this.state.ballVX * -1})
        console.log("COLLISION")
      }
    })

  }

  paddleCollision = () => {
    let paddle = document.getElementById("paddle").getBoundingClientRect()
    let ball = document.getElementById("ball").getBoundingClientRect()
    if(paddle.left < ball.left && paddle.right > ball.right && paddle.bottom > ball.bottom && paddle.top - 20 < ball.top){
      this.setState({ballVY: this.state.ballVY * -1})
    }
  }

  tick = () => {
    this.setState({
         request: requestAnimationFrame(this.tick),
         ballLeft: this.state.ballLeft + (this.state.ballVX * 0.017),
         ballTop: this.state.ballTop + (this.state.ballVY * 0.017)
      });


      //checks for COLLISION
      this.collisionChecker()

      //makes sure ball does not go out of bounds
      let height = document.getElementById("paddle").getBoundingClientRect().y
      let width = document.querySelector("body").getBoundingClientRect().width;
      if(this.state.ballLeft < 0 || this.state.ballLeft > width){
        this.setState({ballVX: this.state.ballVX * -1})
      }
      if(this.state.ballTop < 0){
        this.setState({ballVY: this.state.ballVY * -1})
      }
      // handle paddle COLLISION
      this.paddleCollision()
  }



  componentDidMount(){
    //store the block positions
    this.getBlockPos()

    this.setState({
      request: requestAnimationFrame(this.tick)
    });
    window.addEventListener("load", (e) => {

      window.addEventListener("click", () => {
        this.paddleCollision()
      })

      window.addEventListener("mousemove", (event) => {
        //console.log("x", event.pageX, "y", event.pageY)

        this.setState({
          paddleLeft: event.pageX,
          ball: {
            backgroundColor: 'gray',
            height: "25px",
            width: "100px",
            position: "absolute",
          }
        })
      })
    })
  }


  render() {
    const paddleStyle = {
      backgroundColor: 'black',
      height: "25px",
      width: "100px",
      position: "absolute",
      left: this.state.paddleLeft,
      bottom: 0
    }

    const ballStyle = {
      backgroundColor: 'gray',
      height: "25px",
      width: "25px",
      position: "absolute",
      top: this.state.ballTop,
      left: this.state.ballLeft
    }

    return (
      <div className="App">
        <div style={paddleStyle} id="paddle" ></div>
        <div style={ballStyle} id="ball"></div>

        <SayHello />

      </div>
    );
  }
}

export default App;
