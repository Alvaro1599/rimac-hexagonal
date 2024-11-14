#  Serverless - Backend TypeScript - Rimac 

## Estructura del proyecto
![alt text](https://alvarobuckettest123.s3.amazonaws.com/architecture-alvaro.png)
- [`/iac`](./iac): Esta carpeta contiene la configuración de Infraestructura como código (IaC) en este caso Serverless.
- [`/src/name_module/`](./src): El directorio contiene el código fuente de la API (backend) del proyecto. Este directorio está organizado en varios subdirectorios, cada uno con su finalidad específica:
    - `aplication` : Contiene la capa de aplicación de la API, incluidos casos de uso, validadores, DTO y funciones de utilidad. Es responsable de procesar la entrada, ejecutar la lógica empresarial y generar respuestas.
    - `domain` : Contiene la capa de dominio de la API, incluidos modelos de dominio, repositorios, etc. Esta capa representa la lógica empresarial central y las reglas de la aplicación.
    - `infrastructure` : Contiene la capa de infraestructura de la API, que incluye adaptadores, entidades, controladores, proveedores y repositorios. Esta capa es responsable de implementar y conectar la capa de dominio a servicios.
    - `domain` : Contiene los componentes de la Capa de Dominio del proyecto. La capa de dominio es responsable de representar los conceptos, reglas y lógica de negocio centrales de la aplicación.
    - `presentation` : Contiene los componentes de la Capa de Aplicación del proyecto. La Capa de Aplicación es responsable de coordinar la actividad de la aplicación, actuando como un puente entre la Capa de Dominio y la Capa de Infraestructura.

## Intrucciones para la instalación

> **Requerimientos**: NodeJS `(v.18.18.0)` para instalar las dependencias es necesario usar Yarn`(v1.22.19)`.

- Ejecutar `yarn` para instalar todas las dependencias

## Comandos
- > **Es necesario hacer el deploy de la infraestructura en AWS**: `yarn deploy`, para poder crear la tabla en dynamoDB y usarla en la aplicación offline.
- > **Compilar y correr el proyecto en entorno local:**:  `yarn offline` se hace la compilación en la carpeta [`/esbuild`](./.esbuild)
- > **Ejecutar los test de forma local**:`yarn test`
- > ***Importante***! Se debe tener el puerto 3000 libre o si no se debe especificar en la variable de entorno `PORT`

***Made by Alvaro :)***

