// REACT
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// OUTLETS
import Home from '../pages/Home';
import MyAccount from '../components/MyAccount/MyAccount';
import SearchResults from '../pages/SearchResults/SearchResults';
import ContactPage from '../pages/Contact/ContactPage';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import PersonnalsInformations from '../pages/MyAccount/PersonnalInformations/PersonnalsInformations';
import Favoris from '../pages/MyAccount/Favoris/Favoris';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import NotificationsPage from '../pages/MyAccount/Notifications/NotificationsPage';

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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myaccount/infos" element={<PersonnalsInformations />} />
          <Route path="/myaccount/favoris" element={<Favoris />} />
          <Route
            path="/myaccount/notifications"
            element={<NotificationsPage />}
          />
          <Route
            path="/myaccount/security"
            element={<PersonnalsInformations />}
          />
          <Route
            path="/myaccount/notifications"
            element={<PersonnalsInformations />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
