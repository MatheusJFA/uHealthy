import React from 'react';
import { toast, ToastContainer } from "react-toastify";

import Footer from '../components/Footer';

import "../styles/globals.css";
import "../styles/Table.css";
import "../styles/Toggle.css";
import "react-toastify/dist/ReactToastify.css";

import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";

toast.configure();

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#EF4444" height="100" width="100" />
    </div>
}

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Component {...pageProps} />
        <LoadingIndicator />
        <Footer />
    </>
  );
}

export default MyApp;