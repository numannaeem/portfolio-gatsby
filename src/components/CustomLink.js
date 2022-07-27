import AniLink from 'gatsby-plugin-transition-link/AniLink';
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
		<AniLink
		bg="#b0e7fd"
		cover
		direction="up"
		duration={0.5}
		target={target} className={`${className || ''} link-grow ${classes}`} to={to}>{children}</AniLink>
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