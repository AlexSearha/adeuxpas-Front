import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { FieldConfig, useField, useFormikContext } from 'formik';
import {
  getCategories,
  getSubCategories,
} from '../../../../store/reducers/categories';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

interface Props extends FieldConfig {
  label: string;
}

interface CategoryItem {
  id: number;
  name: string;
}

export default function CategoriesSelect({ label, ...props }: Props) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const { categories, isLoading } = useAppSelector((state) => state.category);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedCategoryId = e.target.value as number;
    setFieldValue(props.name, selectedCategoryId);
    dispatch(getSubCategories(selectedCategoryId));
  };

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
          {!isLoading &&
            categories.map((category: any) => (
              <MenuItem value={category.id} key={category.id}>
                {category.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
