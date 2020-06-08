import React from 'react';
import store from 'store';
import { Redirect } from 'react-router-dom';
import isLoggedIn from '../helpers/is_logged_in';
import { Formik } from "formik";
import MdcService from '../service/MdcService';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
      errorMsg: '',
    }

    this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validate(values) {
    const errors = {};
    if (!values.username) {
      errors.username = 'El usuario es requerido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    }

    return errors;
  }

  onSubmit(values) {
    const { history } = this.props;

    this.setState({ error: false, username: values.username, password: values.password });

    const formData = new FormData();
    formData.append("userName", this.state.username);
    formData.append("pwd", this.state.password);

    MdcService.validateLogin(formData).then(
      response => {
        console.log("Login | Respuesta del API = " + response.data);

        if (!response.data) {
          console.log("username = " + this.state.username);
          console.log("password = " + this.state.username);
          return this.setState({ error: true, errorMsg: 'Usuario y/o contraseña invalidos !!' });
        }

        store.set('loggedIn', true);
        history.push('/form');
      })
  }

  render() {
    let { username, password, error, errorMsg } = this.state

    if (isLoggedIn()) {
      return <Redirect to="/form" />;
    }

    return (
      <div className="formWrapper">
        <header className="baseFormHeader">
          <h4 className="baseFormHeading">Login</h4>
        </header>
        <Formik
          initialValues={{ username, password, error, errorMsg }}
          onSubmit={this.onSubmit}
          validateOnChange={false}
          validateOnBlur={true}
          validate={this.validate}
          enableReinitialize={true}
        >
          {
            (props) => (
              <div>
                <form onSubmit={props.handleSubmit}>
                  {props.values.error ? (
                    <div className="alert alert-warning">{props.values.errorMsg}</div>
                  ) : null}

                  <table className="table" style={{ width: '50%' }}>
                    <tbody>
                      <tr>
                        <td><label htmlFor="username">Usuario</label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.username}
                            className={
                              props.errors.username && props.touched.username
                                ? "form-control error"
                                : "form-control"
                            }
                          />
                          {props.touched.username && props.errors.username ? (
                            <div className="input-feedback">{props.errors.username}</div>
                          ) : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label htmlFor="password">Contraseña</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            className={
                              props.errors.password && props.touched.password
                                ? "form-control error"
                                : "form-control"
                            }
                          />
                          {props.touched.password && props.errors.password ? (
                            <div className="input-feedback">{props.errors.password}</div>
                          ) : null}
                        </td>
                      </tr>
                    </tbody></table>
                  <button type="submit" className="btn btn-primary" disabled={props.isSubmitting}>Ingresar</button>
                </form>
              </div>
            )
          }
        </Formik>

      </div>
    )
  }
}

export default Login;
