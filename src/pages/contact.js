import React, { useEffect, useState } from 'react'
import ArrowBtn from '../components/ArrowBtn'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {
  FaRegEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaInstagram
} from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { graphql } from 'gatsby'
import animationData from '../lotties/success.json'
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
      to: 'mailto:dev@numxn.me',
      classes: 'text-sky-300 after:bg-sky-300',
      name: 'dev@numxn.me',
      icon: <FaRegEnvelope />
    },
    {
      to: 'https://instagram.com/num4n_',
      classes: 'text-purple-300 after:bg-purple-300',
      name: 'num4n_',
      icon: <FaInstagram />
    },
    {
      to: 'https://linkedin.com/in/numxn',
      classes: 'text-blue-300 after:bg-blue-300',
      name: 'Numan Naeem',
      icon: <FaLinkedinIn />
    },
    {
      to: 'https://github.com/numannaeem',
      classes: 'text-gray-300 after:bg-gray-300',
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
    <Layout>
      <Seo title='contact' />
      <div className='grow gap-5 md:gap-4 mt-5 px-5 flex flex-col self-center w-full lg:w-2/3'>
        <h2 className='text-xl mb-1'>
          Have an exciting project in mind, or just wanna have a chat? Find me
          below...
        </h2>
        <div className='font-semibold flex gap-6 gap-y-2 flex-wrap text-base'>
          {links.map(link => (
            <div key={link.name} className=' text-lg mb-2'>
              <CustomLink
                target={'_blank'}
                className='flex gap-2 items-center w-fit'
                to={link.to}
                classes={link.classes}
              >
                {link.icon}
                {link.name}
              </CustomLink>
            </div>
          ))}
        </div>

        <form
          className={`${sending &&
            'pointer-events-none opacity-50'} duration-300 transition-opacity w-full shadow-2xl mt-3 mb-6 bg-gray-800 p-4 rounded-lg  flex text-white flex-col gap-3 justify-start items-start`}
          onSubmit={sendMessage}
          onChange={handleChange}
        >
          {sent ? (
            <div className='flex-col -mt-6 pointer-events-none text-green-300 text-2xl h-72 w-full flex items-center justify-center'>
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                    
                  }
                }}
                eventListeners={[
                  {
                    eventName: 'enterFrame',
                    callback: () => setTimeout(() => setAnimCompleted(true), 1000)
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
            </div>
          ) : (
            <>
              <p className='text-xl my-2 '>...or, send a quick message!</p>
              <div className='w-full flex flex-row flex-wrap gap-3'>
                <input
                  className='grow transition-colors focus:border-gray-500 outline-none bg-gray-800 border-gray-700 border-2 px-3 py-2 rounded-md'
                  type={'text'}
                  value={formData.name}
                  name='name'
                  placeholder='Your name'
                  required
                ></input>
                <input
                  className='grow-[5] transition-colors focus:border-gray-500 outline-none bg-gray-800 border-gray-700 border-2 px-3 py-2 rounded-md'
                  type={'email'}
                  value={formData.email}
                  name='email'
                  placeholder='Your email (so I can get back to you)'
                  required
                ></input>
              </div>
              <textarea
                rows={4}
                className=' bg-gray-800 transition-colors focus:border-gray-500 outline-none border-gray-700 border-2 px-3 py-2 rounded-md w-full'
                value={formData.message}
                name='message'
                placeholder="Tell me anything and everything!"
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
                  {sending ? (
                    <>
                      Hold on
                      <BiLoaderAlt className='font-bold text-lg animate-spin' />
                    </>
                  ) : (
                    <>
                      Send
                      <FiSend />
                    </>
                  )}
                </button>
                {err && <span className={` text-red-300`}>
                   Uh-Oh! Something went wrong :/
                </span>}
              </div>
            </>
          )}
        </form>

        <div className='mt-auto flex justify-between'>
          <ArrowBtn dir={'left'} to='/projects' />
          <ArrowBtn dir={'right'} to='/about' />
        </div>
      </div>
    </Layout>
  )
}

export default Contact
