import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from '../components/variables';
import { Field } from '../components/atoms/Form';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Container from '../components/atoms/Container';
import { action } from '@storybook/addon-actions';

storiesOf('Form', module)
  .add('text input', () => (
    <Container>
      <Formik
        initialValues={{
          fullName: '',
          email: ''
        }}
        onSubmit={values => action(JSON.stringify(values))}
        validationSchema={object().shape({
          fullName: string().required('Please enter a full name.'),
          email: string().email().required('Please enter a valid e-mail address.')
        })}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <Field
                name="fullName"
                type="text"
                placeholder="Name and Surname"
                leftIcon="person"
                error={errors.fullName && touched.fullName ? errors.fullName : null}
                mandatory
              />
              <Field
                name="email"
                type="email"
                placeholder="E-mail address"
                leftIcon="envelope"
                error={errors.email && touched.email ? errors.email : null}
                mandatory
              />
            </Form>
          );
        }}
      </Formik>
    </Container>
  ));
