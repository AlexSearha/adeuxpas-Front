// Import React Library
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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
import MyAccount from '../../pages/MyAccount/MyAccount';

// Import Redux
import { useAppSelector } from '../../hooks/redux';

// Import CSS
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

function App() {
  const isLogged = useAppSelector((state) => state.user.isLogged);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="fr"
          localeText={
            frFR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          {' '}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/searchresults" element={<SearchResults />} />
              <Route
                path="/myaccount"
                element={isLogged ? <MyAccount /> : <Navigate to="/" />}
              />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
