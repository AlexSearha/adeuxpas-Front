import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FieldConfig, useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getActivitieslist } from '../../../../store/reducers/categories';

interface Props extends FieldConfig {
  label: string;
}

export default function SubCategoriesSelect({ label, ...props }: Props) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const { subCategories } = useAppSelector((state) => state.category);
  const [test, setTest] = useState([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subCategories.length > 0) {
      // console.log('souscategories:', subCategories[0].souscategories);
      setTest(subCategories[0].souscategories);
    }
  }, [subCategories]);

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
            dispatch(getActivitieslist(e.target.value));
          }}
        >
          {test.map((subCategory) => (
            <MenuItem value={subCategory.id} key={subCategory.id}>
              {subCategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
