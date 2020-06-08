import React, { Component } from 'react';

class FormDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: this.props.location.state.datos,
            fileName: this.props.location.state.archivo,
        }
    }

    render() {
        return (
            <div className="formWrapper">
                <header className="baseFormHeader">
                    <h4 className="baseFormHeading">Datos de la solicitud</h4>
                </header>
                <table className="table table-bordered" style={{ width: '80%' }}>
                    <tbody>
                        <tr>
                            <td><label >Nombre del Proceso</label></td>
                            <td>{this.state.formData.nombreProceso}</td>
                        </tr>
                        <tr>
                            <td><label>Tipo captación</label></td>
                            <td>{this.state.formData.tipoCaptacion}
                            </td>
                        </tr>
                        <tr>
                            <td><label>Incluir Can</label></td>
                            <td>{this.state.formData.canFlag}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="archivoCuentas">Archivo de cuentas</label></td>
                            <td>{this.state.fileName}</td>
                        </tr>
                        <tr>
                            <td><label htmlFor="tipoScore">Tipo de score</label></td>
                            <td> {this.state.formData.tipoScore}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default FormDetail;