// REACT
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// MUI
import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material';
// DayJS
import 'dayjs/locale/fr';
// LAYOUTS
import Home from '../../pages/Home';
import ContactPage from '../../pages/Contact/ContactPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MyAccount from '../MyAccount/MyAccount';
import SearchResults from '../../pages/SearchResults/SearchResults';
// CSS
import './App.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#111316',
      contrastText: '#faf9f6',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#282c34',
    },
  },
});

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <main>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="fr"
            localeText={
              frFR.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            {' '}
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/searchresults" element={<SearchResults />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </BrowserRouter>
            <Footer />
          </LocalizationProvider>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
