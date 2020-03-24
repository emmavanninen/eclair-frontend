import React, { Component } from 'react'
import p5 from 'p5'
import P5Wrapper from 'react-p5-wrapper'
import Sketch from '../sketches/Sketch'
import P5sound from '../../../../node_modules/p5/lib/addons/p5.sound'
import Mic from '../Microphone/Microphone'

export default class Screen extends Component {
    render() {
        return (
          <div>
            <P5Wrapper sketch={Sketch}></P5Wrapper>
          </div>
        )
    }
}
