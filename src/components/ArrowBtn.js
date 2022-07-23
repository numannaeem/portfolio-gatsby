import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const ArrowBtn = ({ dir, to }) => {
  return dir === 'left' ? (
    <Link
      className='flex gap-2 items-center rounded-lg text-lg font-semibold border overflow-hidden w-fit p-3 transition-colors  hover:text-gray-900 text-secondary button-grow button-left after:bg-secondary border-secondary'
      to='/'
    >
      <FaChevronLeft />
      Home
    </Link>
  ) : (
    <Link
      className='flex gap-2 items-center rounded-lg text-lg font-semibold border overflow-hidden w-fit p-3 transition-colors  hover:text-gray-900 text-secondary button-grow after:bg-secondary border-secondary'
      to={to}
    >
      {to.substring(1)[0].toUpperCase() + to.substring(2)}
      {/* <img src='/svgs/chevron-right.svg' alt='arrow-right' /> */}
      <FaChevronRight />
    </Link>
  )
}

ArrowBtn.propTypes = {
  to: PropTypes.string
}

export default ArrowBtn
