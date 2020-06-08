package com.mx.demo.mdc.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.mx.demo.mdc.dto.MdcForm;
import com.mx.demo.mdc.dto.MdcUser;

@Service
public class MdcService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MdcService.class);

	private static Map<String, String> users = new HashMap<String, String>();

	public void process(MdcForm form) {
		LOGGER.info("NombreProceso: " + form.getNombreProceso());
		LOGGER.info("FechaProceso: " + form.getFechaProceso());
		LOGGER.info("isCan: " + form.isCanFlag());
		LOGGER.info("TipoScore: " + form.getTipoScore());
		LOGGER.info("TipoFormatoDatos: " + form.getTipoCaptacion());

		LOGGER.info("Archivo cargado: ");
		LOGGER.info("Nombre : " + form.getArchivoCuentas().getName());
		LOGGER.info("Tipo : " + form.getArchivoCuentas().getContentType());
		LOGGER.info("Nombre original : " + form.getArchivoCuentas().getOriginalFilename());
		LOGGER.info("Tamanio : " + form.getArchivoCuentas().getSize());

		LOGGER.info("Datos: " + form.toString());
	}

	public boolean login(MdcUser user) {
		LOGGER.info("UserName: " + user.getUserName());
		LOGGER.info("Pwd: " + user.getPwd());

		boolean resp = false;

		if (user.getPwd().equalsIgnoreCase(users.get(user.getUserName()))) {
			resp = true;
		}
		LOGGER.info("resp: " + resp);
		return resp;
	}

	static {
		users.put("mdc_admin", "admin");
		users.put("mdc_user", "12345");
	}
}
