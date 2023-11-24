// REACT
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// CSS
import './styles.scss';
import { useAppSelector } from '../../hooks/redux';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function Footer() {
  const isLogged = useAppSelector(
    (state) => state.userInformationsReducer.isLogged
  );
  return (
    <footer className="footer">
      <div className="footer__navigation">
        <div className="footer__links-left">
          <ul>
            {isLogged ? (
              <li>
                <a href="/wishlist">Ma wishlist</a>
              </li>
            ) : null}
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about">A propos</a>
            </li>
          </ul>
        </div>
        <div className="footer__links-right">
          <ul>
            <li>
              <a href="/help">Aide</a>
            </li>
            <li>
              <a href="/privacy">Confidentialité</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__social">
        <a href="https://www.facebook.com">
          <FacebookIcon />
        </a>
        <a href="https://www.twitter.com">
          <TwitterIcon />
        </a>
        <a href="https://www.instagram.com">
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
