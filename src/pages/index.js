import * as React from 'react'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'

const links = ['about',  'projects', 'contact']

const IndexPage = () => {
  return (
    <Layout>
      <Seo title='home' />
      <div className='flex p-5 ml-3 flex-col gap-5 my-auto md:items-center'>
        <div className='select-none text-3xl md:text-4xl flex  items-center'>
          <h1
            className='text-start transition-all hover:tracking-wider font-semibold md:text-center text-primary '
          >
            welcome to my humble abode!
          </h1>
          <span className='md:basis-auto basis-full '>
            <span className='animate-wave origin-bottom-right inline-block ml-2'>👋</span>
          </span>
        </div>
        <div className='flex text-lg gap-5 md:justify-center justify-start items-center'>
          {links.map((link, i) => {
            return (
              <React.Fragment key={link}>
                <CustomLink to={`/${link}`}>
                  {link}
                </CustomLink>
                {i < links.length - 1  && '•'}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
