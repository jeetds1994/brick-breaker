import React, { Component } from 'react';
import './App.css';

import SayHello from './SayHello'
import Score from './Score'
import SettingButton from './SettingButton'
import Menu from './Menu'
import Pause from './Pause'
import Setting from './Setting'
import LostGame from './LostGame'

class App extends Component {
  constructor(){
    super()
    this.state = {
      paddleLeft: 0,
      ballLeft: 100,
      ballTop: 200,
      ballVX: 300,
      ballVY: -300,
      blockPositions: [],
      counter: 0,
      startGame: false,
      pauseGame: false,
      gameDivStyleOpacity: 1.0,
      settings: false,
      grayscale: 'grayscale(0%)',
      lostGame: false
    }
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
      //old way and will eliminate center
      // if(block[0] < leftPos && block[1] > rightPos && block[2] < topPos && block[3] > bottomPos){
      //   debugger
      //   document.getElementById(block[4]).remove()
      //   arr[index] = []
      //   this.setState({blockPositions: arr, ballVX: this.state.ballVX * -1})
      //   console.log("COLLISION")
      //   this.setState({ counter: ++this.state.counter})
      // }

      //works
      // if(block[0] <= rightPos && block[1] + 25 >= leftPos && block[2] <= bottomPos && block[3] >= topPos){
      //       document.getElementById(block[4]).remove()
      //       arr[index] = []
      //       this.setState({blockPositions: arr, ballVX: this.state.ballVX * -1})
      //       console.log("COLLISION")
      //       this.setState({ counter: ++this.state.counter})
      //   }

      if(block[0] <= rightPos && block[1] + 25 >= leftPos && block[2] <= bottomPos && block[3] >= topPos){
          if(block[2] <= bottomPos && block[3] >= topPos){
            this.setState({blockPositions: arr, ballVY: this.state.ballVY * -1})
          }else{
            this.setState({blockPositions: arr, ballVX: this.state.ballVX * -1})
          }
            this.setState({ counter: ++this.state.counter})
            console.log("COLLISION")
            document.getElementById(block[4]).remove()
            arr[index] = []
        }
    })

  }

  paddleCollision = () => {
    let paddle = document.getElementById("paddle").getBoundingClientRect()
    let ball = document.getElementById("ball").getBoundingClientRect()
    //old way
    // if(paddle.left < ball.left && paddle.right > ball.right && paddle.bottom > ball.bottom && paddle.top - 20 < ball.top){
    //   this.setState({ballVY: this.state.ballVY * -1})
    // }
    if(paddle.left <= ball.right && paddle.right + 5 >= ball.left && paddle.top <= ball.bottom && paddle.bottom >= ball.top){
      this.setState({ballVY: this.state.ballVY * -1})
    }
  }

  tick = () => {
    this.setState({
         request: requestAnimationFrame(this.tick),
         ballLeft: this.state.ballLeft + (this.state.ballVX * 0.017),
         ballTop: this.state.ballTop + (this.state.ballVY * 0.017)
      });
      //check if game is paused
      if(this.state.pauseGame){cancelAnimationFrame(this.state.request)}

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

      if(this.state.ballTop > height){
        console.log("LOST")
        this.lostGame()
      }

      // handle paddle COLLISION
      this.paddleCollision()

      //check if game finished
      this.didGameFinish()
  }

  didGameFinish = () => {
    if(document.querySelectorAll(".block").length === 0){
      this.lostGame()
    }
  }

  startGame = () => {
    //store the block positions
    this.getBlockPos()

    //loop
    this.setState({
      request: requestAnimationFrame(this.tick)
    });

    // moves paddle
      window.addEventListener("mousemove", (event) => {
        //console.log("x", event.pageX, "y", event.pageY)
        console.log(event.pageX)
        console.log(event.pageY)
        this.setState({paddleLeft: event.pageX})
      })
  }

  lostGame = () => {
    cancelAnimationFrame(this.state.request)
    let opacity = this.state.pauseGame ? 1.0 : 0.1
    this.setState({
        gameDivStyleOpacity: opacity,
        lostGame: true
    })
  }

  restartGame = () => {
    this.setState({
      paddleLeft: 0,
      ballLeft: 100,
      ballTop: 200,
      ballVX: 300,
      ballVY: -300,
      blockPositions: [],
      counter: 0,
      startGame: false,
      pauseGame: false,
      gameDivStyleOpacity: 1.0,
      settings: false,
      grayscale: 'grayscale(0%)',
      lostGame: false
    })
  }

  componentDidMount(){
    window.addEventListener("load", (e) => {

      window.addEventListener("keydown", (event) => {
        if(event.key === "s" || event.key === "S" && this.state.startGame === false){
          //set state and startGame
          this.triggerStartGame()
        }else if (event.key === "p" && this.state.startGame === true) {
          // set state and pauseGame
          this.triggerPauseGame()
        }
      })
    })
  }

  triggerStartGame = () => {
    this.setState({startGame: true}, this.startGame)
  }

  triggerPauseGame = () => {
    let opacity = this.state.pauseGame ? 1.0 : 0.1
    this.setState({
      pauseGame: !this.state.pauseGame,
      gameDivStyleOpacity: opacity,
      settings: false
    }, this.startGame)
  }

  triggerSettings = () => {
    let opacity = this.state.pauseGame ? 1.0 : 0.1
    this.setState({
      settings: !this.state.settings,
      pauseGame: !this.state.pauseGame,
      gameDivStyleOpacity: opacity
    }, this.startGame)
  }

  triggerGrayScale = () => {
    let grayscale = this.state.grayscale === 'grayscale(0%)' ? 'grayscale(100%)' : 'grayscale(0%)'
    this.setState({grayscale})
  }

  triggerResume = () => {
    let opacity = this.state.pauseGame ? 1.0 : 0.1
    this.setState({
      pauseGame: !this.state.pauseGame,
      gameDivStyleOpacity: opacity,
      settings: false
    }, this.startGame)
  }

  render() {
    const paddleStyle = {
      backgroundColor: 'black',
      height: "25px",
      width: "100px",
      position: "absolute",
      left: this.state.paddleLeft,
      bottom: 0,
    }

    const ballStyle = {
      backgroundColor: 'gray',
      height: "25px",
      width: "25px",
      position: "absolute",
      top: this.state.ballTop,
      left: this.state.ballLeft
    }

    const gameDivStyle = {
      WebkitFilter: this.state.grayscale,
      opacity: this.state.gameDivStyleOpacity
    }

    return (
      <div className="App">

        {!this.state.startGame && <Menu triggerStartGame={this.triggerStartGame}/>}

        {this.state.startGame && <div id="game" style={gameDivStyle}>
          <div style={paddleStyle} id="paddle" ></div>
          <div style={ballStyle} id="ball"></div>
          <SettingButton triggerSettings={this.triggerSettings} />
          <Score score={this.state.counter}/>
          <SayHello />
        </div>}

        {this.state.pauseGame && <div>
          <Pause triggerResume={this.triggerResume}/>
        </div>}

        {this.state.settings && <div>
          <Setting triggerGrayScale={this.triggerGrayScale}/>
        </div>}

        {this.state.lostGame && <LostGame restartGame={this.restartGame} score={this.state.counter}/>}

      </div>
    );
  }
}

export default App;
