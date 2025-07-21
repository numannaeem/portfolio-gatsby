import React from 'react'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Fade } from 'react-reveal'
import useCheckMobileScreen from '../mobileHook'
import MemoryGame from '../components/MemoryGame'
import SecretModal from '../components/SecretModal'
import PasswordModal from '../components/PasswordModal'
import { useEffect } from 'react'

const links = ['about', 'projects']

const IndexPage = () => {
  const isMobile = useCheckMobileScreen()
  const [handClicks, setHandClicks] = React.useState(0)
  const [touches, setTouches] = React.useState(0)
  const [modalOpen, setModalOpen] = React.useState(false)

  useEffect(() => {
    const handleTouch = e => {
      e.stopPropagation()
      e.stopImmediatePropagation()
      if (e.touches.length === 3) setTouches(p => p + 3)
      // else setTouches(0)
    }
    window.addEventListener('touchstart', handleTouch)
    return () => {
      window.removeEventListener('touchstart', handleTouch)
    }
  })

  return (
    <Layout>
      <Seo title='home' />
      <SecretModal
        modalAlreadyOpen={modalOpen}
        setModalAlreadyOpen={setModalOpen}
        otherTrigger={handClicks === 5}
        setHandClicks={setHandClicks}
        trigger='memory'
      >
        <MemoryGame />
      </SecretModal>
      <SecretModal
        modalAlreadyOpen={modalOpen}
        setModalAlreadyOpen={setModalOpen}
        otherTrigger={touches === 6}
        setHandClicks={setTouches}
        trigger='pass'
      >
        <PasswordModal />
      </SecretModal>
      <div className='select-none flex p-5 ml-3 flex-col gap-5 my-auto md:items-center'>
        <div className='text-3xl md:text-4xl flex  items-center'>
          <h1 className='text-start transition-all hover:tracking-wider font-semibold md:text-center text-primary'>
            <Fade ssrReveal left={!isMobile} cascade={!isMobile} duration={800}>
              welcome to my humble abode!
            </Fade>
          </h1>
          <div className=' md:basis-auto text-3xl basis-full'>
            <span
              onClick={() => setHandClicks(p => p + 1)}
              className='animate-wave origin-bottom-right inline-block ml-2'
            >
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
                <Fade ssrReveal duration={700} delay={700 + 500 * i} key={link}>
                  <CustomLink
                    className={
                      'font-link text-3xl text-tertiary after:bg-tertiary'
                    }
                    to={`/${link}`}
                  >
                    {link}
                  </CustomLink>
                </Fade>
                <Fade ssrReveal delay={950 + 500 * i}>
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
