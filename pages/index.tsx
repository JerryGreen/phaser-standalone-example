import Head from 'next/head'
import { useEffect, useRef } from 'react'
import main from '../src/main'

export default function Home() {
  const ref = useRef<HTMLCanvasElement>()
  useEffect(() => {
    if (process.browser && ref) {
      main(ref.current)
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
