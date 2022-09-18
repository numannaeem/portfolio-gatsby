import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import CustomLink from '../components/CustomLink'
import React from 'react'
import ArrowBtn from '../components/ArrowBtn'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { FaGithub } from 'react-icons/fa'
import colors from '../colors'
import { Fade } from 'react-reveal'

const styles = tag => {
  return `${colors[tag]?.text || 'text-white'} ${colors[tag]?.bg || 'bg-black'}`
}

const Projects = ({ data }) => {
  return (
    <Layout>
      <Seo title='projects' />
      <div className='grow gap-10 mt-5 px-5 flex flex-col self-center w-full md:w-5/6 lg:w-3/4 xl:w-2/3'>
        <div className='flex flex-col gap-6 md:gap-10'>
          <h2 className='text-xl mb-3 md:mb-0'>
            A <sup className='text-base'>limited</sup> selection of projects
            that I've enjoyed working on. To see more, head over to my{' '}
            <CustomLink
              target={'_blank'}
              to='https://github.com/numannaeem'
              classes={'text-gray-300 after:bg-gray-300'}
            >
              Github&nbsp;profile
            </CustomLink>
            !
          </h2>
          {data.allContentfulProject.nodes.map((node, i) => (
            <div
              key={i}
              className={`flex flex-col md:gap-3 md:mb-3 border-2 ${i%3 === 0 ? 'border-primary' : i%3 === 1 ? 'border-tertiary' : 'border-secondary'} overflow-hidden md:border-0 md:overflow-visible rounded-xl`}
              >
            <Fade top>
              <div className='flex flex-col gap-4 bg-gray-700/40 p-4 md:border-2 border-tertiary md:rounded-lg '>
                <div className={`flex flex-wrap gap-2 justify-start items-end`}>
                  <CustomLink
                    target={'_blank'}
                    to={node.link}
                    classes={`${i%3 === 0 ? 'text-primary after:bg-primary' : i%3 === 1 ? 'text-tertiary after:bg-tertiary' : 'text-secondary after:bg-secondary'}`}
                    className='font-bold w-fit text-2xl md:text-3xl md:text-tertiary md:after:bg-tertiary'
                    >
                    {node.title}
                  </CustomLink>
                  <button
                    title='Repo Link'
                    className='repo-link ml-2 w-fit hover:text-white text-gray-300 text-2xl hover:-translate-y-1  transition-all'
                    onClick={e => {
                      e.stopPropagation()
                      window.open(node.repoLink, '_blank')
                    }}
                    >
                    <FaGithub />
                  </button>
                  <span
                    className='font-normal w-full md:w-auto text-sm italic text-gray-300'
                    title='Work In Progress'
                    >
                    ({node.completed ? `completed ${node.date}` : 'WIP'})
                  </span>
                </div>
                <div className={`flex gap-2 flex-wrap`}>
                  {node.tags.map(tag => (
                    <span
                    key={tag}
                    className={`px-2 text-sm py-1 rounded-md ${styles(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
                  </Fade>
              <div
                className={`flex flex-col ${
                  i % 2 ? 'md:flex-row' : 'md:flex-row-reverse'
                }  md:gap-3`}
              >
               <Fade left={i%2} right={!(i%2)}>
                 <div className='shrink-0 border-primary md:border-2 self-stretch flex flex-col w-full md:w-5/12 md:rounded-lg  overflow-hidden'>
                   <GatsbyImage
                     className='h-full'
                     alt={node.title}
                     image={node.image.gatsbyImageData}
                   />
                 </div>
               </Fade>
               <Fade right={i%2} left={!(i%2)}>
                 <div className='p-4 text-justify text-lg leading-normal border-secondary md:border-2 bg-gray-700/50 md:rounded-lg md:p-4 flex-col'>
                   <p>{node.description.description}</p>
                 </div>
               </Fade>
              </div>
            </div>
          ))}

        </div>

        <div className='mt-auto flex justify-between'>
          <ArrowBtn dir={'left'} to='/about' />
          <ArrowBtn dir={'right'} to='/contact' />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulProject(sort: { fields: date, order: DESC }) {
      nodes {
        title
        date(formatString: "MMM YYYY")
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
        tags
        completed
        link
        repoLink
      }
    }
  }
`

export default Projects
