import React, { Component } from 'react';
import { Link } from 'gatsby';
import swal from '@sweetalert/with-react';
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';
import Airtable from 'airtable';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const base = new Airtable({
  apiKey: process.env.GATSBY_AIRTABLE_API_KEY
}).base('appWJeBO1bgkKVH0j');

const FormSchema = ({ t }) => (Yup.object().shape({
  name: Yup.string()
    .required('Ingresa un nombre de proveedor'),
  phone: Yup.string()
    .required('Ingresa un número de contacto de proveedor'),
}));

class Modal extends Component {
  state = {
    email: '',
    showForm: true,
    isLoading: true,
  };

  onSubmit = (values, actions) => {
    base('AlmudTable').create({
      "Name": values.name,
      "Phone": values.phone,
      "Other": values.other,
    }, (err, record) => {
      if (err) {
        return;
      }

      this.setState({ isLoading: false });

      swal('¡Registro completado! Pronto agregaremos esta información', { icon: 'success'});
    });

    this.setState({ showForm: false });
    
    actions.setSubmitting(false);
  }

  render = () => (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        <div>
          <div className="tc mt3 mt6-ns">
            {this.state.showForm ? (
              <Formik
                initialValues={{
                  name: '',
                  email: ''
                }}
                validationSchema={() => FormSchema({ t: this.props.t })}
                onSubmit={(values, actions) => this.onSubmit(values, actions)}
                render={({ errors, status, touched, isSubmitting }) => (
                  <Form aria-labelledby="cyber-form-title" id="cyber-form" className="mt4 grid-cyber__form">
                    <div>
                      <Field
                        className="w-100 w-50-ns mt1 br1 b--light-blue b--solid bw1 pa1 max-w"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ingresa el nombre del proveedor"
                      />
                      <ErrorMessage name="name" component="div" className="mt3 red" />
                    </div>
                    <div>
                      <Field
                        className="w-100 w-50-ns mt1 br1 b--light-blue b--solid bw1 pa1 max-w"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Ingresa un teléfono de contacto"
                      />
                      <ErrorMessage name="phone" component="div" className="mt3 red" />
                    </div>
                    <div>
                      <Field
                        component="textarea"
                        className="w-100 w-50-ns mt1 br1 b--light-blue b--solid bw1 pa1 max-w"
                        type="textarea"
                        name="other"
                        id="other"
                        placeholder="Ingresa otros datos como instagram, facebook, etc."
                      />
                      <ErrorMessage name="other" component="div" className="mt3 red" />
                    </div>
                    <div>
                      <button
                        className="btn grow br-pill purple--bg bn pv3 ph4 mv3 max-w white"
                        style={{ backgroundColor: '#0082ff' }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Registrar
                      </button>
                    </div>
                  </Form>
                )}
              />
            ) : (
              <p className="f4 purple">
                {this.state.isLoading ? (
                  'Registrando proveedor...'
                ) : (
                  '¡Gracias por registrarte!'
                )}
              </p>
            )}
            {modal && (
              <Link to={closeTo}>
                Ir al home
              </Link>
            )}
          </div>
        </div>
      )}
    </ModalRoutingContext.Consumer>    
  );
}

export default Modal;
