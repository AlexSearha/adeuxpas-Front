// REACT
import { Link } from 'react-router-dom';
// MUI
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// COMPONENTS
import EditModal from './EditModal/EditModal';
// REDUX
import { useAppSelector } from '../../../hooks/redux';
// CSS
import './style.scss';
import { useGetUserInfosQuery } from '../../../store/queries/queries-user';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function PersonnalsInformations() {
  const userId = useAppSelector((state) => state.userInformationsReducer.id);
  const { data } = useGetUserInfosQuery(userId);

  // ----------------------------FUNCTIONS------------------------------//

  const dateOfBirth = () => {
    if (data) {
      const [year, month, day] = data.dateofbirth.split('T')[0].split('-');
      return `${(parseInt(day, 10) + 1)
        .toString()
        .padStart(2, '0')}-${month}-${year}`;
    }
    return null;
  };

  // ----------------------------RETURN----------------------------------//

  return (
    <>
      <Link to="/myaccount">
        <ArrowBackIosIcon
          sx={{ color: 'black', marginLeft: '1.5rem', marginTop: '1rem' }}
        />
      </Link>
      <div className="infos-main">
        <h2>Informations Personnelles</h2>
        <div className="infos-main__content">
          <h5>Prénom</h5>
          <div className="infos-title__content">
            {data?.firstname ? `${data?.firstname}` : `Non renseigné`}
          </div>
          <EditModal
            label="Prénom"
            id="firstname"
            type="text"
            title="Prénom"
            propName="firstname"
            isDatePicker={false}
          />
        </div>

        <div className="infos-main__content">
          <h5>Nom</h5>
          <div className="infos-title__content">
            {data?.lastname ? `${data?.lastname}` : `Non renseigné`}
          </div>
          <EditModal
            label="Nom"
            id="lastname"
            type="text"
            title="Nom"
            propName="lastname"
            isDatePicker={false}
          />
        </div>

        <div className="infos-main__content">
          <h5>Email</h5>
          <div className="infos-title__content">
            {data?.email ? `${data?.email}` : `Non renseigné`}
          </div>
          <EditModal
            label="email"
            id="lastname"
            type="email"
            title="Email"
            propName="email"
            isDatePicker={false}
          />
        </div>

        <div className="infos-main__content">
          <h5>Téléphone</h5>
          <div className="infos-title__content">
            {data?.phone_number ? `${data?.phone_number}` : `Non renseigné`}
          </div>
          <EditModal
            label="Téléphone"
            id="phone"
            type="text"
            title="Téléphone"
            propName="phone_number"
            isDatePicker={false}
          />
        </div>

        <div className="infos-main__content">
          <h5>Date de naissance</h5>
          <div className="infos-title__content">
            {data?.dateofbirth ? `${dateOfBirth()}` : `Non renseigné`}
          </div>
          <EditModal
            label="Date de Naissance"
            id="dateofbirth"
            type="text"
            title="Date de Naissance"
            propName="dateofbirth"
            isDatePicker
          />
        </div>

        <div className="infos-main__content">
          <h5>Adresse</h5>
          <div className="infos-title__content">
            {data?.address ? `${data?.address}` : `Non renseigné`}
          </div>
          <EditModal
            label="Adresse"
            id="address"
            type="text"
            title="Adresse"
            propName="address"
            isDatePicker={false}
          />
        </div>
      </div>
    </>
  );
}

export default PersonnalsInformations;
