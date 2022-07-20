import { Link } from 'gatsby'
import PropTypes from "prop-types"
import React from 'react'

const CustomLink = ({to, children, target}) => {
	return (
		<Link target={target} className='link-grow text-tertiary after:bg-tertiary' to={to}>{children}</Link>
	)
}

CustomLink.defaultProps = {
	target: "_self"
}

CustomLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default CustomLink