import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal'
import RithwinModal from './RithwinModal'

function PasswordModal () {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (password.toLowerCase() === 'rithmyrr') {
      setLoading(true)
      setTimeout(() => {
        setLoggedIn(true)
        setLoading(false)
      }, 400)
    }
  }, [password])

  return (
    <div className='mx-2 md:mx-0 border border-primary bg-gray-700/50 rounded-lg shadow-2xl relative outline-none focus:outline-none'>
      {!loggedIn ? (
        <Fade>
          <div className={`p-6 flex flex-col`}>
            <div className=' items-center text-gray-200 pb-2 text-xl flex justify-between'>
              <p>You shall not pass! 🗝️</p>
            </div>
            <div className='flex items-start justify-between pt-3 rounded'>
              <input
                disabled={loading}
                autoFocus
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='disabled:bg-gray-300/20 grow w-80 transition-all focus:border-gray-300 disabled:border-green-300 outline-none bg-transparent border-gray-500 border px-3 py-2 rounded-md'
                type={'text'}
                placeholder=''
              />
            </div>
          </div>
        </Fade>
      ) : (
          <RithwinModal />
      )}
    </div>
  )
}

export default PasswordModal
