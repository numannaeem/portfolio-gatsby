import React from 'react'
import ArrowBtn from '../components/ArrowBtn'
import CustomLink from '../components/CustomLink'
import Layout from '../components/layout'
import Seo from '../components/seo'
import {FaRegEnvelope, FaLinkedinIn, FaGithub, FaInstagram} from 'react-icons/fa'

const socials = () => {
	const links = [
		{
			to: 'mailto:dev@numxn.me',
			classes: 'text-sky-300 after:bg-sky-300',
			name: 'dev@numxn.me',
      icon: <FaRegEnvelope />
		},
		{
      to: 'https://instagram.com/num4n_',
      classes: 'text-purple-300 after:bg-purple-300',
      name: '@num4n_',
      icon: <FaInstagram />
    },
    {
      to: 'https://linkedin.com/in/numxn',
      classes: 'text-blue-300 after:bg-blue-300',
      name: 'Numan Naeem',
      icon: <FaLinkedinIn />
    },
    {
      to: 'https://github.com/numannaeem',
      classes: 'text-gray-300 after:bg-gray-300',
      name: 'numannaeem',
      icon: <FaGithub />
    },
  ]

  return (
    <Layout>
      <Seo title='contact' />
      <div className='grow gap-4 mt-5 px-5 flex flex-col self-center w-full lg:w-2/3'>
        <h2 className='text-xl'>
          Have an exciting project in mind, or just wanna have a chat? Find me
          below!
        </h2>
        <ul className='font-semibold text-base'>
          {links.map(link => (
						<li key={link.name} className=" text-lg mb-2">
							<CustomLink target={"_blank"} className="flex gap-2 items-center w-fit" to={link.to} classes={link.classes}>{link.icon}{link.name}</CustomLink>
						</li>
					))}
        </ul>
        <button className='rounded-lg text-lg font-semibold border-2 w-fit py-2 px-3 transition-colors  hover:text-gray-900 text-primary button-grow after:bg-primary border-primary' onClick={() => window.open('./resources/Numan_Naeem_Resume.pdf')}>View Résumé</button>
        <div className='mt-auto flex justify-between'>
          <ArrowBtn dir={"left"} to='/projects' />
          <ArrowBtn dir={"right"} to='/about' />
        </div>
      </div>
    </Layout>
  )
}

export default socials
