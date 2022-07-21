import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const ProjectCard = ({img}) => {
	return (
		<div>
			<StaticImage src={img} />
		</div>
	)
}

export default ProjectCard