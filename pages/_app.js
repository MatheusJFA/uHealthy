import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import "../styles/Table.css";


toast.configure();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={5000}
        newestOnTop={true}
        pauseOnFocusLoss
        pauseOnHover
        closeOnClick={false}
        draggable={false}
        rtl={false} />
    </>
  );

}

export default MyApp;
