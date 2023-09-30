import '../styles/globals.css';
import LayoutDashboard from '../layout/main';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
// return <Component {...pageProps} />
  return router.pathname.substring(0,5)=="/main" ? <LayoutDashboard> <Component {...pageProps}/> </LayoutDashboard> : <Component {...pageProps} />
}

export default MyApp
