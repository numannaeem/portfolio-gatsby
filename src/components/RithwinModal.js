import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Fade } from 'react-reveal'

function RithwinModal () {
  const data = useStaticQuery(graphql`
    query RithwinQuery {
      allContentfulPdf(filter: { pdf: { title: { regex: "/Rithwin/" } } }) {
        edges {
          node {
            pdf {
              url
              title
            }
          }
        }
      }
    }
  `)

  

  return (
    <Fade duration={600}>
      <div className='md:p-5 p-4 flex flex-col'>
        <p className='mb-2 text-2xl font-semibold text-secondary'>
          Hi Rithwin 👋
        </p>
        <p className='mb-4 text-lg '>What do you want to download?</p>
        <div className='flex flex-wrap gap-3'>
          {data.allContentfulPdf.edges.map(({ node }) => (
            <button
            key={node.pdf.title}
              onClick={() => window.open(node.pdf.url)}
              className='text-start text-lg bg-gray-700 basis-[45%] grow hover:bg-gray-600 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-md px-4 py-3 capitalize'
            >
              {node.pdf.title.split('_').slice(1).join(' ')}
            </button>
          ))}
        </div>
      </div>
    </Fade>
  )
}

export default RithwinModal
