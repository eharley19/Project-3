import React from "react";
// import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";




const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;


const validationSchema = Yup.object().shape({

  username: Yup.string()
    .min(8, "*Username must have at least 8 characters")
    .max(12, "*Usernames can't be longer than 12 characters")
    .required("*Username is required"),
  password: Yup.string()
    .min(8, "*Password is too short. Minimum of 8 characters")
    .max(12, "*Password cannot exceed 12 characters.")
    .required("*Password is required"),
  firstname: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*First name is required"),
  lastname: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Last name is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .required("*Phone number required"),

});

const RegistrationForm = () => {
  return (
    <Modal show={true} >
      <Modal.Header closeButton>
        <Modal.Title>Registration Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ username: "", password: "", firstname: "", lastname: "", email: "", phone: ""}}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
            <Form onSubmit={handleSubmit} className="mx-auto">
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name :</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  className={touched.firstname && errors.firstname ? "has-error" : null}
                />
                {touched.firstname && errors.firstname ? (
                  <div className="error-message">{errors.firstname}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name :</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  className={touched.lastname && errors.lastname ? "has-error" : null}
                />
                {touched.lastname && errors.lastname ? (
                  <div className="error-message">{errors.lastname}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "has-error" : null}
                />
                {touched.email && errors.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone :</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  className={touched.phone && errors.phone ? "has-error" : null}
                />
                {touched.phone && errors.phone ? (
                  <div className="error-message">{errors.phone}</div>
                ) : null}
              </Form.Group>

              {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationForm;
