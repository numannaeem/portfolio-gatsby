import { graphql, navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import CustomLink from '../components/CustomLink'
import React from 'react'
import ArrowBtn from '../components/ArrowBtn'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { FiGithub } from 'react-icons/fi'

const Projects = ({ data }) => {
  return (
    <Layout>
      <Seo title='projects' />
      <div className='grow gap-10 mt-5 px-5 flex flex-col self-center w-full lg:w-2/3'>
        <div className='flex flex-col gap-5'>
          <h2 className='text-xl mb-4'>
            A <sup className='text-base'>limited</sup> selection of projects
            that I enjoyed working on. To see more, head over to my{' '}
            <CustomLink
            target={"_blank"}
              to='https://github.com/numannaeem'
              classes={'text-gray-300 after:bg-gray-300'}
            >
              Github&nbsp;profile
            </CustomLink>
            !
          </h2>
          {data.allContentfulProject.nodes.map(node => (
            <div
              onClick={e => {
                window.open(node.link, '_blank')
              }}
              className='group cursor-pointer flex flex-col md:flex-row gap-3 bg-gray-800 p-2 md:p-3 rounded-2xl'
            >
              <div className='shrink-0 w-full md:w-6/12 rounded-xl overflow-hidden'>
                <GatsbyImage
                  class='w-full h-full transition-transform group-hover:scale-105 duration-[400ms] shrink-0rounded-xl overflow-hidden'
                  image={node.image.gatsbyImageData}
                />
              </div>
              <div className='flex gap-4 md:gap-6 p-2 md:p-4 flex-col'>
                <CustomLink
                  to={node.link}
                  classes={'text-tertiary after:bg-tertiary'}
                  className='font-bold w-fit text-2xl'
                >
                  {node.title}
                </CustomLink>
                <p className='leading-relaxed'>
                  {node.description.description}
                </p>
                {/* <div className='flex gap-6 '> */}
                <button
                  title='Repo Link'
                  className='repo-link z-10 w-fit pt-2 mt-auto text-gray-300 text-4xl hover:-translate-y-1  transition-transform'
                  onClick={e => {
                    e.stopPropagation()
                    window.open(node.repoLink, '_blank')
                  }}
                >
                  <FiGithub />
                </button>
                {/* <a target={"_blank"} title='Website' className='text-tertiary text-4xl hover:-translate-y-1 transition-transform' href={node.link}> <FiLink /></a> */}
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-auto flex justify-between'>
          <ArrowBtn dir={'left'} />
          <ArrowBtn dir={'right'} to='/contact' />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProject {
      nodes {
        title
        link
        repoLink
        description {
          description
        }
        image {
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            aspectRatio: 1.6
            layout: FULL_WIDTH
          )
        }
      }
    }
  }
`

export default Projects
