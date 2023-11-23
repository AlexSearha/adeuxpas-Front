// REACT
import { useNavigate } from 'react-router';
// YUP & FORMIK
import * as yup from 'yup';
// REDUX
import { useAppDispatch } from '../../../hooks/redux';
// COMPONENTS
import MultiStepForm, { FormStep } from './StepsForm/MultiStepForm';
import AddressTextField from './FormComponents/AddressTextField';
import CategoriesSelect from './FormComponents/CategoriesSelect';
import SubCategoriesSelect from './FormComponents/SubCategoriesSelect';
import DatePickerModel from './FormComponents/DatePickerModel';
import SelectNumberField from './FormComponents/FormPropsTextFields';
import FormDirectionsPart from './FormComponents/FormDirectionsPart';
// API & STORE
import { useGetAddressListMutation } from '../../../store/queries/queries-address';
import { searchStore } from '../../../store/reducers/user';
// TYPES
import { SearchStoreProps } from '../../../@types';
// CSS
import './style.scss';

const validationSchema = yup.object({
  addressDeparture: yup.string().required('Une adresse est requise'),
  category: yup.string().required('Choisir une categorie'),
  activity: yup.string().required('Choisir votre activité'),
  arrivalDate: yup.string().required('Choisir une date de départ'),
  departureDate: yup.string().required('Choisir une date de retour'),
  voyager: yup.number().required('Choisir un nombre de voyageurs'),
});

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function SearchForm() {
  const [, { data }] = useGetAddressListMutation({
    fixedCacheKey: 'departureDatas',
  });
  const departureCoordinates = () => {
    if (data && data?.features[0]) {
      return data?.features[0].geometry.coordinates;
    }
    return null;
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ----------------------------RETURN----------------------------------//

  return (
    <div className="searchform-content">
      <MultiStepForm
        initialValues={{
          addressDeparture: '',
          category: '',
          activity: '',
          arrivalDate: '',
          departureDate: '',
          voyager: 2,
          direction: '',
        }}
        onSubmit={(values) => {
          const result = {
            ...values,
            departureCoordinates: departureCoordinates(),
          };
          dispatch(searchStore(result as SearchStoreProps));
          navigate('/searchresults');
        }}
      >
        <FormStep
          validationSchema={validationSchema}
          stepName="Informations de départ"
        >
          <AddressTextField name="addressDeparture" label="Adresse" />
          <CategoriesSelect name="category" label="Categorie" />
          <SubCategoriesSelect name="activity" label="Activité" />
          <div className="flex-row-center">
            <DatePickerModel name="arrivalDate" label="Départ" />
            <DatePickerModel name="departureDate" label="Retour" />
          </div>
          <SelectNumberField name="voyager" label="Nombre de voyageurs" />
        </FormStep>
        <FormStep
          validationSchema={yup.object({
            direction: yup.string().required('Choisir au moins une direction'),
          })}
          stepName="Direction"
        >
          <FormDirectionsPart name="direction" label="Direction" />
        </FormStep>
      </MultiStepForm>
    </div>
  );
}

export default SearchForm;
