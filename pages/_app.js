import React from 'react';
import { toast, ToastContainer } from "react-toastify";
import GlobalProvider from '../contexts/GlobalContext';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

import "../styles/globals.css";
import "../styles/Table.css";
import "../styles/Toggle.css";
import "../styles/Loading.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
        <Footer />
        <Loading/>
      </GlobalProvider>
    </>
  );
}

export default MyApp;