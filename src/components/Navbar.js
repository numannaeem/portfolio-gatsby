import { Link } from 'gatsby'
import React, { useContext, useEffect, useState } from 'react'
import { CursorContext } from './layout'

const Navbar = () => {
  const [offset, setOffset] = useState(0)
  const [selectorHidden, setSelectorHidden] = useState(true)

  const { cursor, setCursor } = useContext(CursorContext)

  useEffect(() => {
    const scrollFn = () => {
      setOffset(window.pageYOffset)
    }
    window.addEventListener('scroll', scrollFn)
    return () => window.removeEventListener('scroll', scrollFn)
  }, [offset])

  let options = ['default', 'dog', 'monkey', 'lion', 'bee']

  return (
    <div
      onDoubleClick={() => setSelectorHidden(p => !p)}
      className={`${
        offset > 30 ? 'bg-gray-700/40 shadow-xl ' : ''
      } md:py-4 overflow-hidden transition-colors select-none sticky top-0 backdrop-blur-lg z-50  flex items-center px-5 py-7 justify-between`}
    >
      <Link
        to='/'
        className='drop-shadow-lg will-change-transform hover:rotate-180 ease-in-out transition delay-300 duration-[400ms] text-3xl text-white font-bold'
      >
        <img className='' width={100} src='/svgs/logo.svg' />
      </Link>
      <div className={`${selectorHidden && 'opacity-0 translate-x-[100%]' } duration-300 transition-all will-change-transform cursor-default hidden md:flex flex-col group items-center mt-3`}>
        <div className='flex'>
          {options.map(option => (
            <div
              key={option}
              className={`${option === cursor &&
                'bg-gray-700'} transition-colors rounded-md p-1 cursor-pointer mr-1`}
            >
              <img
                alt={option}
                title={option}
                onClick={() => setCursor(option)}
                height={32}
                width={32}
                src={`/svgs/${option}.svg`}
              />
            </div>
          ))}
        </div>
        <p className='text-secondary transition opacity-0 group-hover:opacity-90'>
          choose your cursor!
        </p>
      </div>
    </div>
  )
}

export default Navbar
