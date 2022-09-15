import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import ArrowBtn from '../components/ArrowBtn'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {Fade} from 'react-reveal'

const About = ({data}) => {
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
            <StaticImage
              class='border-4 w-64 rounded-xl shrink-0 basis-96 object-top md:basis-72  border-primary'
              layout='constrained'
              src='../images/portrait.jpg'
              alt='Me!'
              aspectRatio={3 / 4.5}
              placeholder='dominantColor'
            />
            <div>
              <h1 className=' mb-3 font-light'>hi, I'm</h1>
              <h1 className=' font-bold'>Numan Naeem.</h1>
              <div className='text-lg mt-7 text-white'>
                <p>
                  A 21 year-old web developer interested in all things coding.
                  Currently pursuing my Bachelor's degree in CS Engineering.
                  Though I'm comfortable building full-stack applications for the
                  web, my primary interest is in UI Design and experimenting with
                  the latest trends in front-end development.
                </p>
                <p className='mt-5'>
                  When I'm bored, you'll find me playing Chess, taking photos of
                  the sky, or watching the most random videos on YouTube.
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
          <Fade delay={400}>
          <hr className='mb-9 border-gray-600/50' />
            <h3 className='mt-7 mb-4 text-2xl font-semibold'>
              a (very) brief history
            </h3>
          </Fade>
          <Fade delay={700} cascade top>
          <ul className='list-disc space-y-2 list-inside text-lg'>
            <li>
              Born on the 23<sup>rd</sup> of February, 2001, in Riyadh, Saudi
              Arabia 🇸🇦.
            </li>
            <li>
              Lived in Saudi Arabia for the next 15 years. Changed schools a few
              times, but spent the most time at{' '}
              <CustomLink target='_blank' to='https://alyasmin.edu.sa/'>
                Al&#8209;Yasmin&nbsp;Int'l&nbsp;School,&nbsp;Riyadh
              </CustomLink>
              .
            </li>
            <li>
              Moved to Kerala, India for my 11th and 12th grade. This was about
              the time I realized that I loved to code.
            </li>
            <li>
              It's{' '}
              {new Date(Date.now()).toLocaleString('default', {
                day: '2-digit',
                month: 'long'
              })}
              <sup>{superscript(new Date(Date.now()).getDate())}</sup>,{' '}
              {new Date(Date.now()).getFullYear()}, and I'm in my fourth year of
              CS engineering at{' '}
              <CustomLink target={'_blank'} to='https://nmamit.nitte.edu.in'>
                NMAMIT, Karnataka
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
    contentfulPdf(title: { eq: "Resume" }) {
      pdf {
        file {
          url
        }
      }
    }
  }
`

export default About
