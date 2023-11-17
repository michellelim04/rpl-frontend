import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} draggable={false} containerId={1} key={1} limit={1} pauseOnFocusLoss={false} position='top-right' closeButton />
  </>
}
