import { Header } from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import './NotFoundPage.css'

export function NotFoundPage() {
  return(
    <>
      <title>404 Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header />

      <div className='not-found-message'>
        Error 404: Page not found <FontAwesomeIcon icon={faRobot} />
      </div>
    </>
  )
}