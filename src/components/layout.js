/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'

export const CursorContext = React.createContext('dog')

const Layout = ({ children }) => {

  const [cursor, setCursor] = React.useState(
    window?.localStorage?.getItem('cursor') || 'default'
  )

  return (
    <CursorContext.Provider value={{ cursor, setCursor: (option) => {
      localStorage.setItem('cursor', option)
      setCursor(option)
    } }}>
      <div
        style={ cursor !== 'default' ? {
          cursor: `url(svgs/${cursor}.svg) 16 16, auto`
        } : {}}
        className='bg-gray-900 text-white flex flex-col min-h-screen'
      >
        <Navbar />
        <div className='flex flex-col content-center grow'>
          {children}
        </div>
        <footer className='pt-[3rem] text-gray-300 text-center  my-8'>
          © {new Date(Date.now()).getFullYear()} • because every website needs a footer
        </footer>
      </div>
    </CursorContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
