import React from "react";
// import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";




const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const pswdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const validationSchema = Yup.object().shape({

  username: Yup.string()
    .min(8, "*Username must have at least 8 characters")
    .max(12, "*Usernames can't be longer than 12 characters")
    .required("*Username is required"),
  password: Yup.string()
    .required("*Password is required")
    .matches(
      pswdRegExp,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
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
          initialValues={{ username: "", password: "", name: "", email: "", phone: ""}}
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
              <Form.Group controlId="formUserName">
                <Form.Label>Username :</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={touched.username && errors.username ? "has-error" : null}
                />
                {touched.username && errors.username ? (
                  <div className="error-message">{errors.username}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password :</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={touched.password && errors.password ? "has-error" : null}
                />
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={touched.name && errors.name ? "has-error" : null}
                />
                {touched.name && errors.name ? (
                  <div className="error-message">{errors.name}</div>
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
