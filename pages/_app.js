import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import MainLayout from 'components/ui/layout.main';

import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The smelly cats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="The homepage of the smelly cats, the greatest band in the whole world"/>
        <meta name="keywords" content="Music, shows, smelly cats"/>
        <meta name="author" content="The smelly cats"/>
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}

export default MyApp
