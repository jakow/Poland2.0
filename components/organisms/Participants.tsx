import React, { Component } from 'react';
import {
  Formik, Form, FieldArray, getIn,
} from 'formik';
import styled from '@emotion/styled';
import { array, object, string } from 'yup';
import SimpleIcons from 'simple-icons-react-component';
import TicketType from '../../types/TicketType';
import { getBasket } from './Basket/logic';
import { Header3 } from '../atoms/Headers';
import InputField from '../atoms/Form';
import { SubmitButtonRefProps } from '../../pages/checkout';
import { colors } from '../variables';
import { rhythm } from '../typography';

interface Props {
  ticketTypes: TicketType[];
  onSubmit: (values: any) => void;
}

const ParticipantType = styled('div')({
  display: 'flex',
  marginBottom: rhythm(0.5),
  em: {
    flexBasis: '30%',
  },
  fieldset: {
    flexBasis: '70%',
  },
});

class Participants extends Component<Props & SubmitButtonRefProps> {
  state = { // eslint-disable-next-line
    basket: getBasket(this.props.ticketTypes),
  };

  render() {
    const { basket } = this.state;
    if (!Object.entries(basket).length) {
      window.location.assign('tickets');
    }

    return (
      <Formik
        initialValues={{
          participants: Object.entries(basket).reduce(
            (values, [id, quantity]) => [...values, ...Array(quantity).fill({
              ticket: id,
              name: '',
              email: '',
              linkedin: '',

              // Additional information
              // type: '',
              programmingLanguages: [],

              // Student
              // university: '',
              // course: '',
              yearOfStudy: '',

              // Alumni
              // industry: '',
            })],
            [],
          ),
        }}
        onSubmit={(values, actions) => {
          const { onSubmit, submitButtonRef } = this.props;
          if (submitButtonRef && submitButtonRef.current) {
            submitButtonRef.current.setState({ _loading: true });
          }
          onSubmit(values);

          if (submitButtonRef && submitButtonRef.current) {
            submitButtonRef.current.setState({ _loading: false });
          }
          actions.setSubmitting(false);
        }}
        validationSchema={object().shape({
          participants: array()
            .of(
              object().shape({
                name: string()
                  .required('Please enter a full name.'),
                email: string()
                  .email('Please enter a valid e-mail address.')
                  .required('Please enter an e-mail address.'),
                linkedin: string().matches(/^[A-z0-9_-]*$/, 'Please enter a valid LinkedIn URL.'),
                type: string()
                  .oneOf(['', 'Student', 'Alumni'], 'Please make a selection.'),
                university: string().matches(/^[A-z0-9 /-]*$/, 'Please enter a valid institution.'),
                course: string().matches(/^[A-z0-9 /-]*$/, 'We don\'t think you studied that...'),
                yearOfStudy: string()
                  .oneOf(
                    ['', 'First', 'Second', 'Third', 'Fourth/Fifth', 'Master\'s', 'Doctorate'],
                    'Please make a selection.',
                  ),
                industry: string().matches(/^[A-z0-9 /-]*$/, 'Are you sure?'),
                programmingLanguages: array().of(string()),
              }),
            )
            .required('All information must be specified.'),
        })}
      >
        {({
          errors, touched, values,
        }) => {
          const { submitButtonRef, ticketTypes } = this.props;
          if (submitButtonRef && submitButtonRef.current && !submitButtonRef.current.state._loading) {
            const _disabled = !Object.entries(touched).length || !!errors.participants;
            submitButtonRef.current.setState({ _disabled });
          }

          return (
            <Form id="participants">
              <FieldArray name="participants">
                {() => (
                  <React.Fragment>
                    {values.participants.length > 0
                      && values.participants.map((participant, index) => (
                        <React.Fragment key={index}>
                          <Header3 bold>
                            {ticketTypes.find(ticketType => ticketType.id === participant.ticket).name}
                          </Header3>
                          <InputField
                            name={`participants[${index}].name`}
                            type="text"
                            placeholder="Name and Surname"
                            icon="person"
                            error={
                              getIn(errors, `participants[${index}].name`)
                              && getIn(touched, `participants[${index}].name`)
                                ? getIn(errors, `participants[${index}].name`)
                                : null
                            }
                            mandatory
                          />
                          <InputField
                            name={`participants[${index}].email`}
                            type="email"
                            placeholder="E-mail address"
                            icon="envelope"
                            error={
                              getIn(errors, `participants[${index}].email`)
                              && getIn(touched, `participants[${index}].email`)
                                ? getIn(errors, `participants[${index}].email`)
                                : null
                            }
                            mandatory
                          />
                          <InputField
                            name={`participants[${index}].linkedin`}
                            type="text"
                            placeholder="profile.name"
                            prefix="linkedin.com/in/"
                            icon={<SimpleIcons name="LinkedIn" color={`${colors.dark}`} />}
                            error={
                              getIn(errors, `participants[${index}].linkedin`)
                                ? getIn(errors, `participants[${index}].linkedin`)
                                : null
                            }
                          />
                          <p>
                            Please help us improve Poland 2.0 Summit by telling us a bit more about yourself:
                          </p>
                          <ParticipantType>
                            <em>I am a(n)...</em>
                            <InputField
                              name={`participants[${index}].type`}
                              type="radio"
                              values={['Student', 'Alumni']}
                              error={
                                getIn(errors, `participants[${index}].type`)
                                && getIn(touched, `participants[${index}].type`)
                                  ? getIn(errors, `participants[${index}].type`)
                                  : null
                              }
                              inline
                            />
                          </ParticipantType>
                          {participant.type === 'Student'
                            ? (
                              <React.Fragment>
                                <InputField
                                  name={`participants[${index}].university`}
                                  type="text"
                                  icon="office"
                                  placeholder="University"
                                  error={
                                    getIn(errors, `participants[${index}].university`)
                                      ? getIn(errors, `participants[${index}].university`)
                                      : null
                                  }
                                />
                                <InputField
                                  name={`participants[${index}].course`}
                                  type="text"
                                  icon="book"
                                  placeholder="Course"
                                  error={
                                    getIn(errors, `participants[${index}].course`)
                                      ? getIn(errors, `participants[${index}].course`)
                                      : null
                                  }
                                />
                                <InputField
                                  name={`participants[${index}].yearOfStudy`}
                                  type="select"
                                  icon="numerical"
                                  placeholder="Year of Study"
                                  selectOptions={{
                                    data: [
                                      {
                                        value: 'First',
                                      },
                                      {
                                        value: 'Second',
                                      },
                                      {
                                        value: 'Third',
                                      },
                                      {
                                        value: 'Fourth/Fifth',
                                      },
                                      {
                                        value: 'Master\'s',
                                      },
                                      {
                                        value: 'Doctorate',
                                      },
                                    ],
                                  }}
                                  error={
                                    getIn(errors, `participants[${index}].yearOfStudy`)
                                      ? getIn(errors, `participants[${index}].yearOfStudy`)
                                      : null
                                  }
                                />
                              </React.Fragment>
                            ) : null
                          }
                          {participant.type === 'Alumni'
                            ? (
                              <InputField
                                name={`participants[${index}].industry`}
                                type="text"
                                icon="build"
                                placeholder="Industry"
                                error={
                                  getIn(errors, `participants[${index}].industry`)
                                  && getIn(touched, `participants[${index}].industry`)
                                    ? getIn(errors, `participants[${index}].industry`)
                                    : null
                                }
                              />
                            ) : null
                          }
                          {participant.type
                            ? (
                              <React.Fragment>
                                <p>
                                  Please select any programming, markup or scripting languages you know:
                                </p>
                                <InputField
                                  name={`participants[${index}].programmingLanguages`}
                                  type="checkbox"
                                  values={[
                                    'JavaScript', 'HTML/CSS', 'TypeScript', 'SQL', 'Python', 'Java', 'Matlab', 'R',
                                    'Julia', 'C', 'C++', 'Go', 'Swift', 'Kotlin', 'C#', 'PHP',
                                  ]}
                                  inline
                                  mobileFriendly
                                />
                              </React.Fragment>
                            ) : null
                          }
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
