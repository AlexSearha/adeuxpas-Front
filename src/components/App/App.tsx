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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserInformations } from '../../store/reducers/user';
import { useLazyGetTokenValidityQuery } from '../../store/queries/queries-auth';
// CSS
import './App.scss';
import { UserInformationsProps } from '../../@types';

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
  const isLogged = useAppSelector(
    (state) => state.userInformationsReducer.isLogged
  );
  const [fetchTokenValidity] = useLazyGetTokenValidityQuery();
  const dispatch = useAppDispatch();

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    async function regenAccessToken() {
      try {
        if (!isLogged) {
          const userInfos = await fetchTokenValidity();

          dispatch(
            updateUserInformations(
              userInfos.data as unknown as UserInformationsProps
            )
          );
        }
      } catch (err) {
        console.log('err: ', err);
      }
    }
    regenAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

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
