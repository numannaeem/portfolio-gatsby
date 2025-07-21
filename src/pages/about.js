import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import ArrowBtn from '../components/ArrowBtn'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Fade } from 'react-reveal'
import Contact from '../components/contact'

const About = ({ data }) => {
  const calculateAge = () =>
    ((new Date() - new Date('2001-02-23 00:00')) / 31557600000).toFixed(10) //milliseconds in an year

  const [age, setAge] = useState(calculateAge())

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge())
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Seo title='about' />
      <div className='grow bg-gray-900 mt-5 px-5 flex flex-col self-center w-full lg:w-2/3'>
        <Fade>
          <div className='text-4xl text-secondary flex flex-col md:flex-row items-start md:items-end gap-9'>
            <div className=' md:w-72 w-64 absolute blur-3xl opacity-60 shrink-0 basis-96 object-top md:basis-72'>
              <StaticImage
                layout='constrained'
                src='../images/portrait_pondi.JPG'
                aspectRatio={3 / 4.5}
                placeholder='none'
              />
            </div>
            <StaticImage
              class=' w-64 rounded-xl shrink-0 basis-96 object-top md:basis-72'
              layout='constrained'
              src='../images/portrait_pondi.JPG'
              alt='Me!'
              aspectRatio={3 / 4.5}
              placeholder='dominantColor'
            />
            <div>
              <h1 className='mb-3 font-light'>hi, I'm</h1>
              <h1 className='font-bold'>Numan Naeem.</h1>
              <div className='text-lg mt-7 md:max-w-3xl text-white'>
                <p>
                  A {Math.floor(age)}
                  <span
                    style={{ fontFamily: 'monospace' }}
                    className='text-sm font-light'
                  >
                    {age.slice(2)}
                  </span>{' '}
                  year-old software developer interested in all things coding.
                  <br />I completed my Bachelor's degree in Computer Science at{' '}
                  <CustomLink
                    target={'_blank'}
                    className={'text-[#f4b93f] after:bg-[#f4b93f]'}
                    to='https://nitte.edu.in/nmamit/'
                  >
                    NMAMIT, Nitte
                  </CustomLink>{' '}
                  and I'm currently a Software Engineer at{' '}
                  <CustomLink
                    target={'_blank'}
                    className={'text-[#01a982] after:bg-[#01a982]'}
                    to='https://www.hpe.com/'
                  >
                    Hewlett Packard Enterprise
                  </CustomLink>
                  .
                </p>
                <p className='mt-5'>
                  I love The Strokes, playing chess, and taking pictures of the
                  clouds.
                </p>
                <button
                  className='rounded-lg text-lg font-semibold mt-6 border-2 w-fit py-2 px-3 transition-colors hover:text-gray-900 text-primary button-grow after:bg-primary border-primary'
                  onClick={() =>
                    window.open(`https:${data.contentfulPdf.pdf.file.url}`)
                  }
                >
                  View Résumé
                </button>
              </div>
            </div>
          </div>
        </Fade>
        <div className='text-lg'>
          <Fade delay={200}>
            <hr className='my-8 border-gray-600/50' />
          </Fade>
          <Fade delay={400} cascade top>
            <Contact />
          </Fade>
        </div>
        {/* <Fade delay={400} duration={500} top> */}
        <div className='mt-3 md:mt-6 flex justify-end'>
          <ArrowBtn dir={'right'} to='/projects' />
        </div>
        {/* </Fade> */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    contentfulPdf(title: { eq: "Numan_Resume" }) {
      pdf {
        file {
          url
        }
      }
    }
  }
`

export default About
