import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { Fade } from 'react-reveal'

function PasswordModal ({handClicks, setHandClicks}) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [innerModalOpen, setInnerModalOpen] = React.useState(false)


  console.log(handClicks);

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
      if (enteredString.toLowerCase().slice(-6) === 'secret') {
        setTimeout(openModal, 1)
      }
      timeoutId = setTimeout(() => {
        enteredString = ''
      }, 1000 * 3)
    }
    window.addEventListener('keydown', keyHandler)

		return () => window.removeEventListener('keydown', keyHandler)
  }, [])

  return modalOpen ? (
    <Fade duration={400} when={innerModalOpen}>
      <div className='flex self-center top-[40%]  fixed z-[60] outline-none focus:outline-none'>
          <div className='border-0 p-3 bg-gray-700/50 rounded-lg shadow-2xl relative flex flex-col w-full outline-none focus:outline-none'>
            <div className='p-5 items-center text-gray-200 pb-2 text-xl flex justify-between'>
              <p className=''>Hmm...what have we here? 🤔</p>
              {/* <button
                onClick={closeModal}
                className='hover:bg-gray-600 rounded-md transition-colors'
              >
                <IoIosClose className='text-gray-400 text-4xl hover:text-gray-300 transition-colors' />
              </button> */}
            </div>
            <div className='flex items-start justify-between p-5 rounded'>
              <input
                autoFocus
                className='grow w-96 transition-colors focus:border-tertiary outline-none bg-transparent border-gray-500 border-2 px-3 py-2 rounded-md'
                type={'text'}
                placeholder=''
              />
            </div>
          </div>
      </div>
      <div className='fixed overflow-hidden inset-0 z-50 backdrop-blur-xl bg-black bg-opacity-40' onClick={closeModal} ></div>
    </Fade>
  ) : (
    <div></div>
  )
}

export default PasswordModal
