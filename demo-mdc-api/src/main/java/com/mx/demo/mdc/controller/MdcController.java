package com.mx.demo.mdc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.demo.mdc.dto.MdcForm;
import com.mx.demo.mdc.dto.MdcUser;
import com.mx.demo.mdc.service.MdcService;

@CrossOrigin(origins = { "http://localhost:8000" }) 
@RestController
public class MdcController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MdcController.class);

	@Autowired
	private MdcService mdcService;

	@PostMapping("/mdc/process")
	public ResponseEntity<?> process(@ModelAttribute MdcForm form) {
		LOGGER.info("INICIO process");
		try {
			// Procesar los datos del formulario
			mdcService.process(form);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		LOGGER.info("FIN process");
		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);

	}
	
	@PostMapping("/mdc/login")
	public ResponseEntity<?> login(@ModelAttribute MdcUser user) {
		LOGGER.info("INICIO login");
		boolean resp;
		try {
			// Validar datos de acceso
			resp = mdcService.login(user);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}		

		LOGGER.info("FIN login");
		return new ResponseEntity<>(resp, HttpStatus.OK);

	}

}
