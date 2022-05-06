import '../styles/globals.css'
import React from 'react'
import Layout from '../components/Layout'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster/>
      <Component {...pageProps} />
    </Layout>
  )
  
}

export default MyApp
