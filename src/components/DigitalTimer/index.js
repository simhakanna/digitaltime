import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {runningStage: false, min: 25, sec: 0, setTime: 25}

  playImg = () => {
    const {runningStage} = this.state
    if (runningStage) {
      return (
        <img
          className="icon-s"
          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
          alt="pause icon"
        />
      )
    }

    return (
      <img
        className="icon-s"
        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
        alt="play icon"
      />
    )
  }

  dicTime = () => {
    const {runningStage} = this.state
    if (!runningStage) {
      this.setState(prev => ({
        min: prev.min - 1,
        setTime: prev.setTime - 1,
      }))
    }
  }

  incTime = () => {
    const {runningStage} = this.state
    if (!runningStage) {
      this.setState(prev => ({
        min: prev.min + 1,
        setTime: prev.setTime + 1,
      }))
    }
  }

  runOrPause = async () => {
    await this.setState(prev => ({runningStage: !prev.runningStage}))
    const {runningStage} = this.state
    if (runningStage) {
      this.timeId = setInterval(() => {
        const {sec} = this.state

        if (sec === 0) {
          this.setState(prev => ({
            sec: 59,
            min: prev.min - 1,
          }))
        } else {
          this.setState(prev => ({sec: prev.sec - 1}))
        }
      }, 1000)
    } else {
      clearInterval(this.timeId)
    }
  }

  resetTime = () => {
    clearInterval(this.timeId)
    this.setState({min: 25, sec: 0, runningStage: false})
  }

  render() {
    const {runningStage, min, sec, setTime} = this.state

    return (
      <div className="bg">
        <h1 className="t-hed">Digital Timer</h1>
        <div className="down">
          <div className="timer">
            <div className="time">
              <h1 className="minute">
                {min}:{sec < 9 && 0}
                {sec}
              </h1>
              <p className="u-minute">{runningStage ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="methods">
            <div className="s-p">
              <button onClick={this.runOrPause} type="button" className="icon">
                {this.playImg()}

                <p className="s-name">{runningStage ? 'Pause' : 'Start'}</p>
              </button>
              <button onClick={this.resetTime} type="button" className="icon">
                <img
                  className="icon-s"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />

                <p className="s-name">Reset</p>
              </button>
            </div>
            <p className="t-l-t">Set Timer Limit</p>
            <div className="but">
              <button onClick={this.dicTime} type="button" className="icon">
                -
              </button>
              <p className="val">{setTime}</p>
              <button onClick={this.incTime} type="button" className="icon">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
