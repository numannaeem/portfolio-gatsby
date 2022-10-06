import React from 'react'

function PasswordModal () {
  return (
    <div className='border-0 p-1 border-tertiary bg-gray-700/50 rounded-lg shadow-2xl relative flex flex-col w-full outline-none focus:outline-none'>
      <div className='p-5 items-center text-gray-200 pb-2 text-xl flex justify-between'>
        <p>You shall not pass! 🗝️</p>
        {/* <button
                onClick={closeModal}
                className='hover:bg-gray-600 rounded-md transition-colors'
              >
                <IoIosClose className='text-gray-400 text-4xl hover:text-gray-300 transition-colors' />
              </button> */}
      </div>
      <div className='flex items-start justify-between p-5 pt-3 rounded'>
        <input
          autoFocus
          className='grow w-80 transition-colors focus:border-tertiary outline-none bg-transparent border-gray-500 border-2 px-3 py-2 rounded-md'
          type={'text'}
          placeholder=''
        />
      </div>
    </div>
  )
}

export default PasswordModal
