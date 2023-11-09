import '@/styles/globals.css';
import '@/styles/login.css';
import '@/styles/main.css';
import Head from 'next/head';
import '@/styles/newitem.css';
import '@/styles/datatable.css';
import '@/styles/loader.css';
import '@/styles/customerList.module.css'
import '@/styles/test.css';


export default function App({ Component, pageProps }) {
  return (
    <>
     
      <Component {...pageProps} />
    </>

  )


}
