interface Window {
  AudioContext: typeof AudioContext
}

class Sound {
  context: AudioContext
  oscillator: any
  gainNode: any
  constructor(context: AudioContext) {
    this.context = context
  }

  init() {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()

    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.context.destination)
  }

  play() {
    this.init()

    this.gainNode.gain.setValueAtTime(0.1, this.context.currentTime)

    this.oscillator.start()
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.context.currentTime + 1
    )
    this.oscillator.stop(this.context.currentTime + 1)
  }
}

var context = new AudioContext()
var sound = new Sound(context)
sound.init()
var wave = 'square'
var state = 'paused'

let buttons = document.querySelectorAll('.waveform')
let playBtn = document.querySelector('#play') as HTMLButtonElement
let container = document.querySelector('.container')
// buttons.forEach(function(button) {
//   //   button.addEventListener('click', function() {
//   //     cleanClass('active')
//   //     wave = button.dataset.wave
//   //     sound.oscillator.type = wave
//   //     button.classList.add('active')
//   //   })
// })

playBtn.addEventListener('click', function() {
  if (playBtn.textContent == 'Play') {
    sound.play()
    sound.oscillator.type = wave
    playBtn.textContent = 'Pause'
  } else {
    sound.stop()
    playBtn.textContent = 'Play'
  }
})

function cleanClass(rclass: string) {
  buttons.forEach(function(button) {
    button.classList.remove(rclass)
  })
}
