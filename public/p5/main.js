let mic;
let tune;

function preload() {
  //   tune = loadSound('alvanoto_U_07.mp4')
  tune = loadSound('Vivaldi_The_Four_Seasons_Summer_in_G_Minor_IIIPresto.mp4')
}

let micOrSound = ''

function setup() {
  createCanvas(800, 400)
  angleMode(DEGREES)
  mic = new p5.AudioIn()

  fft = new p5.FFT(0.8, 1024)

  // !! tune / mic
//   fft.setInput()

  let buttonMic = createButton('Mic on/off')
  let buttonSound = createButton('Song on/off')
  buttonMic.mousePressed(toggleMic)
  buttonSound.mousePressed(toggleSound)
}

function draw() {
  background(10)

  let spectrum = fft.analyze()
  // noStroke()
  stroke(50, 230, 200)
  fill(255, 0, 255)
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width)
    let h = -height + map(spectrum[i], 0, 255, height, 0)
    rect(x, height, width / spectrum.length, h)
  }

  let waveform = fft.waveform()
  noFill()

  //! round wave
  //? translate: shape to the middle
  translate(width / 2, height / 2)
  beginShape()
  stroke(100, 170, 0)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 1, 0, height - 50)
    let x = r * cos(i + 50)
    let y = r * sin(i + 50)
    vertex(x, y)
  }
  endShape()
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 1, 0, height - 50)
    let x = r * cos(i)
    let y = r * sin(i)
    vertex(x, y)
  }
  endShape()

  //! mid line wave
  //   beginShape()
  //   stroke(250, 0, 250)
  //   for (let i = 0; i < waveform.length; i++) {
  //     let x = map(i, 0, waveform.length, 0, width)
  //     let y = map(waveform[i], -1, 1, 0, height)
  //     vertex(x, y)
  //   }
  //   endShape()
}

function toggleMic() {
    fft.setInput(mic)
  if (mic.stream) {
    mic.stop()
  } else {
    mic.start()
  }
}
function toggleSound() {
    fft.setInput(tune)
  if (tune.isPlaying()) {
    tune.pause()
  } else {
    tune.play()
  }
}
