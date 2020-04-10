import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Formik } from "formik";


const LoginModal = (props) => {
  return (
    <Modal show={props.modalOpen} onHide={props.handleModal2Open}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ username: "", password: ""}}
          
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
              

              {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
              <Button variant="primary" type="submit" disabled={isSubmitting} onClick={props.handleModal2Open}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

