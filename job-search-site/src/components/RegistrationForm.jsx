import React from "react";
import styled from "styled-components";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const MODAL = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  @media (min-width: 786px) {
    width: 60%;
  }
  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }
  .error {
    border: 2px solid #ff6565;
  }
  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }
  .form-group {
    margin-bottom: 2.5em;
  }
`;

const FORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;
  @media (min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  &:hover {
    background: #1d3461;
  }
`;


const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;


const validationSchema = Yup.object().shape({
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
  blog: Yup.string()
    .url("*Must enter URL in http://www.example.com format")
    .required("*URL required"),
});

const RegistrationForm = () => {
  return (
    <Modal styles={MODAL}>
      <Modal.Header closeButton>
        <Modal.Title>Registration Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "", email: "", phone: "", blog: "" }}
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
            <FORM onSubmit={handleSubmit} className="mx-auto">
              <Form.Group controlId="formName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
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
              <Form.Group controlId="formBlog">
                <Form.Label>Blog :</Form.Label>
                <Form.Control
                  type="text"
                  name="blog"
                  placeholder="Blog URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blog}
                  className={touched.blog && errors.blog ? "has-error" : null}
                />
                {touched.blog && errors.blog ? (
                  <div className="error-message">{errors.blog}</div>
                ) : null}
              </Form.Group>
              {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
              <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </BUTTON>
            </FORM>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationForm;
