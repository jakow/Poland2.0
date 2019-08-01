import React, { useState } from 'react';
import { StripeProvider, CardElement, Elements, injectStripe } from 'react-stripe-elements';
import { Header2 } from '../atoms/Headers';
import { colors } from '../variables';
import styled from '@emotion/styled';
import { rhythm } from '../typography';
import TicketType from '../../types/TicketType';
import { getBasket, getTotalAmount } from './Basket/logic';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { InputField } from '../atoms/Form';
import { SubmitButtonProps } from '../../pages/checkout';
import { getData, getCodes } from 'country-list';

const style = {
  base: {
    iconColor: `${colors.dark}`,
    color: `${colors.dark}`,
    fontFamily: 'Montserrat',
    fontSize: '16px'
  },
  invalid: {
    iconColor: `${colors.red}`,
    color: `${colors.red}`,
  }
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
      color: 'currentColor'
    }
  },
  small: {
    // display: 'block',
    marginTop: rhythm(1),
    marginLeft: rhythm(1.75)
  }
});

interface StripeFormProps {
  clientSecret: string;
}

const StripeForm = injectStripe<StripeFormProps & SubmitButtonProps>(
  ({ stripe, clientSecret, submitButtonRef }) => {
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
          country: ''
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
            .required('Please select your country.')
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
                  country: values.country
                }
              }
            }
          });
          if (error) {
            setPaymentError(error.message);
            scrollTo(0, 0);
          } else {
            console.log(paymentIntent);
          }
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => {
          if (submitButtonRef.current) {
            const disabled =
              !Object.entries(touched).length ||
              Object.entries(errors).length ||
              cardElementError ||
              !cardElementComplete ||
              isSubmitting;
            submitButtonRef.current.disabled = disabled;
          }

          return (
            <Form id="payment">
              {paymentError &&
              <div style={{ color: `${colors.red}`, marginBottom: rhythm(1) }}>
                <p>
                  Payment method provided has been rejected: <strong>{paymentError}</strong>
                </p>
                <p>
                  Please ensure that the payment method details are correct, and try again.&nbsp;
                  If the issue persists, then&nbsp;
                  <a href="mailto:contact@poland20.com">get in touch with us</a>.
                </p>
              </div>
              }
              <CardElementWrapper>
                <CardElement
                  style={style}
                  onChange={({ error, complete }) => {
                    if (complete !== undefined && cardElementComplete !== complete) {
                      setCardElementComplete(complete);
                    }
                    setCardElementError(error && error.message || null);
                  }}
                />
                {cardElementError && <small style={{ color: `${colors.red}` }}>{cardElementError}</small>}
              </CardElementWrapper>
              <InputField
                name="name"
                type="text"
                placeholder="Name and Surname"
                leftIcon="person"
                error={errors.name && touched.name ? errors.name : null}
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
                name="street"
                type="text"
                placeholder="Street"
                leftIcon="office"
                error={errors.street && touched.street ? errors.street : null}
                mandatory
              />
              <InputField
                name="city"
                type="text"
                placeholder="City"
                leftIcon="map-marker"
                error={errors.city && touched.city ? errors.city : null}
                mandatory
              />
              <InputField
                name="country"
                type="select"
                placeholder="Country"
                leftIcon="globe"
                options={{ valueLabel: 'code', data: getData() }}
                error={errors.country && touched.country ? errors.country : null}
                mandatory
              />
            </Form>
          );
        }}
      </Formik>
    );
  }
);

interface Props {
  apiKey: string;
  host: string;
  ticketTypes: TicketType[];
}

const Wrapper = styled('section')({
  // p: {
  //   marginBottom: rhythm(0.75)
  // }
});

class Payment extends React.Component<Props & SubmitButtonProps> {
  state = {
    clientSecret: null,
    basket: getBasket()
  };

  async componentDidMount() {
    if (!this.state.clientSecret) {
      const data = await fetch(`${this.props.host}/orders/intent`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          amount: getTotalAmount(this.props.ticketTypes, this.state.basket)
        })
      });

      const { clientSecret } = await data.json();
      if (clientSecret) {
        this.setState({ clientSecret });
      } else {
        throw 'Could not get PaymentIntent';
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Header2 bold>Payment</Header2>
        <p>
          Please enter your debit/credit card details, and billing information below.
        </p>
        <StripeProvider apiKey={this.props.apiKey}>
          <Elements locale="en-GB">
            <StripeForm
              clientSecret={this.state.clientSecret}
              submitButtonRef={this.props.submitButtonRef}
            />
          </Elements>
        </StripeProvider>
        <small>
          All information entered is processed and stored securely by Stripe.&nbsp;
          We do not process nor store information entered into this form.
        </small>
      </Wrapper>
    );
  }
}

export default Payment;
