import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react'
import main from '../src/main'

export default function Home() {
  const [ref, setRef] = useState<HTMLCanvasElement>()
  const measuredRef = useCallback((ref) => setRef(ref), [])
  useEffect(() => {
    if (process.browser && ref) {
      ;(async () => {
        await import('phaser')
        await main(ref)
      })()
    }
  }, [ref])

  return (
    <div className="container">
      <Head>
        <title>A phaser game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <canvas ref={measuredRef}></canvas>
      <style global jsx>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </div>
  )
}
