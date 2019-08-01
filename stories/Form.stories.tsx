import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { InputField } from '../components/atoms/Form';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import Container from '../components/atoms/Container';
import Button from '../components/atoms/Button';

storiesOf('Form', module)
  .add('text input', () => (
    <Container>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          comment: '',
          age: ''
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
        validationSchema={object().shape({
          fullName: string().required('Please enter a full name.'),
          email: string()
            .email('Please enter a valid e-mail address.')
            .required('Please enter an e-mail address.'),
          comment: string(),
          age: string().oneOf(
            ['Prefer not to answer', '16-19', '20-24'],
            'Please select one of the options.'
          )
        })}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <InputField
                name="fullName"
                type="text"
                placeholder="Name and Surname"
                leftIcon="person"
                error={errors.fullName && touched.fullName ? errors.fullName : null}
                mandatory
              />
              <InputField
                name="email"
                type="email"
                placeholder="E-mail address"
                leftIcon="envelope"
                error={errors.email && touched.email ? errors.email : null}
                mandatory
              />
              <InputField
                name="comment"
                type="textarea"
                placeholder="Do you have anything else to add?"
                leftIcon="more"
                error={errors.comment && touched.comment ? errors.comment : null}
              />
              <InputField
                name="age"
                type="select"
                placeholder="Select your age range"
                options={{ data: [
                  { value: 'Prefer not to answer' },
                  { value: '16-19' },
                  { value: '20-24' }
                ]}}
                error={errors.age && touched.age ? errors.age : null}
              />
              <Button wide type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  ));
