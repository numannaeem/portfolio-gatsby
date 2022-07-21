import { Link } from 'gatsby'
import PropTypes from "prop-types"
import React from 'react'

const CustomLink = ({to, children, target, classes, className}) => {
	if(target === "_blank") {
		console.log('here');
		return (
			<a target={target} className={`${className || ''} link-grow ${classes}`} href={to}>{children}</a>
		)
	}
	return (
		<Link target={target} className={`${className || ''} link-grow ${classes}`} to={to}>{children}</Link>
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