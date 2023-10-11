// REACT
import * as React from 'react';
import { useState } from 'react';
// FORMIK
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from 'formik';
// MUI
import { Step, StepLabel, Stepper, createTheme } from '@mui/material';
// COMPONENT
import FormNavigation from './FormNavigation';
// TYPE
interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#a0c695ff',
      contrastText: '#faf9f6ff',
    },
    secondary: {
      main: '#faf9f6ff',
      contrastText: '#a0c695ff',
    },
  },
});

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function MultiStepForm({ children, initialValues, onSubmit }: Props) {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement;

  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  // ----------------------------FUNCTIONS------------------------------//

  const next = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };

  const previous = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<any>
    // eslint-disable-next-line consistent-return
  ) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
      // eslint-disable-next-line no-else-return
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  // ----------------------------RETURN----------------------------------//

  return (
    <div className="searchform">
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form className="form">
            <Stepper activeStep={stepNumber}>
              {steps.map((currenStep) => {
                const label = currenStep.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {step}

            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MultiStepForm;

export const FormStep = ({ stepName = '', children }: any) => children;
