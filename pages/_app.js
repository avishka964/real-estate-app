import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import '../styles/globals.css'
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
