import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from "prop-types"
import { FaChevronLeft, FaChevronRight, FaHome } from 'react-icons/fa'

const ArrowBtn = ({ dir, to }) => {
  return dir === 'left' ? (
    <button
      className='flex gap-2 items-center rounded-lg text-lg font-semibold border overflow-hidden w-fit p-3 transition-colors  hover:text-gray-900 text-secondary button-grow button-left after:bg-secondary border-secondary'
      onClick={() => navigate('/')}
    >
			<FaChevronLeft />
      Home
    </button>
  ) : (
    <button
      className='flex gap-2 items-center rounded-lg text-lg font-semibold border overflow-hidden w-fit p-3 transition-colors  hover:text-gray-900 text-secondary button-grow after:bg-secondary border-secondary'
      onClick={() => navigate(to)}
    >
      {to.substring(1)[0].toUpperCase() + to.substring(2)}
			{/* <img src='/svgs/chevron-right.svg' alt='arrow-right' /> */}
			<FaChevronRight />
    </button>
  )
}

ArrowBtn.propTypes = {
	to : PropTypes.string
}

export default ArrowBtn
