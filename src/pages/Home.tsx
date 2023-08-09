import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import SearchForm from '../components/Forms/SearchForm/SearchForm';
import Header from '../components/Header/Header';
import './style.scss';

function Home() {
  return (
    <>
      <Header />
      <div className="homepage">
        <Banner />
        <div className="banner-searchform">
          <div className="banner-searchform__content">
            <h2 className="banner-searchform__phrase">
              &quot;àdeuxpas est une application innovante qui vous propose des
              destinations en fonction de vos activités préférées et vous guide
              vers les meilleurs restaurants, hôtels et supermarchés à proximité
              pour une expérience de voyage inoubliable alors n&apos;attendez
              plus et laissez vous surprendre !&quot;
            </h2>
            <SearchForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;
