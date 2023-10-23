// REACT
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// OUTLETS
import Home from '../pages/Home';
import MyAccount from '../components/MyAccount/MyAccount';
import SearchResults from '../pages/SearchResults/SearchResults';
import ContactPage from '../pages/Contact/ContactPage';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
