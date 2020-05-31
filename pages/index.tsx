import Head from 'next/head'
import { useEffect, useRef } from 'react'

function preload() {
  this.load.setBaseURL('http://labs.phaser.io')
  this.load.image('sky', 'assets/skies/space3.png')
  this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  this.load.image('red', 'assets/particles/red.png')
}

function create() {
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
}

export default function Home() {
  const ref = useRef<HTMLCanvasElement>()
  useEffect(() => {
    if (process.browser && ref) {
      ;(async function main() {
        const canvas = ref.current
        const Phaser = await import('phaser')
        new Phaser.Game({
          type: Phaser.WEBGL,
          width: 800,
          height: 600,
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
      })()
    }
  }, [ref])

  return (
    <div className="container">
      <Head>
        <title>A phaser game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <canvas ref={ref}></canvas>
    </div>
  )
}
