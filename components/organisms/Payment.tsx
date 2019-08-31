import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  StripeProvider, CardElement, Elements, injectStripe,
} from 'react-stripe-elements';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { getData, getCodes } from 'country-list';
import { Header2 } from '../atoms/Headers';
import { colors } from '../variables';
import { rhythm } from '../typography';
import TicketType from '../../types/TicketType';
import { getBasket } from './Basket/logic';
import InputField from '../atoms/Form';
import {
  SubmitButtonRefProps, CheckoutState, CheckoutAction, CheckoutActionTypes,
} from '../../pages/checkout';
import { api } from '../../pages/_app';

const style = {
  base: {
    iconColor: `${colors.dark}`,
    color: `${colors.dark}`,
    fontFamily: 'monospace',
    fontSize: '16px',
  },
  invalid: {
    iconColor: `${colors.red}`,
    color: `${colors.red}`,
  },
};

const CardElementWrapper = styled('div')({
  marginBottom: rhythm(0.75),
  '.StripeElement': {
    color: `${colors.dark}`,
    width: '100%',
    fontSize: '16px',
    fontFamily: 'monospace',
    display: 'block',
    padding: rhythm(0.25),
    paddingLeft: rhythm(0.5),
    boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.16)',
    border: 'none',
    outline: 'none',
    resize: 'none',
    background: `${colors.white}`,
    '&::placeholder': {
      color: 'currentColor',
    },
  },
  small: {
    marginTop: rhythm(1),
    marginLeft: rhythm(1.75),
  },
});

interface StripeFormProps {
  clientSecret: string;
  checkoutDispatch: React.Dispatch<CheckoutAction>;
}

const StripeForm = injectStripe<StripeFormProps & SubmitButtonRefProps>(
  ({
    stripe, clientSecret, checkoutDispatch, submitButtonRef,
  }) => {
    const [paymentError, setPaymentError] = useState(null);
    const [cardElementError, setCardElementError] = useState(null);
    const [cardElementComplete, setCardElementComplete] = useState(false);
    return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          street: '',
          city: '',
          country: '',
        }}
        validationSchema={object().shape({
          name: string().required('Please enter your full name.'),
          email: string()
            .email('Please enter a valid e-mail address.')
            .required('Please enter your e-mail address.'),
          street: string().required('Please enter the first (and second) line of your address.'),
          city: string().required('Please enter your city.'),
          country: string()
            .oneOf(getCodes(), 'Please select a valid country.')
            .required('Please select your country.'),
        })}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          if (paymentError) {
            setPaymentError(null);
          }

          const { paymentIntent, error } = await stripe.handleCardPayment(clientSecret, {
            payment_method_data: {
              billing_details: {
                name: values.name,
                email: values.email,
                address: {
                  line1: values.street,
                  city: values.city,
                  country: values.country,
                },
              },
            },
            receipt_email: values.email,
          });
          if (error) {
            setPaymentError(error.message);
            window.scrollTo(0, 0);
          } else if (paymentIntent.status !== 'succeeded') {
            setPaymentError('An unknown error has occurred.');
            window.scrollTo(0, 0);
          } else {
            checkoutDispatch({ paymentIntent, type: CheckoutActionTypes.NEXT });
          }

          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => {
          if (submitButtonRef.current) {
            const disabled = !Object.entries(touched).length || Object.entries(errors).length
              || cardElementError || !cardElementComplete || isSubmitting;
            submitButtonRef.current.disabled = disabled;
          }

          return (
            <Form id="payment">
              {paymentError
              && (
                <div style={{ color: `${colors.red}`, marginBottom: rhythm(1) }}>
                  <p>
                    An issue has occurred: <strong>{paymentError}</strong>
                  </p>
                  <p>
                    Please ensure that the payment method details are correct, and try again.&nbsp;
                    If the issue persists, then&nbsp;
                    <a href="mailto:contact@poland20.com">get in touch with us</a>.
                  </p>
                </div>
              )}
              <CardElementWrapper>
                <CardElement
                  style={style}
                  onChange={({ error, complete }) => {
                    if (complete !== undefined && cardElementComplete !== complete) {
                      setCardElementComplete(complete);
                    }
                    setCardElementError((error && error.message) || null);
                  }}
                />
                {cardElementError && <small style={{ color: `${colors.red}` }}>{cardElementError}</small>}
              </CardElementWrapper>
              <InputField
                name="name"
                type="text"
                placeholder="Name and Surname"
                icon="person"
                error={errors.name && touched.name ? errors.name : null}
                mandatory
              />
              <InputField
                name="email"
                type="email"
                placeholder="E-mail address"
                icon="envelope"
                error={errors.email && touched.email ? errors.email : null}
                mandatory
              />
              <InputField
                name="street"
                type="text"
                placeholder="Street"
                icon="office"
                error={errors.street && touched.street ? errors.street : null}
                mandatory
              />
              <InputField
                name="city"
                type="text"
                placeholder="City"
                icon="map-marker"
                error={errors.city && touched.city ? errors.city : null}
                mandatory
              />
              <InputField
                name="country"
                type="select"
                placeholder="Country"
                icon="globe"
                selectOptions={{ valueLabel: 'code', data: getData() }}
                error={errors.country && touched.country ? errors.country : null}
                mandatory
              />
            </Form>
          );
        }}
      </Formik>
    );
  },
);

interface Props {
  apiKey: string;
  checkoutDispatch: React.Dispatch<CheckoutAction>;
  checkoutState: CheckoutState;
  ticketTypes: TicketType[];
}

class Payment extends React.Component<Props & SubmitButtonRefProps> {
  state = {
    basket: getBasket(),
  };

  async componentDidMount() {
    const { checkoutState, checkoutDispatch } = this.props;
    const { basket } = this.state;
    if (!checkoutState.clientSecret) {
      /* eslint-disable camelcase */
      try {
        const { client_secret } = await api('orders/intent', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            basket,
            ...checkoutState.participants,
          }),
        });
        checkoutDispatch({ clientSecret: client_secret });
      } catch (error) {
        window.location.assign('tickets');
      }
      /* eslint-enable camelcase */
    }
  }

  render() {
    const {
      apiKey, checkoutState, checkoutDispatch, submitButtonRef,
    } = this.props;
    const { basket } = this.state;

    if (!Object.entries(basket).length) {
      window.location.assign('tickets');
    }

    return (
      <React.Fragment>
        <Header2 bold>Payment</Header2>
        <p>
          Please enter your debit/credit card details, and billing information below.
        </p>
        <StripeProvider apiKey={apiKey}>
          <Elements locale="en-GB">
            <StripeForm
              clientSecret={checkoutState.clientSecret}
              checkoutDispatch={checkoutDispatch}
              submitButtonRef={submitButtonRef}
            />
          </Elements>
        </StripeProvider>
        <small>
          All information entered is processed and stored securely by Stripe.&nbsp;
          We do not process nor store information entered into this form.
        </small>
      </React.Fragment>
    );
  }
}

export default Payment;
