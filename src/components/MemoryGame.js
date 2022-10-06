import React from 'react'
import { Fade } from 'react-reveal'

function MemoryGame ({ handClicks, setHandClicks }) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [innerModalOpen, setInnerModalOpen] = React.useState(false)
  const [tiles, setTiles] = React.useState([])
  const [clickedTile, setClickedTile] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [tries, setTries] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(false)

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setInnerModalOpen(false)
    setTimeout(() => {
      setModalOpen(false)
    }, 400)
  }

  const openModal = () => {
    document.body.style.overflow = 'hidden'
    setHandClicks && setHandClicks(0)
    setModalOpen(true)
    setTimeout(() => {
      setInnerModalOpen(true)
    }, 1)
  }

  let enteredString = ''

  React.useEffect(() => {
    if (handClicks && handClicks === 5) openModal()
  }, [handClicks])

  let timeoutId

  React.useEffect(() => {
    const keyHandler = e => {
      if (e.key === 'Escape') {
        closeModal()
        return
      }
      if (modalOpen) return
      if (timeoutId) clearTimeout(timeoutId)
      enteredString += e.key
      if (enteredString.toLowerCase().slice(-6) === 'memory') {
        setTimeout(openModal, 1)
      }
      timeoutId = setTimeout(() => {
        enteredString = ''
      }, 1000 * 3)
    }
    window.addEventListener('keydown', keyHandler)

    return () => window.removeEventListener('keydown', keyHandler)
  }, [])

  const assignCards = () => {
    let options = [
      'dog',
      'dove',
      'fox',
      'cat',
      'fox',
      'butterfly',
      'dove',
      'penguin',
      'penguin',
      'cat',
      'butterfly',
      'dog'
    ]
    options = options
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .map(v => ({ name: v, revealed: false }))
    setTiles(options)
  }

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
      if (gg) setGameOver(true)
      setClickedTile(false)
    }
  }

  const restartGame = () => {
    setTiles(p => p.map(el => ({ ...el, revealed: false })))
    setTimeout(() => {
      assignCards()
      setGameOver(false)
      setClickedTile(false)
      setTries(0)
    }, 100)
  }

  return modalOpen ? (
    <Fade duration={400} when={innerModalOpen}>
      <div className='flex self-center justify-self-center fixed z-[60] outline-none focus:outline-none'>
        <div
          className={`mx-4 md:mx-0 bg-gray-700/50 transition-colors border-0 md:p-3 p-1 rounded-lg shadow-2xl relative flex flex-col w-full outline-none focus:outline-none`}
        >
          <div className='p-5 items-center text-gray-200 pb-2 text-xl flex flex-col sm:flex-row justify-between'>
            <p className={`${gameOver && ''}`}>
              {gameOver ? 'Well played! 🎉' : 'What have we here? 🤔'}
            </p>
            <Fade when={tries} duration={600}>
              <p className='font-bold mt-2 sm:mt-0'>Tries: {tries}</p>
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
                    : !disabled && 'md:hover:-translate-y-1 md:hover:shadow-[#141414] hover:shadow-lg'
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
      </div>
      <div
        className='fixed overflow-hidden inset-0 z-50 backdrop-blur-lg bg-black bg-opacity-40'
        onClick={closeModal}
      ></div>
    </Fade>
  ) : (
    <></>
  )
}

export default MemoryGame
