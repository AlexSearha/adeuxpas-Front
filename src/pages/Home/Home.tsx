import React from 'react';
import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import Banner from '../../components/Banner/Banner';
import './style.scss';

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
