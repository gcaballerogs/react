import React from "react";
import { Redirect } from 'react-router-dom';
import isLoggedIn from '../helpers/is_logged_in';
import { useFormik } from 'formik';
import MdcService from '../service/MdcService';


const validate = values => {
    const errors = {};
    if (!values.nombreProceso) {
        errors.nombreProceso = 'El campo es requerido';
    } else if (values.nombreProceso.length > 10) {
        errors.nombreProceso = 'El campo debe contener máximo 10 caracteres';
    }

    if (!values.archivoCuentas) {
        errors.archivoCuentas = 'El archivo es requerido';
    }

    if(!values.tipoScore){
        errors.tipoScore = 'El tipo de score es requerido';
    }

    return errors;
};


const MdcForm = (props) => {

    const formik = useFormik({
        initialValues: {
            nombreProceso: '',
            tipoCaptacion: 'filtroLey',
            canFlag: 'false',
            archivoCuentas: null,
            tipoScore: '',
        },
        validate,
        onSubmit: values => {
            /*console.log({ 
                fileName: values.archivoCuentas.name, 
                type: values.archivoCuentas.type,
                size: `${values.archivoCuentas.size} bytes`
              })*/
            const formData = new FormData();
            formData.append("nombreProceso", values.nombreProceso);
            formData.append("tipoCaptacion", values.tipoCaptacion);
            formData.append("canFlag", values.canFlag);
            formData.append("tipoScore", values.tipoScore);
            formData.append("archivoCuentas", values.archivoCuentas);

            MdcService.sendForm(formData).then(
                response => {
                console.log("MdcForm | Respuesta del API = " + response.data);
                if (response.data === "SUCCESS"){
                    props.history.push({
                        pathname: '/detalle',
                        state: {datos: values, archivo: values.archivoCuentas.name },
                    })
                }
                    
            })
        },
    });
    
    if (!isLoggedIn()) {
        return (<Redirect to="/login" />);
    }

    return (
        <div className="formWrapper">
            <header className="baseFormHeader">
                <h4 className="baseFormHeading">Solicitud de MDC</h4>
            </header>
            <form onSubmit={formik.handleSubmit}>
                <table className="table table-bordered" style={{ width: '80%' }}>
                    <tbody>
                        <tr>
                            <td><label htmlFor="nombreProceso">Nombre del Proceso</label></td>
                            <td><input
                                type="text"
                                id="nombreProceso"
                                name="nombreProceso"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombreProceso}
                                className={
                                    formik.errors.nombreProceso && formik.touched.nombreProceso
                                        ? "form-control error"
                                        : "form-control"
                                }
                            />
                                {formik.touched.nombreProceso && formik.errors.nombreProceso ? (
                                    <div className="input-feedback">{formik.errors.nombreProceso}</div>
                                ) : null}</td>
                        </tr>
                        <tr>
                            <td><label>Tipo captación</label></td>
                            <td>
                                <input
                                    type="radio"
                                    id="tipoCaptacion_1"
                                    value="filtroLey"
                                    name='tipoCaptacion'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.tipoCaptacion === "filtroLey"}
                                />
                                <span>Filtros de ley</span>
                                <br />
                                <input
                                    type="radio"
                                    id="tipoCaptacion_2"
                                    value="datosGen"
                                    name='tipoCaptacion'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.tipoCaptacion === "datosGen"}
                                />
                                <span>Datos generales</span>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Incluir Can</label></td>
                            <td>
                                <input
                                    type="radio"
                                    id="noCan"
                                    value="false"
                                    name='canFlag'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.canFlag === "false"}
                                />
                                <span>No</span>
                                <br />
                                <input
                                    type="radio"
                                    id="siCan"
                                    value="true"
                                    name='canFlag'
                                    onChange={formik.handleChange}
                                    defaultChecked={formik.values.canFlag === "true"}
                                />
                                <span>Si</span>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="archivoCuentas">Archivo de cuentas</label></td>
                            <td><input
                                type="file"
                                id="archivoCuentas"
                                name="archivoCuentas"
                                onChange={(event) => {
                                    formik.setFieldValue("archivoCuentas", event.currentTarget.files[0]);
                                }}
                                className={
                                    formik.errors.archivoCuentas && formik.touched.archivoCuentas
                                        ? "form-control-file error"
                                        : "form-control-file"
                                }
                            />
                                {formik.touched.archivoCuentas && formik.errors.archivoCuentas ? (
                                    <div className="input-feedback">{formik.errors.archivoCuentas}</div>
                                ) : null}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="tipoScore">Tipo de score</label></td>
                            <td>
                                <select
                                    id="tipoScore"
                                    name="tipoScore"
                                    value={formik.values.tipoScore}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.tipoScore && formik.touched.tipoScore
                                            ? "form-control-file error"
                                            : "form-control-file"
                                    }
                                >
                                    <option value="" label="Selecciona un score..." />
                                    <option value="bc_score">BC score</option> 
                                    <option value="tc_score">TC score</option>
                                    <option value="mix_score">Mix score</option>
                                </select>
                                {formik.touched.tipoScore && formik.errors.tipoScore ? (
                                    <div className="input-feedback">{formik.errors.tipoScore}</div>
                                ) : null}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={formik.handleReset}
                >Limpiar</button>
                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Enviar</button>
            </form>
        </div>
    );
};

export default MdcForm