// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// FORMIK
import { FieldConfig, useField, useFormikContext } from 'formik';
// STORE + API
import { useGetSubCategoryMutation } from '../../../../store/queries/queries-Categories';
// TYPE
interface Props extends FieldConfig {
  label: string;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function SubCategoriesSelect({ label, ...props }: Props) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  const [, { data: result }] = useGetSubCategoryMutation({
    fixedCacheKey: 'subCategoryShare',
  });

  // ----------------------------RETURN----------------------------------//

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="form-categories-select">{label}</InputLabel>
        <Select
          label={label}
          sx={{
            border: {
              borderColor: 'blue',
              backgroundColor: '#fff',
              borderRadius: '5px',
            },
          }}
          value={field.value}
          name={field.name}
          error={meta.touched && Boolean(meta.error)}
          onChange={(e) => {
            setFieldValue(props.name, e.target.value);
            // dispatch(getActivitieslist(e.target.value));
          }}
        >
          {result?.souscategories?.map((subCategory) => (
            <MenuItem value={subCategory.id} key={subCategory.id}>
              {subCategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
