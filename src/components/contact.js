import React, { useState } from 'react'
import CustomLink from './CustomLink'
import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram
} from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import animationData from '../lotties/success.json'
import { Fade } from 'react-reveal'
import Lottie from 'react-lottie'

const Contact = () => {
  const [formData, setFormData] = useState({
    message: '',
    name: '',
    email: ''
  })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState(false)
  const [sending, setSending] = useState(false)
  const [animCompleted, setAnimCompleted] = useState(false)
  const links = [
    {
      to: 'https://instagram.com/numsgram',
      className: 'text-purple-300 after:bg-purple-300',
      name: 'numsgram',
      icon: <FaInstagram />
    },
    {
      to: 'https://linkedin.com/in/numxn',
      className: 'text-blue-300 after:bg-blue-300',
      name: 'Numan Naeem',
      icon: <FaLinkedinIn />
    },
    {
      to: 'https://github.com/numannaeem',
      className: 'text-gray-300 after:bg-gray-300',
      name: 'numannaeem',
      icon: <FaGithub />
    }
  ]

  const handleChange = e => {
    setFormData(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const sendMessage = e => {
    e.preventDefault()
    setErr(false)
    let data = {
      service_id: process.env.GATSBY_EMAILJS_SERVICE_ID,
      template_id: process.env.GATSBY_EMAILJS_TEMPLATE_ID,
      user_id: process.env.GATSBY_EMAILJS_PUBLIC_KEY,
      template_params: formData
    }
    setSending(true)
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        setFormData({
          message: '',
          name: '',
          email: ''
        })
        setSent(true)
      })
      .catch(() => {
        setErr(true)
      })
      .finally(() => setSending(false))
  }

  return (
    <div>
      <div className='grow gap-5 md:gap-4 mt-5 flex flex-col self-center w-full'>
        <h2 className='text-xl'>Find me below...</h2>
        <Fade duration={1500} cascade top>
          <div className='font-semibold flex gap-6 gap-y-2 flex-wrap text-base'>
            {links.map(link => (
              <div key={link.name} className=' text-lg mb-2'>
                <CustomLink
                  target={'_blank'}
                  to={link.to}
                  className={`${link.className} font-normal flex gap-2 items-center w-fit`}
                >
                  {link.icon}
                  {link.name}
                </CustomLink>
              </div>
            ))}
          </div>
        </Fade>

        <Fade delay={700}>
          <form
            className={`${
              (sending || sent) && 'pointer-events-none'
            } relative transition-opacity w-full shadow-2xl mb-6 bg-gray-800 p-4 rounded-lg  flex text-white flex-col gap-3 justify-start items-start`}
            onSubmit={sendMessage}
            // onChange={handleChange}
          >
            <div
              className={`${
                sending
                  ? 'bg-opacity-60'
                  : sent
                  ? 'bg-opacity-100'
                  : 'bg-opacity-0'
              } duration-300 transition-all flex-col top-0 left-0 rounded-lg pointer-events-none bg-gray-800 text-green-300 text-2xl absolute z-20 h-full w-full flex items-center justify-center`}
            >
              {sent ? (
                <>
                  <Lottie
                    options={{
                      loop: false,
                      autoplay: true,
                      animationData: animationData,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                      }
                    }}
                    eventListeners={[
                      {
                        eventName: 'enterFrame',
                        callback: () =>
                          setTimeout(() => setAnimCompleted(true), 1000)
                      }
                    ]}
                    width={180}
                    height={120}
                  />
                  <p
                    className={`${
                      animCompleted ? 'opacity-100' : 'opacity-0'
                    } duration-300 transition-opacity`}
                  >
                    Message sent!
                  </p>
                </>
              ) : (
                sending && (
                  <BiLoaderAlt className='text-tertiary text-7xl z-20 animate-spin' />
                )
              )}
            </div>
            <p className='text-xl my-2 '>...or, send a quick message!</p>
            <div className='w-full flex flex-row flex-wrap gap-3'>
              <input
                className='grow transition-colors focus:border-gray-500 outline-none bg-gray-800 border-gray-700 border-2 px-3 py-2 rounded-md'
                type={'text'}
                value={formData.name}
                onChange={handleChange}
                name='name'
                placeholder='Name'
                required
              ></input>
              <input
                className='grow-[5] transition-colors focus:border-gray-500 outline-none bg-gray-800 border-gray-700 border-2 px-3 py-2 rounded-md'
                type={'email'}
                value={formData.email}
                onChange={handleChange}
                name='email'
                placeholder='Email (so I can get back to you)'
                required
              ></input>
            </div>
            <textarea
              rows={4}
              className=' bg-gray-800 transition-colors focus:border-gray-500 outline-none border-gray-700 border-2 px-3 py-2 rounded-md w-full'
              value={formData.message}
              onChange={handleChange}
              name='message'
              placeholder='Tell me anything and everything!'
              required
            ></textarea>
            <div className='flex items-center mt-3 mb-1 flex-row gap-5'>
              <button
                disabled={sending}
                type='submit'
                className={`${
                  sending ? 'pointer-events-none' : 'button-grow'
                } rounded-lg flex gap-2 items-center text-lg font-semibold border-2 w-fit py-2 px-3 transition-colors hover:text-gray-900 text-tertiary after:bg-tertiary border-tertiary`}
              >
                Send
                <FiSend />
              </button>
              {err && (
                <span className={` text-red-300`}>
                  Uh-Oh! Something went wrong :/
                </span>
              )}
            </div>
          </form>
        </Fade>
      </div>
    </div>
  )
}

export default Contact
