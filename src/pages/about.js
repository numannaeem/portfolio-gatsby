import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'

const About = () => {
  return (
    <Layout>
      <Seo title='about' />
      <div className='gap-5 mt-5 px-5 flex flex-col self-center container md:w-2/3'>
        <div className='text-4xl text-secondary flex flex-col md:flex-row items-start md:items-end gap-5'>
          <StaticImage
            class='border-4 border-primary'
            layout='constrained'
            src='../images/portrait.jpg'
            aspectRatio={3 / 4}
            placeholder='tracedSVG'
            height={250}
          />
          <div>
            <h1 className=' mb-3 font-light'>hi, I'm</h1>
            <h1 className=' font-bold'>Numan Naeem.</h1>
          </div>
        </div>
        <div className='text-xl'>
          <p>
            A 21-year old web developer who's interested in all things coding.
            Currently pursuing my Bachelor's degree in CS Engineering, in India.
            Though I'm comfortable building full-stack applications for the web,
            my primary interest is in UI Design and exploring the latest trends
            in front-end development. This website you're on right now was built
            using{' '}
            <CustomLink target={'_blank'} to='https://gatsbyjs.org'>
              GatsbyJS
            </CustomLink>
            !
          </p>
					<br />
          <p>
            When I'm bored, you'll find me playing Chess, listening to music, or watching the most random videos on YouTube.
          </p>
					<br /><br />
					<h3 className='text-2xl font-semibold'>A brief history</h3>
        </div>
      </div>
    </Layout>
  )
}

export default About
