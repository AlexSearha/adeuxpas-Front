// REACT
import { useEffect } from 'react';
// MUI
import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material';
// COOKIES
// DayJS
import 'dayjs/locale/fr';
import AppRouter from '../../routes/AppRouter';
// REDUX
import { useAppSelector } from '../../hooks/redux';
// CSS
import './App.scss';
import { useLazyGetTokenValidityQuery } from '../../store/queries/queries-auth';

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
  const userId = useAppSelector((state) => state.userInformationsReducer.id);
  const [fetchTokenValidity] = useLazyGetTokenValidityQuery();

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (!userId) {
      fetchTokenValidity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
            <AppRouter />
          </LocalizationProvider>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
