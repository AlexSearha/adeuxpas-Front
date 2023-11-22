// REACT
import { useEffect } from 'react';
// MUI
import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material';
// DayJS
import 'dayjs/locale/fr';
import AppRouter from '../../routes/AppRouter';
// REDUX
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGetTokenValidityMutation } from '../../store/queries/queries-auth';
import { updateUserInformations } from '../../store/reducers/user';
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
  const { isLogged } = useAppSelector((state) => state.userInformationsReducer);
  const [
    fetchTokenValidity,
    { data: fetchTokenDatas, isSuccess: fetchTokenSuccess },
  ] = useGetTokenValidityMutation();
  const dispatch = useAppDispatch();

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (!isLogged) {
      setTimeout(() => {
        fetchTokenValidity();
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  useEffect(() => {
    if (fetchTokenSuccess && !isLogged) {
      dispatch(updateUserInformations({ ...fetchTokenDatas, isLogged: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTokenSuccess]);

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
