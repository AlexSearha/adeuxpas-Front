// REACT
import Box from '@mui/material/Box';
import { InputBase } from '@mui/material';
// CSS
import './styles.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function Form() {
  return (
    <div className="form">
      <p className="form__subtitle">
        Entrez votre adresse et partez en weekend à moins de 200km!
      </p>
      <Box
        component="form"
        sx={{
          '& .MuiInputBASE-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="on"
      >
        <div className="form__fields">
          <InputBase
            id="outlined-search"
            placeholder="Adresse"
            defaultValue="Chez oim"
            type="search"
            sx={{
              border: '1px solid white',
              borderRadius: '2px',
              color: 'white',
              margin: '10px',
            }}
          />
          <InputBase
            required
            id="outlined-required"
            placeholder="Catégorie"
            defaultValue="Près de la mer"
            sx={{
              border: '1px solid white',
              borderRadius: '2px',
              color: 'white',
              margin: '10px',
              // InputLabelProps={{
              //   shrink: true,
              // }}
            }}
          />
          <InputBase
            required
            id="outlined-required"
            placeholder="Activité"
            defaultValue="Sports"
            sx={{
              border: '1px solid white',
              borderRadius: '2px',
              color: 'white',
              margin: '10px',
            }}
          />

          <InputBase
            required
            id="outlined-required"
            placeholder="Départ"
            defaultValue="aujourd'hui"
            sx={{
              border: '1px solid white',
              borderRadius: '2px',
              color: 'white',
              margin: '10px',
            }}
          />
          <InputBase
            required
            id="outlined-required"
            placeholder="Retour"
            defaultValue="demain"
            sx={{
              border: '1px solid white',
              borderRadius: '2px',
              color: 'white',
              margin: '10px',
            }}
          />
          <InputBase
            required
            id="outlined-required"
            placeholder="Nombre de personnes"
            defaultValue="1"
            sx={{
              border: '1px solid white',
              borderRadius: '2px',
              color: 'white',
              margin: '10px',
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default Form;
