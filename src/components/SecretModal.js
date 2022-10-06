import React from 'react'
import PropTypes from 'prop-types'
import { Fade } from 'react-reveal'

function SecretModal ({ children, handClicks, setHandClicks, trigger }) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [innerModalOpen, setInnerModalOpen] = React.useState(false)

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
      if (enteredString.toLowerCase().slice(-1 * trigger.length) === trigger) {
        setTimeout(openModal, 1)
      }
      timeoutId = setTimeout(() => {
        enteredString = ''
      }, 1000 * 3)
    }
    window.addEventListener('keydown', keyHandler)

    return () => window.removeEventListener('keydown', keyHandler)
  }, [])

  return (
    modalOpen && (
      <Fade duration={400} when={innerModalOpen}>
        <div
          className='fixed inset-0 flex items-center justify-center h-screen w-screen z-[60] backdrop-blur-lg bg-black bg-opacity-40'
          onClick={closeModal}
        >
          <div onClick={e => e.stopPropagation()}>{children}</div>
        </div>
      </Fade>
    )
  )
}

SecretModal.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.string.isRequired
}

export default SecretModal
