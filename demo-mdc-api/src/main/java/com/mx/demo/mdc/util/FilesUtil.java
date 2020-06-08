package com.mx.demo.mdc.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FilesUtil {

	private static final String PATH = File.separator + "repo" + File.separator;

	public static File moveAndStoreFile(MultipartFile file, String name) throws IOException {
		String url = PATH + name;
		File fileToSave = new File(url);
		fileToSave.createNewFile();
		FileOutputStream fos = new FileOutputStream(fileToSave);
		fos.write(file.getBytes());
		fos.close();
		return fileToSave;
	}
}