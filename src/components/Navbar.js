import AniLink from 'gatsby-plugin-transition-link/AniLink'
import React, { useContext, useEffect, useState } from 'react'
import { CursorContext } from './layout'

const Navbar = () => {
  const [offset, setOffset] = useState(0)
  const [selectorHidden, setSelectorHidden] = useState(true)

  const { cursor, setCursor } = useContext(CursorContext)

  useEffect(() => {
    setOffset(window.scrollY)
    const scrollFn = () => {
      setOffset(window.scrollY)
    }
    window.addEventListener('scroll', scrollFn)
    return () => window.removeEventListener('scroll', scrollFn)
  }, [])

  let options = ['default', 'cat', 'dog', 'dove', 'fox',  'penguin', 'butterfly']

  return (
    <>
      <div
        onDoubleClick={() => setSelectorHidden(p => !p)}
        className={`${
          offset > 30 ? 'bg-gray-700/40 shadow-xl backdrop-blur-xl' : ''
        } md:py-4 py-2 overflow-hidden transition-colors select-none fixed top-0 z-50 w-full flex items-center px-5 justify-between`}
      >
        <AniLink
          hex='#FFA099'
          paintDrip
          duration={0.4}
          to='/'
          className='drop-shadow-lg will-change-transform hover:rotate-180 ease-in-out transition delay-150 duration-[400ms] text-3xl text-white font-bold'
        >
          <img
            alt='logo'
            // height={100}
            // width={100}
            className='md:h-24 md:w-24 h-[86px] w-[86px]'
            src='/svgs/logo.svg'
          />
        </AniLink>
        <div
          className={`${selectorHidden &&
            'opacity-0 translate-x-[100%]'} duration-300 transition-all will-change-transform cursor-default hidden md:flex flex-col group items-center mt-3`}
        >
          <div className='flex'>
            {options.map(option => (
              <div
                key={option}
                className={`${option === cursor &&
                  'bg-gray-700'} transition-colors rounded-md p-1 cursor-pointer mr-1`}
              >
                <img
                  alt={option}
                  title={option[0].toUpperCase() + option.slice(1)}
                  onClick={() => setCursor(option)}
                  height={32}
                  width={32}
                  src={`/svgs/origami/${option}.svg`}
                />
              </div>
            ))}
          </div>
          <p className='text-secondary transition opacity-0 group-hover:opacity-90'>
            choose your cursor!
          </p>
        </div>
      </div>
      <div
        className={`md:py-4 py-3 overflow-hidden sticky top-0 flex opacity-0 items-center`}
      >
        <div
          alt='logo'
          className='h-[100px] w-[100px]'
        />
      </div>
    </>
  )
}

export default Navbar
