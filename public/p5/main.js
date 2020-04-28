if (!Element.prototype.requestFullscreen) {
  Element.prototype.requestFullscreen =
    Element.prototype.mozRequestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.msRequestFullscreen
}

if (!document.exitFullscreen) {
  document.exitFullscreen =
    document.mozExitFullscreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen
}

if (!document.fullscreenElement) {
  Object.defineProperty(document, 'fullscreenElement', {
    get: function () {
      return (
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.webkitFullscreenElement
      )
    },
  })

  Object.defineProperty(document, 'fullscreenEnabled', {
    get: function () {
      return (
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled ||
        document.webkitFullscreenEnabled
      )
    },
  })
}





let mic
let tune

function preload() {
    tune = loadSound('alvanoto_U_07.mp4')
//   tune = loadSound('Vivaldi_The_Four_Seasons_Summer_in_G_Minor_IIIPresto.mp4')
}

let micOrSound = ''

function setup() {
  let cnv = createCanvas(windowWidth - 50, windowHeight - 80)
  cnv.style('display', 'block')
  angleMode(DEGREES)
  mic = new p5.AudioIn()

  fft = new p5.FFT(0.3, 1024)

  
  // !! tune / mic
  //   fft.setInput()

  //   let fullscreen = createButton('Fullscreen')
  //   fullscreen.mousePressed(fullscreenToggle)
  let buttonMic = createButton('Mic on/off')
  let buttonSound = createButton('Song on/off')
  buttonMic.position(200, 50)
  buttonSound.position(200, 100)
  buttonMic.mousePressed(toggleMic)
  buttonSound.mousePressed(toggleSound)
}

function draw() {
  background(10)

  let spectrum = fft.analyze(1024)
  // console.log(fft.getEnergy("bass"))

  //! poles
  stroke(50, 230, 200)
//   strokeWeight(2)
  fill(255, 0, 255)
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width)
    let h = -height + map(spectrum[i], 0, 255, height, 0)
    rect(x, height, width / spectrum.length, h)
  }

  //! hz
  // let bass, lowMid, mid, highMid, treble;

  // bass = fft.getEnergy("bass");
  // lowMid = fft.getEnergy("lowMid");
  // mid = fft.getEnergy("mid");
  // highMid = fft.getEnergy("highMid");
  // treble = fft.getEnergy("treble");

  // let bins = [bass, lowMid, mid, highMid, treble]

  // for (var i = 0; i < 5; i++) {
  //     fill(i + 1 * (255 / 5) / 255, (i + 1) * (255 / 5), 0);
  //     rect((i * width / 5) + 10, height / 2, 30, map(bins[i], 0, 255, 0, -height / 2));

  // }

  // beginShape();
  // stroke(0, 255, 0);
  // noFill();
  // // for (var i = 0; i < spectrum.length; i++) {
  // //   let x, y;
  // //   x = map(i, 0, spectrum.length - 1, 0, windowWidth);
  // //   y = map(spectrum[i], 0, 255, height / 2, 0);
  // //   vertex(x, y);
  // // }
  // endShape();

  let waveform = fft.waveform()
  noFill()

  //! round wave
  //? translate: shape to the middle
  translate(width / 2, height / 2)
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 2, 0, height - 50)
    let x = r * cos(i + 50)
    let y = r * sin(i + 50)
    vertex(x, y)
  }
  endShape()
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 2.01, 0, height - 50)
    let x = r * cos(i + 100)
    let y = r * sin(i + 100)
    vertex(x, y)
  }
  endShape()
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 2.02, 0, height - 50)
    let x = r * cos(i + 200)
    let y = r * sin(i + 200)
    vertex(x, y)
  }
  endShape()
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 2.03, 0, height - 50)
    let x = r * cos(i + 300)
    let y = r * sin(i + 300)
    vertex(x, y)
  }
  endShape()
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 2.04, 0, height - 50)
    let x = r * cos(i + 500)
    let y = r * sin(i + 500)
    vertex(x, y)
  }
  endShape()
  beginShape()
  stroke(250, 0, 250)
  for (let i = 0; i <= 360; i++) {
    let r = map(waveform[i], -1, 2.05, 0, height - 50)
    let x = r * cos(i)
    let y = r * sin(i)
    vertex(x, y)
  }
  endShape()

  //! mid line wave
  // beginShape()
  // stroke(250, 0, 250)
  // for (let i = 0; i < waveform.length; i++) {
  //   let x = map(i, 0, waveform.length, 0, width)
  //   let y = map(waveform[i], -1, 1, 0, height)
  //   vertex(x, y)
  // }
  // endShape()
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
function fullscreenToggle() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
