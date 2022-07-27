import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const ArrowBtn = ({ dir, to }) => {
  return dir === 'left' ? (
    <AniLink
      duration={0.5}
      cover
      direction="right"
      bg="#FFA099"
      className='flex gap-2 items-center rounded-lg text-lg font-semibold border overflow-hidden w-fit p-3 transition-colors  hover:text-gray-900 text-secondary button-grow button-left after:bg-secondary border-secondary'
      to='/'
    >
      <FaChevronLeft />
      Home
    </AniLink>
  ) : (
    <AniLink
    duration={0.5}
      cover
      direction="left"
      bg="#FFA099"
      className='flex gap-2 items-center rounded-lg text-lg font-semibold border overflow-hidden w-fit p-3 transition-colors  hover:text-gray-900 text-secondary button-grow after:bg-secondary border-secondary'
      to={to}
    >
      {to.substring(1)[0].toUpperCase() + to.substring(2)}
      {/* <img src='/svgs/chevron-right.svg' alt='arrow-right' /> */}
      <FaChevronRight />
    </AniLink>
  )
}

ArrowBtn.propTypes = {
  to: PropTypes.string
}

export default ArrowBtn
