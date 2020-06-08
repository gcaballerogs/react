package com.mx.demo.mdc.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MdcForm {

	private MultipartFile archivoCuentas;

	private String tipoCaptacion;

	private String nombreProceso;

	private String fechaProceso;

	private String tipoScore;

	private boolean canFlag;

}
