# Proyecto de Gestión de Películas

Este es un proyecto para gestionar una base de datos de películas, permitiendo a los usuarios agregar, editar, eliminar y visualizar películas.

## Características

- **Agregar Películas**: Permite añadir nuevas películas a la base de datos.
- **Editar Películas**: Modifica la información de las películas ya existentes.
- **Eliminar Películas**: Permite eliminar películas de la base de datos.
- **Subir Portada**: Los usuarios pueden subir una imagen que servirá como portada de la película.
- **Agregar Png**: Permite subir una imagen en formato png para efecto hover.
- **Subir Video**: Permite añadir un video que será la película en sí.

## Rutas de la Aplicación

Todas las rutas parten desde `http://localhost:3600/api`.

Aquí están las rutas disponibles para interactuar con la aplicación:

- **Agregar Película**: `POST /guardar-pelicula`  
  Crea una nueva entrada de película en la base de datos. Debes enviar los siguientes datos en el cuerpo de la solicitud:
  - `name`: Nombre de la película.
  - `age`: Fecha de lanzamiento de la película.
  - `duration`: Duración de la película en minutos.
  - `genre`: Género de la película.
  - `description`: Descripción de la película.

- **Obtener Película**: `GET /pelicula/:id`  
  Obtiene los detalles de una película específica. Reemplaza `:id` con el identificador de la película.

- **Listado de Películas**: `GET /listado`  
  Obtiene una lista de todas las películas en la base de datos.

- **Actualizar Película**: `POST /update/:id`  
  Actualiza la información de una película existente. Reemplaza `:id` con el identificador de la película.

- **Eliminar Película**: `DELETE /delete/:id`  
  Elimina una película específica de la base de datos. Reemplaza `:id` con el identificador de la película.

- **Subir Imagen (Portada)**: `POST /subir-imagen/:id`  
  Sube una imagen para usar como portada de la película. La imagen debe ser enviada con el nombre `image`. Reemplaza `:id` con el identificador de la película.

- **Subir PNG para Efecto Visual**: `POST /subir-png/:id`  
  Sube un archivo PNG que se usará para el efecto visual al pasar el mouse sobre la portada. La imagen PNG debe ser enviada con el nombre `png`. Reemplaza `:id` con el identificador de la película.

- **Subir Video**: `POST /subir-video/:id`  
  Sube un video que será el contenido principal de la película. El video debe ser enviado con el nombre `video`. Reemplaza `:id` con el identificador de la película.

## Imágenes de Referencia

<img src="https://github.com/user-attachments/assets/64884382-fc65-48c5-a484-a3085e493910">
<hr>
<img src="https://github.com/user-attachments/assets/4c74f105-1942-44eb-9efc-d183e1c2f632">
<hr>
<img src="https://github.com/user-attachments/assets/0fd6361c-68ce-4f10-91fe-13e7f2ea656f">
<hr>
<img src="https://github.com/user-attachments/assets/7cb3dbf9-7236-40d5-a11a-7eba0e26ebef">
<hr>
<img src="https://github.com/user-attachments/assets/75cb5602-4291-4736-82c5-12f50ebdcb6a">
<hr>
<img src="https://github.com/user-attachments/assets/afc9ded8-bf91-4d89-9678-0a0a825c433f">



