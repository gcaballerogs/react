# Demo de React

Prueba de concepto de front-end construido con React. Consume un Java API REST como back-end.

## Ejecución

Para poder ejecutar la aplicación localmente se requiere tener instalado Node.js =>
https://nodejs.org/en/download/

Una vez que se tenga instalado Node.js, realizar lo siguiente:

1. Clonar el proyecto: ```git clone [repository url]```

2. Ubicarse en la carpeta del proyecto ```cd [local repository]```

3. Validar que el archivo package.json contiene una sección como la siguiente:
```
...

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
...
```
4. Eliminar el directorio **node_modules** y los archivos **package-lock.json** o **yarn.lock**, si es que existen.

5. Ejecutar la instrucción: ```npm install```

6. Ejecutar la instrucción: ```npm start```