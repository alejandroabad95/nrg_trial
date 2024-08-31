## Prueba técnica: Aplicación de gestión de contratos
### Objetivo
Crear una aplicación web que permita al equipo de negocio la gestión de contratos para las distintas commodities 
existentes en la plataforma. El equipo de negocio debe poder realizar las siguientes acciones dentro de la aplicación web.
- Autenticarse
- Cambiar contraseña
- Visualizar los contratos del sistema
- Filtrar los contratos del sistema
- Visualizar los detalles de un contrato seleccionado
- Visualizar los counterparties del sistema

Además de los usuarios de negocio, existe un segundo tipo de usuario denominado, *administrador*, que debe poder acceder a una ruta/s protegida/s única/s para este rol y que le proporcione las siguientes funciones:
- Visualizar todos los usuarios del sistema
- Visualizar todos los principals del sistema

La aplicación web esta orientada a ser usada únicamente en dispositivos de equipos personales, no es necesario 
implementar la plataforma para dispositivos de móviles o tablets.


### Requisitos
Las especificaciones del desarrollo de esta aplicación web para el frontend debe estar desarrollado mediante Next.JS
y su ecosistema de paquetes. La API REST es proporcionada por el equipo y se facilitará información acerca de la misma para explicar como acceder a sus datos y las opciones que proporciona.

Las especificaciones técnicas que deben ser tenidas en cuenta para su desarrollo son las siguientes:
- Configuración y estructura del proyecto, es necesario el uso del *app router*.
- Typescript + SASS, se puede integrar *tailwind* o librerías de componentes (Shacdn, Radix, MUI, Mantine, etc.).
- Sistema de autenticación basado por *Token*, esta capa debe ser integrada mediante *NextAuth*
- Existen tres tipos de roles en la aplicación web
	- *Admin*: Solamente puede acceder a las pantallas y funciones indicadas previamente
	- *User*: Solamente puede acceder a las pantallas y funciones indicadas previamente
	- *No autenticado*: Debe ser redirigido a la pantalla de login cuando intenta acceder a una ruta protegida

Otros aspectos que serán valorados de manera positiva son:
- Arquitectura de estilos utilizada
- Arquitectura del proyecto
- Multilenguaje usando i18n
- Legibilidad y uso de variables
- Uso de componentes
- Alguna animación simple


### API
Esta API de prueba ha sido montada sobre *Python* usando *DRF 3.15.2* y dispone de documentación relacionada a cada acción 
tanto en formato [*swagger*](http://178.33.249.178:8002/api/schema/swagger'ui/) como [*redoc*](http://178.33.249.178:8002/api/schema/redoc/). 

