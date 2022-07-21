import { Link } from 'gatsby'
import PropTypes from "prop-types"
import React from 'react'

const CustomLink = ({to, children, target, classes, className}) => {
	return (
		<Link target={target} className={`${className} link-grow ${classes}`} to={to}>{children}</Link>
	)
}

CustomLink.defaultProps = {
	target: "_self",
	classes: 'text-tertiary after:bg-tertiary'
}

CustomLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string.isRequired,
}

export default CustomLink