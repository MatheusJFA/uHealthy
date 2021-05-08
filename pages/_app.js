import React from 'react';
import { toast, ToastContainer } from "react-toastify";

import Footer from '../components/Footer';

import "../styles/globals.css";
import "../styles/Table.css";
import "../styles/Toggle.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;