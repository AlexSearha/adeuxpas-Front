import * as yup from 'yup';
import { useNavigate } from 'react-router';
import MultiStepForm, { FormStep } from './StepsForm/MultiStepForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import AddressTextField from './FormComponents/AddressTextField';
import CategoriesSelect from './FormComponents/CategoriesSelect';
import SubCategoriesSelect from './FormComponents/SubCategoriesSelect';
import DatePickerModel from './FormComponents/DatePickerModel';
import SelectNumberField from './FormComponents/FormPropsTextFields';
import FormDirectionsPart from './FormComponents/FormDirectionsPart';
import { getSearchDatas } from '../../../store/reducers/search';
import './style.scss';

const validationSchema = yup.object({
  address: yup.string().required('Une adresse est requise'),
  category: yup.string().required('Choisir une categorie'),
  activity: yup.string().required('Choisir votre activité'),
  arrivalDate: yup.string().required('Choisir une date de départ'),
  departureDate: yup.string().required('Choisir une date de retour'),
  voyager: yup.number().required('Choisir un nombre de voyageurs'),
});

function SearchForm() {
  const departureCoordinates = useAppSelector(
    (state) => state.address.coordinates
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="searchform-content">
      <MultiStepForm
        initialValues={{
          address: '',
          category: '',
          activity: '',
          arrivalDate: '',
          departureDate: '',
          voyager: 2,
          direction: '',
        }}
        onSubmit={(values) => {
          const result = { ...values, departureCoordinates };
          dispatch(getSearchDatas(result));
          console.log(result);
          navigate('/searchresults', { state: { values } });
          // alert(JSON.stringify(result, null, 2));
        }}
      >
        <FormStep
          validationSchema={validationSchema}
          stepName="Informations de départ"
          // onSubmit={() => console.log()}
        >
          <AddressTextField name="address" label="Adresse" />
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
          // onSubmit={() => console.log()}
        >
          <FormDirectionsPart name="direction" label="Direction" />
        </FormStep>
      </MultiStepForm>
    </div>
  );
}

export default SearchForm;
