#  Serverless - Backend TypeScript - Culqi 




## Estructura del proyecto
![alt text](https://alvarobuckettest123.s3.amazonaws.com/architecture-alvaro.png)
- [`/iac`](./iac): Esta carpeta contiene la configuración de Infraestructura como código (IaC) en este caso Serverless.
- [`/src/name_module/`](./src): El directorio contiene el código fuente de la API (backend) del proyecto. Este directorio está organizado en varios subdirectorios, cada uno con su finalidad específica:
    - `aplication` : Contiene la capa de aplicación de la API, incluidos casos de uso, validadores, DTO y funciones de utilidad. Es responsable de procesar la entrada, ejecutar la lógica empresarial y generar respuestas.
    - `domain` : Contiene la capa de dominio de la API, incluidos modelos de dominio, repositorios, etc. Esta capa representa la lógica empresarial central y las reglas de la aplicación..
    - `infrastructure` : Contiene la capa de infraestructura de la API, que incluye adaptadores, entidades, controladores, proveedores y repositorios. Esta capa es responsable de implementar y conectar la capa de dominio a servicios.
    - `domain` : Contiene los componentes de la Capa de Dominio del proyecto. La capa de dominio es responsable de representar los conceptos, reglas y lógica de negocio centrales de la aplicación.
    - `presentation` : Contiene los componentes de la Capa de Aplicación del proyecto. La Capa de Aplicación es responsable de coordinar la actividad de la aplicación, actuando como un puente entre la Capa de Dominio y la Capa de Infraestructura.
    
  















## Intrucciones para la instalación

> **Requerimientos**: NodeJS `(v.18.18.0)` para instalar las dependencias es necesario usar Yarn`(v1.22.19)`.

- Ejecutar `yarn` para isntalar todas las dependencias
- Copiar y renombrar el archivo `.env.template` a `.env` y cambiar los valores. Si usa linux puede ejecutar `cp .env.template .env` y modificar los valores por defecto del archivo
- Si prefiere usar docker se tiene instalado docker puede ejecutar el comando `docker compose -f docker-compose-redis-only.yml up -d` debe mantener el valor por defecto de `REDIS_PASSWORD` en el archivo `.env`. En su defecto usar las credenciales de su Base de datos Redis
## Comandos
- > **Compilar y correr el proyecto en entorno local:**:  `yarn sls offline --verbose` se hace la compilación en la carpeta [`/esbuild`](./.esbuild)
- > **Ejecutar los test de forma local**:`yarn test`
- > ***Importante***! Se debe tener el puerto 3000 libre o si no se debe especificar en la variable de entorno `PORT`
## Rutas


`POST | http://localhost:3000/token`

`GET  | http://localhost:4500/card/{token}`

- `Nota 1:` Ambas rutas deben enviar un token de autorización con el formato `Bearer pk_test_cualquierTexto}` 
- `Nota 2:` También existen archivos .http como ayuda puede encontrarlos en [`/http`](./http)

***Made by Alvaro :)***

