import React from 'react'
import { Fade } from 'react-reveal'
import ReactCanvasConfetti from 'react-canvas-confetti'

function MemoryGame () {
  const refAnimationInstance = React.useRef(null)

  const [tiles, setTiles] = React.useState([])
  const [clickedTile, setClickedTile] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [tries, setTries] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(false)

  const getInstance = React.useCallback(instance => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = React.useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      })
  }, [])

  const fire = React.useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    })
    makeShot(0.2, {
      spread: 40
    })
    makeShot(0.05, {
      spread: 50,
      startVelocity: 40
    })
    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })
    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })
    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    })
  }, [makeShot])

  const assignCards = React.useCallback(() => {
    let options = ['dog', 'dove', 'fox', 'cat', 'butterfly', 'penguin']
    options = options
      .concat(options)
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .map(v => ({ name: v, revealed: false }))
    setTiles(options)
  }, [])

  React.useEffect(() => {
    assignCards()
  }, [])

  const revealCard = i => {
    if (disabled || tiles[i].revealed) return
    setTiles(p => [
      ...p.slice(0, i),
      {
        ...p[i],
        revealed: true
      },
      ...p.slice(i + 1)
    ])
    if (!clickedTile) {
      setClickedTile({ ...tiles[i], index: i })
      return
    } else if (tiles[i].name !== clickedTile.name) {
      setDisabled(true)
      setTries(p => p + 1)
      setTimeout(() => {
        let items = [...tiles]
        Object.assign(items[clickedTile.index], {
          revealed: false
        })
        Object.assign(items[i], { revealed: false })
        setTiles(items)
        setClickedTile(false)
        setDisabled(false)
      }, 450)
    } else {
      setTries(p => p + 1)
      let temp = [...tiles]
      temp[i].revealed = true
      let gg = temp.reduce((prev, cur) => prev && cur.revealed, true)
      if (gg) {
        fire()
        setGameOver(true)
      }
      setClickedTile(false)
    }
  }

  const restartGame = () => {
    setTiles(p => p.map(el => ({ ...el, revealed: false })))
    setGameOver(false)
    setClickedTile(false)
    setTries(0)
    setTimeout(() => {
      assignCards()
    }, 100)
  }

  return (
    <div
      className={`mx-2 md:mx-0 border border-secondary bg-gray-700/50 transition-colors md:p-3 p-1 rounded-lg shadow-2xl relative flex flex-col outline-none focus:outline-none`}
    >
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 100
        }}
      />
      <div className='p-5 items-center text-gray-200 pb-2 text-xl flex flex-col sm:flex-row justify-between'>
        <p>
          {gameOver ? 'Well played! 👏' : 'What have we here? 🤔'}
        </p>
        <Fade when={tries} duration={600}>
          <p className={`${gameOver && 'text-tertiary'} font-bold mt-2 sm:mt-0`}>{tries} {tries === 1 ? 'try' : 'tries'}</p>
        </Fade>
      </div>
      <div className='flex max-w-md flex-wrap md:gap-5 gap-4 items-start justify-between p-5 rounded'>
        {tiles.map((tile, i) => (
          <div
            onClick={() => revealCard(i)}
            key={i}
            className={`tile ${
              tile.revealed
                ? 'revealed'
                : !disabled &&
                  'md:hover:-translate-y-1 md:hover:shadow-[#141414] hover:shadow-lg'
            } select-none rounded-md transition-all duration-100 overflow-hidden shadow-lg basis-[21%] bg-transparent w-20 md:h-[104px] h-24`}
          >
            <div className='tile-inner transition-transform duration-300 relative w-full h-full'>
              <div className='tile-front bg-gray-600 flex items-center justify-center absolute w-full h-full'>
                <img src='/svgs/logo.svg' className='text-gray-200' />
              </div>
              <div className='tile-back bg-gray-700 flex items-center justify-center absolute w-full h-full'>
                <img src={`/svgs/origami/${tile.name}.svg`} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Fade when={gameOver} duration={800} collapse top>
        <div className='p-5 pt-2 flex sm:justify-start justify-center'>
          <button
            onClick={restartGame}
            className='rounded-lg text-lg font-semibold border-2 w-fit py-2 px-3 transition-colors hover:text-gray-900 text-primary button-grow after:bg-primary border-primary'
          >
            Go again!
          </button>
        </div>
      </Fade>
    </div>
  )
}

export default MemoryGame
