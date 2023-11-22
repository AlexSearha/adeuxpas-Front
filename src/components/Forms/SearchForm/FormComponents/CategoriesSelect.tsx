// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// FORMIK
import { FieldConfig, useField, useFormikContext } from 'formik';
// REDUX
import {
  useGetAllCategoriesQuery,
  useGetSubCategoryMutation,
} from '../../../../store/queries/queries-categories';
// TYPE
interface Props extends FieldConfig {
  label: string;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function CategoriesSelect({ label, ...props }: Props) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [fetchSubCategory] = useGetSubCategoryMutation({
    fixedCacheKey: 'subCategoryShare',
  });
  const { data: allCategoryList, isSuccess: allCategoryIsSuccess } =
    useGetAllCategoriesQuery();

  // ----------------------------FUNCTIONS------------------------------//

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedCategoryId = event.target.value as number;
    setFieldValue(props.name, selectedCategoryId);
    console.log('selectedCategoryId: ', selectedCategoryId);
    fetchSubCategory(selectedCategoryId.toString());
  };

  // ----------------------------RETURN----------------------------------//

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-labcategory-label">
          {label}
        </InputLabel>
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
          onChange={handleCategoryChange}
        >
          {allCategoryIsSuccess &&
            allCategoryList.map((category) => (
              <MenuItem value={category.id} key={category.id}>
                {category.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
