// LAYOUTS
import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import Banner from '../../components/Banner/Banner';
// CSS
import './style.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function Home() {
  return (
    <div className="home">
      <Banner />
      <div className="home__form">
        <SearchForm />
      </div>
    </div>
  );
}
export default Home;
