import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Fade } from 'react-reveal'
import { IoIosClose } from 'react-icons/io'

function SecretModal ({
  children,
  otherTrigger,
  setHandClicks,
  trigger,
  modalAlreadyOpen,
  setModalAlreadyOpen
}) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [innerModalOpen, setInnerModalOpen] = React.useState(false)

  const closeModal = () => {
    if (!modalOpen) return
    document.body.style.overflow = 'auto'
    setModalAlreadyOpen(false)
    setInnerModalOpen(false)
    setTimeout(() => {
      setModalOpen(false)
    }, 300)
  }

  const openModal = () => {
    if (modalOpen || modalAlreadyOpen) return
    document.body.style.overflow = 'hidden'
    setHandClicks && setHandClicks(0)
    setModalOpen(true)
    setModalAlreadyOpen(true)
    setTimeout(() => {
      setInnerModalOpen(true)
    }, 1)
  }

  let enteredString = ''

  React.useEffect(() => {
    if (otherTrigger) openModal()
  }, [otherTrigger])

  let timeoutId

  React.useEffect(() => {
    const keyHandler = e => {
      if (e.key === 'Escape') {
        closeModal()
        return
      }
      if (modalOpen || modalAlreadyOpen || e.repeat) return
      if (timeoutId) clearTimeout(timeoutId)
      enteredString += e.key
      if (enteredString.toLowerCase().slice(-1 * trigger.length) === trigger) {
        setTimeout(openModal, 1)
      }
      timeoutId = setTimeout(() => {
        enteredString = ''
      }, 1000 * 2.5)
    }
    window.addEventListener('keydown', keyHandler)

    return () => window.removeEventListener('keydown', keyHandler)
  }, [modalAlreadyOpen, modalOpen])

  return (
    modalOpen && (
      <Fade duration={400} when={innerModalOpen}>
        <div
          className='fixed inset-0 flex items-center justify-center h-screen w-screen z-[60] backdrop-blur-lg bg-black bg-opacity-40'
          onClick={closeModal}
        >
          <div className='relative' onClick={e => e.stopPropagation()}>
            {children}
            <button onClick={closeModal}>
              <IoIosClose className='transition-opacity opacity-60 hover:opacity-100 md:text-4xl text-3xl absolute md:-top-7 md:-right-7 top-2 right-4' />
            </button>
          </div>
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
