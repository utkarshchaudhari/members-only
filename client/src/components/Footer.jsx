import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <p className="footer__details font__medium">
        Made with{' '}
        <FontAwesomeIcon icon={faHeart} style={{ color: '#dc2626' }} /> by
        Utkarsh Chaudhari.{' '}
        <a
          href="https://github.com/utkarshchaudhari/members-only"
          target="_blank"
          rel="noreferrer"
          className="footer__github"
        >
          GitHub <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </footer>
  );
}

export default Footer;
