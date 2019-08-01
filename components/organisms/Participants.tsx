import TicketType from '../../types/TicketType';
import React, { Component } from 'react';
import { getBasket } from './Basket/logic';
import { Formik, Form, FieldArray, getIn } from 'formik';
import { Header3 } from '../atoms/Headers';
import { InputField } from '../atoms/Form';
import { array, object, string } from 'yup';
import { SubmitButtonProps } from '../../pages/checkout';

interface Props {
  ticketTypes: TicketType[];
  onSubmit: (values: any) => void;
}

// tslint:disable-next-line
// const fullNameRegex = /^[a-zA-Z\u00C0-\u00FF\u0100-\u017F]+(([',. -][a-zA-Z\u00C0-\u00FF\u0100-\u017F ])?[a-zA-Z\u00C0-\u00FF\u0100-\u017F]*)*$/g;

class Participants extends Component<Props & SubmitButtonProps> {
  state = {
    basket: getBasket()
  };

  render() {
    return (
      <Formik
        initialValues={{
          participants: Object.entries(this.state.basket).reduce(
            (values, [id, quantity]) => [...values, ...Array(quantity).fill({
              ticket: id,
              fullName: '',
              email: ''
            })],
            []
          )
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          this.props.onSubmit(values);
          actions.setSubmitting(false);
        }}
        validationSchema={object().shape({
          participants: array().of(
            object().shape({
              fullName: string()
                // .matches(fullNameRegex, 'Please enter a valid full name. Accented characters are allowed!')
                .required('Please enter a full name.'),
              email: string()
                .email('Please enter a valid e-mail address.')
                .required('Please enter an e-mail address.')
            })
          )
          .required('All information must be specified.')
        })}
      >
        {({ errors, touched, isSubmitting, values }) => {
          if (this.props.submitButtonRef.current) {
            const disabled = !Object.entries(touched).length || !!errors.participants || isSubmitting;
            this.props.submitButtonRef.current.disabled = disabled;
          }

          return (
            <Form id="participants">
              <FieldArray name="participants">
                {() => (
                  <React.Fragment>
                    {values.participants.length > 0 &&
                      values.participants.map((participant, index) => (
                      <React.Fragment key={index}>
                        <Header3 bold>
                          {this.props.ticketTypes.find(ticketType =>
                            ticketType.id === participant.ticket
                          ).name}
                        </Header3>
                        <InputField
                          name={`participants[${index}].fullName`}
                          type="text"
                          placeholder="Name and Surname"
                          leftIcon="person"
                          error={
                            getIn(errors, `participants[${index}].fullName`) &&
                            getIn(touched, `participants[${index}].fullName`)
                              ? getIn(errors, `participants[${index}].fullName`)
                              : null
                          }
                          mandatory
                        />
                        <InputField
                          name={`participants[${index}].email`}
                          type="email"
                          placeholder="E-mail address"
                          leftIcon="envelope"
                          error={
                            getIn(errors, `participants[${index}].email`) &&
                            getIn(touched, `participants[${index}].email`)
                              ? getIn(errors, `participants[${index}].email`)
                              : null
                          }
                          mandatory
                        />
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default Participants;
