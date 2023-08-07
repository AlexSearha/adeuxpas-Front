// Import React Library
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import MUI Stuffs
import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material';

// Import DayJS
import 'dayjs/locale/fr';

// Import Page
import Home from '../../pages/Home';
import SearchResults from '../../pages/SearchResults/SearchResults';
import ContactPage from '../../pages/Contact/ContactPage';
import './App.scss';
import SearchResultPage from '../../pages/SearchResultPage/SearchResultPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MyAccount from '../MyAccount/MyAccount';

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
