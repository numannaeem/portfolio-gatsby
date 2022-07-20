import { Link } from 'gatsby'
import * as React from 'react'
import Lottie from 'react-lottie'

import Layout from '../components/layout'
import Seo from '../components/seo'
import animationData from '../lotties/pageNotFound.json'

const NotFoundPage = () => (
  <Layout>
    <Seo title='404: Not found' />
    <div className='flex flex-col gap-3 my-auto text-center'>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          },
        }}
        width={"80%"}
        height={400}
      />
      <h1 className='mt-5 font-semibold text-xl md:text-2xl text-primary'>What on earth are you doing here?</h1>
      <p className='px-4 text-lg text-gray-200 font-light'>This page doesn't exist, but worry not! <Link className='hover:underline text-yellow-200' to='/'>Go Home</Link></p>
    </div>
  </Layout>
)

export default NotFoundPage
