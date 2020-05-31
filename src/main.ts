/// <reference path="../node_modules/phaser/types/phaser.d.ts"/>

function preload(): Phaser.Types.Scenes.ScenePreloadCallback {
  this.load.setBaseURL('http://labs.phaser.io')
  this.load.image('sky', 'assets/skies/space3.png')
  this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  this.load.image('red', 'assets/particles/red.png')
  return
}

function create(): Phaser.Types.Scenes.SceneCreateCallback {
  this.add.image(400, 300, 'sky')
  var particles = this.add.particles('red')
  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD',
  })
  var logo = this.physics.add.image(400, 100, 'logo')
  logo.setVelocity(100, 200)
  logo.setBounce(1, 1)
  logo.setCollideWorldBounds(true)
  emitter.startFollow(logo)
  const game: Phaser.Game = this.game
  window.addEventListener('resize', function () {
    game.scale.resize(window.innerWidth, window.innerHeight)
  })
  return
}

async function main(canvas: HTMLCanvasElement) {
  new Phaser.Game({
    type: Phaser.WEBGL,
    width: '100vw',
    height: '100vh',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
      },
    },
    canvas,
    scene: {
      preload: preload,
      create: create,
    },
  })
}

export default main
