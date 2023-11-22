// LAYOUTS
import Banner from '../components/Banner/Banner';
import SearchForm from '../components/Forms/SearchForm/SearchForm';
// CSS
import './style.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function Home() {
  return (
    <div className="homepage">
      <Banner />
      <div className="banner-searchform">
        <div className="banner-searchform__content">
          <SearchForm />
          <h2 className="banner-searchform__phrase">
            &quot;àdeuxpas est une application innovante qui vous propose des
            destinations en fonction de vos activités préférées et vous guide
            vers les meilleurs restaurants, hôtels et supermarchés à proximité
            pour une expérience de voyage inoubliable alors n&apos;attendez plus
            et laissez vous surprendre !&quot;
          </h2>
        </div>
      </div>
    </div>
  );
}
export default Home;
