import React, { Component } from 'react'
import Fullscreen from 'react-full-screen'
import './Lightscreen.css'

class lightscreen extends Component {
  state = {
    isFull: false
  }

  goFull = () => {
    this.setState({ isFull: true })
  }

  render() {
    return (
      <div className='fullscreen'>
        <button onClick={this.goFull}>Go Fullscreen</button>

        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({ isFull })}
        >
          <div className='full-screenable-node'>
            {this.state.isFull ? <div className='light'>poop</div> : ''}
          </div>
        </Fullscreen>
      </div>
    )
  }
}

export default lightscreen
