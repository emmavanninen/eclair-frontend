import p5sound from '../../../../node_modules/p5/lib/addons/p5.sound'

export default function sketch(p) {
  //   let canvas

  //   p.setup = () => {
  //     canvas = p.createCanvas(300, 200)
  //     p.noStroke()
  //   }

  //   p.draw = () => {
  //     p.background('orangered')
  //     p.ellipse(150, 100, 100, 100)
  //   }

  //   p.myCustomRedrawAccordingToNewPropsHandler = newProps => {
  //     if (canvas)
  //       //Make sure the canvas has been created
  //       p.fill(newProps.color)
  //   }

  let mic

  p.setup = () => {
    mic = p.createCanvas(710, 200)

    // Create an Audio input
    mic = new p5sound.Amplitude()

    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    // mic.start()
  }

  p.draw = () => {
    p.background(200)

    // Get the overall volume (between 0 and 1.0)
    let vol = mic.getLevel()
    p.fill(127)
    p.stroke(0)

    // Draw an ellipse with height based on volume
    // let h = p.map(vol, 0, 1, height, 0)
    // p.ellipse(width / 2, h - 25, 50, 50)
  }
}
