import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import CustomLink from '../components/CustomLink'
import React from 'react'
import ArrowBtn from '../components/ArrowBtn'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { FaGithub } from 'react-icons/fa'

const colors = {
  'react.js': {
    bg: 'bg-[#282c34]',
    text: 'text-[#61dafb]'
  },
  'node.js': {
    bg: 'bg-[#026e00]',
    text: 'text-[#ffffff]'
  },
  'material-ui': {
    bg: 'bg-[#001e3c]',
    text: 'text-[#5297f7]'
  },
  'contentful CMS': {
    bg: 'bg-[#163bb7]',
    text: 'text-[#ffffff]'
  },
  'semantic-ui': {
    bg: 'bg-[#61bab2]',
    text: 'text-[#ffffff]'
  },
  'socket.io': {
    bg: 'bg-[#000000]',
    text: 'text-[#ffffff]'
  },
  tailwind: {
    bg: 'bg-[#0c111f]',
    text: 'text-[#62baf2]'
  },
  mongoDB: {
    bg: 'bg-[#116149]',
    text: 'text-[#6ce975]'
  },
  bootstrap: {
    bg: 'bg-[#6d36f0]',
    text: 'text-[#ffffff]'
  },
  'gatsby.js': {
    bg: 'bg-[#f4edf9]',
    text: 'text-[#9a5ae8]'
  },
  'next.js': {
    bg: 'bg-[#ffffff]',
    text: 'text-black'
  }
}

const textColor = tag => {
  return colors[tag].text
}

const bgColor = tag => {
  return colors[tag].bg
}

const Projects = ({ data }) => {
  return (
    <Layout>
      <Seo title='projects' />
      <div className='grow gap-10 mt-5 px-5 flex flex-col self-center w-full md:w-5/6 lg:w-3/4 xl:w-2/3'>
        <div className='flex flex-col gap-6 md:gap-8'>
          <h2 className='text-xl mb-3'>
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
              className='flex flex-col gap-2 md:gap-4 md:mb-3 rounded-2xl'
            >
              <div className='flex flex-col gap-4 bg-gray-700/40 p-4 border-2 border-tertiary rounded-lg '>
                <div className={`flex flex-wrap gap-2 justify-start items-end`}>
                  <CustomLink
                    target={'_blank'}
                    to={node.link}
                    classes={'text-tertiary after:bg-tertiary'}
                    className='font-bold w-fit text-2xl md:text-3xl'
                  >
                    {node.title}
                  </CustomLink>
                  <button
                    title='Repo Link'
                    className='repo-link z-10 md:ml-2 w-fit text-gray-300 text-2xl hover:-translate-y-1  transition-transform'
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
                      className={`px-2 text-sm py-1 rounded-md ${bgColor(
                        tag
                      )} ${textColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  i % 2 ? 'md:flex-row' : 'md:flex-row-reverse'
                }  gap-2 md:gap-4`}
              >
                <div className='shrink-0 border-primary border-2 self-stretch flex flex-col w-full md:w-5/12 rounded-lg  overflow-hidden'>
                  <GatsbyImage
                    className='h-full'
                    alt={node.title}
                    image={node.image.gatsbyImageData}
                  />
                </div>
                <div className='p-4 text-justify text-lg leading-normal border-secondary border-2 bg-gray-700/50 rounded-lg md:p-4 flex-col'>
                  <p>{node.description.description}</p>
                </div>
              </div>
              <hr
                className={`${
                  i < data.allContentfulProject.nodes.length - 1
                    ? 'block'
                    : 'hidden'
                } md:hidden mt-4 border-gray-500/50`}
              />
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
