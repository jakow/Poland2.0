import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { api } from '../../helpers/misc';
import InputField from '../atoms/Form';
import Button from '../atoms/Button';
import { rhythm } from '../typography';
import Coupon from '../../types/Coupon';
import { colors } from '../variables';

const Wrapper = styled('section')({
  display: 'flex',
  fieldset: {
    marginBottom: 0,
    flex: 1,
    small: {
      marginLeft: rhythm(0.5),
    },
  },
  button: {
    height: rhythm(1.6),
    marginLeft: rhythm(0.5),
  },
});

const PromotionField = () => {
  const [placeholder, setPlaceholder] = useState();
  return (
    <Formik
      initialValues={{
        coupon: '',
      }}
      onSubmit={async (values, actions) => {
        try {
          const coupon: Coupon = await api('coupons/check', {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ code: values.coupon }),
          });

          localStorage.setItem('coupon', JSON.stringify(coupon));
          dispatchEvent(new Event('storage'));

          setPlaceholder('Coupon applied!');
          actions.resetForm();
        } catch (error) {
          actions.setErrors({ coupon: error.message });
        } finally {
          actions.setSubmitting(false);
        }
      }}
      validationSchema={object().shape({
        coupon: string().matches(/^[A-Z0-9]+$/, 'Please enter a valid coupon.'),
      })}
    >
      {({
        errors, touched, isSubmitting, values,
      }) => (
        <Form>
          <Wrapper>
            <InputField
              name="coupon"
              placeholder={placeholder || 'Enter a coupon...'}
              type="text"
              icon="barcode"
              error={errors.coupon && touched.coupon ? errors.coupon : null}
            />
            <Button
              width={rhythm(4)}
              loading={isSubmitting}
              disabled={!values.coupon.length || !!errors.coupon}
              compact
              type="submit"
              background={colors.red}
            >
              Apply
            </Button>
          </Wrapper>
        </Form>
      )}
    </Formik>
  );
};

export default PromotionField;
