import * as React from 'react'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Fade } from 'react-reveal'
import useCheckMobileScreen from '../mobileHook'

const links = ['about', 'projects', 'contact']

const IndexPage = () => {
  const isMobile = useCheckMobileScreen()
  
  return (
    <Layout>
      <Seo title='home' />
      <div className='select-none flex p-5 ml-3 flex-col gap-5 my-auto md:items-center'>
        <div className='text-3xl md:text-4xl flex  items-center'>
          <h1 className='text-start transition-all hover:tracking-wider font-semibold md:text-center text-primary'>
            <Fade ssrReveal left={!isMobile} cascade={!isMobile} duration={1000}>
              welcome to my humble abode!
            </Fade>
          </h1>
          <div className=' md:basis-auto text-3xl basis-full'>
            <span className='animate-wave origin-bottom-right inline-block ml-2' >
              <Fade ssrReveal delay={500}>
                👋
              </Fade>
            </span>
          </div>
        </div>
        <div className='flex gap-5 md:justify-center justify-start items-center'>
          {links.map((link, i) => {
            return (
              <>
                <Fade ssrReveal duration={800} delay={800 + 600 * i} key={link}>
                  <CustomLink className={'font-link text-3xl'} to={`/${link}`}>
                    {link}
                  </CustomLink>
                </Fade>
                <Fade ssrReveal delay={1100 + 600 * i}>
                  <span className='text-secondary'>
                    {i < links.length - 1 && '•'}
                  </span>
                </Fade>
              </>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
