import { Link } from 'gatsby'
import * as React from 'react'
import CursorSelector from '../components/cursorSelector'

import Layout from '../components/layout'
import Seo from '../components/seo'

const links = ['about', 'socials', 'projects']

const IndexPage = () => {
  const [letter, setLetter] = React.useState('x')
  
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  
  const shuffle = async final => {
    // let letters = 'abcdefghijklmnopqsrtuvwxyz_-!@#$%^&*+'
    // for (let i = 0; i < 4; i++) {
    //   setLetter(letters[Math.floor(Math.random() * letters.length)])
    //   await sleep(50)
    // }
    setLetter(final)
  }

  return (
    <Layout>
      <Seo title='numxn' />
      <div className='flex p-5 ml-3 flex-col gap-5 my-auto md:items-center'>
        <div className='text-3xl md:text-4xl flex  items-center'>
          <h1
            onMouseEnter={() => shuffle('a')}
            onMouseLeave={() => shuffle('x')}
            className='w-min md:w-fit text-start transition-all hover:tracking-wider font-semibold md:text-center text-primary '
          >
            welcome to my humble abode!
          </h1>
          <span className=' animate-wave origin-bottom-right inline-block ml-1'>
            👋
          </span>
        </div>
        <div className='flex text-lg gap-5 md:justify-center justify-start items-center'>
          {links.map((link, i) => {
            return (
              <>
                <Link className='link-grow text-tertiary after:bg-tertiary' key={link} to={`/${link}`}>
                  {link}
                </Link>
                {i < links.length - 1  && '•'}
              </>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
