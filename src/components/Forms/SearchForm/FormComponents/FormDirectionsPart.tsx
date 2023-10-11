// REACT
import React, { useState } from 'react';
// MUI
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import SignpostIcon from '@mui/icons-material/Signpost';
import { Typography } from '@mui/material';
// FORMIK
import { FieldConfig, useFormikContext } from 'formik';
// TYPE
interface Props extends FieldConfig {
  label: string;
}
// Variable de configuration de la grid definie par MUI
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function FormDirectionsPart({ label, ...props }: Props) {
  //
  const [direction, setDirection] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const { setFieldValue } = useFormikContext();

  // ----------------------------FUNCTIONS------------------------------//

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setFieldValue(props.name, event.target.value);
  };
  // ----------------------------RETURN----------------------------------//

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
          fontStyle: 'italic',
        }}
        variant="h5"
        component="div"
      >
        Quelle direction vous inspire ?
      </Typography>
      <Grid container spacing={4}>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '30px',
          }}
        >
          {/* <Item style={{ display: 'flex', justifyContent: 'center' }}> */}
          {/* <Radio
              style={{ transform: 'rotate(225deg)' }}
              size="large"
              name={label}
              checked={selectedValue === 'NW'}
              id="northWestDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => {
                setDirection('Nord Ouest');
              }}
              onChange={handleChange}
              value="NW"
              inputProps={{ 'aria-label': 'northWest' }}
            /> */}
          {/* </Item> */}
        </Grid>
        <Grid item xs={4}>
          <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(270deg)' }}
              size="large"
              checked={selectedValue === 'N'}
              onChange={handleChange}
              id="northDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Nord')}
              value="N"
              inputProps={{ 'aria-label': 'north' }}
            />
          </Item>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(315deg)' }}
              size="large"
              checked={selectedValue === 'NE'}
              onChange={handleChange}
              id="northEstDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Nord Est')}
              value="NE"
              inputProps={{ 'aria-label': 'northEst' }}
            />
          </Item> */}
        </Grid>
        <Grid item xs={4}>
          <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(180deg)' }}
              size="large"
              checked={selectedValue === 'W'}
              onChange={handleChange}
              id="westDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Ouest')}
              value="W"
              inputProps={{ 'aria-label': 'west' }}
            />
          </Item>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Item>
            <div>{direction}</div>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(0deg)' }}
              size="large"
              checked={selectedValue === 'E'}
              onChange={handleChange}
              id="estDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Est')}
              value="E"
              inputProps={{ 'aria-label': 'est' }}
            />
          </Item>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(135deg)' }}
              size="large"
              checked={selectedValue === 'SW'}
              onChange={handleChange}
              id="southWestDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Sud Ouest')}
              value="SW"
              inputProps={{ 'aria-label': 'southWest' }}
            />
          </Item> */}
        </Grid>
        <Grid item xs={4}>
          <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(90deg)' }}
              size="large"
              checked={selectedValue === 'S'}
              onChange={handleChange}
              id="southDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Sud')}
              value="S"
              inputProps={{ 'aria-label': 'south' }}
            />
          </Item>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Radio
              style={{ transform: 'rotate(45deg)' }}
              size="large"
              checked={selectedValue === 'SE'}
              onChange={handleChange}
              id="southEstDirection"
              icon={<ArrowCircleRightOutlinedIcon />}
              checkedIcon={<ArrowCircleRightIcon />}
              onClick={() => setDirection('Sud Est')}
              value="SE"
              inputProps={{ 'aria-label': 'southEst' }}
            />
          </Item> */}
        </Grid>
      </Grid>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <span style={{ fontSize: '11px', color: '#000' }}>
          Choisir pour moi
        </span>
        <Radio
          size="large"
          checked={selectedValue === 'R'}
          onChange={handleChange}
          id="northOuestDirection"
          icon={<SignpostOutlinedIcon />}
          checkedIcon={<SignpostIcon />}
          onClick={() => setDirection('Choisir pour moi')}
          value="R"
          inputProps={{ 'aria-label': 'random' }}
        />
      </div>
    </Box>
  );
}
