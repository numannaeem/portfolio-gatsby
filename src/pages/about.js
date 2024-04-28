import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import ArrowBtn from '../components/ArrowBtn'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Fade } from 'react-reveal'
import { FaArrowDown } from 'react-icons/fa'

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

  const superscript = i => {
    let j = i % 10,
      k = i % 100
    if (j === 1 && k !== 11) return 'st'
    if (j === 2 && k !== 12) return 'nd'
    if (j === 3 && k !== 13) return 'rd'
    return 'th'
  }

  return (
    <Layout>
      <Seo title='about' />
      <div className='grow gap-12 bg-gray-900 mt-5 px-5 flex flex-col self-center w-full lg:w-2/3'>
        <Fade>
          <div className='text-4xl text-secondary flex flex-col md:flex-row items-start md:items-end gap-9'>
            <div className=' md:w-72 w-64 absolute blur-3xl shrink-0 basis-96 object-top md:basis-72'>
              <StaticImage
                layout='constrained'
                src='../images/portrait_2.jpeg'
                aspectRatio={3 / 4.5}
                placeholder='none'
              />
            </div>
            <StaticImage
              class=' w-64 rounded-xl shrink-0 basis-96 object-top md:basis-72'
              layout='constrained'
              src='../images/portrait_2.jpeg'
              alt='Me!'
              aspectRatio={3 / 4.5}
              placeholder='dominantColor'
            />
            <div>
              <h1 className='mb-3 font-light'>hi, I'm</h1>
              <h1 className='font-bold'>Numan Naeem.</h1>
              <div className='text-lg mt-7 text-white'>
                <p>
                  A {Math.floor(age)}
                  <span
                    style={{ fontFamily: 'monospace' }}
                    className='text-sm font-light'
                  >
                    {age.slice(2)}
                  </span>{' '}
                  year-old software developer interested in all things coding.
                  <br />
                  Completed my Bachelor's degree in Computer Science at NMAMIT,
                  Nitte.
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
            <hr className='mb-9 border-gray-600/50' />
            <h3 className='mt-7 mb-4 text-2xl font-semibold'>
              a (very) brief history
            </h3>
          </Fade>
          <Fade delay={400} cascade top>
            <ul className='space-y-2 list-inside text-lg historyList'>
              <li>
                Born on the 23<sup>rd</sup> of February, 2001, in Riyadh, Saudi
                Arabia 🇸🇦.
              </li>
              <FaArrowDown className='text-gray-200/80' />
              <li>
                <b>*aimless existence*</b>
              </li>
              <FaArrowDown className='text-gray-200/80' />
              <li>
                It's the{' '}
                {new Date(Date.now()).toLocaleString('default', {
                  day: '2-digit'
                }) / 1}
                <sup>{superscript(new Date(Date.now()).getDate())}</sup> of{' '}
                {new Date(Date.now()).toLocaleString('default', {
                  month: 'long'
                })}
                , {new Date(Date.now()).getFullYear()}, and I'm a Software
                Developer Engineer at{' '}
                <CustomLink
                  target={'_blank'}
                  className={'text-[#01a982] after:bg-[#01a982]'}
                  to='https://www.hpe.com/'
                >
                  Hewlett Packard Enterprise
                </CustomLink>
                .
              </li>
            </ul>
          </Fade>
        </div>
        <div className='mt-auto flex justify-between'>
          <ArrowBtn dir={'left'} to='/contact' />
          <ArrowBtn dir={'right'} to='/projects' />
        </div>
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
