# Sistema de reservas y gestión

Aplicación web en desarrollo para administrar reservas de recursos y los datos relacionados con usuarios y pagos. El proyecto busca centralizar la gestión de disponibilidad, horarios y capacidad de los recursos, así como facilitar el seguimiento de las reservas.

El sistema está pensado para que un negocio pueda organizar en un solo lugar los recursos que ofrece y las solicitudes de reserva de sus clientes. Cada recurso puede incluir información como nombre, descripción, capacidad, precio y estado, para que la gestión tenga en cuenta tanto sus características como su disponibilidad.

El flujo de una reserva relaciona a un usuario con un recurso, una fecha, un horario de inicio y finalización y la cantidad de personas. Desde el backend se contempla comprobar que el usuario exista y evitar más de una reserva para el mismo usuario y día. Las reservas también pueden administrarse y vincularse con pagos, lo que permite mantener organizada la información de cada operación.

El propósito es simplificar tareas habituales de gestión: mantener un registro de usuarios y recursos, organizar las reservas y sus horarios, y consultar los pagos asociados. Está orientado a negocios que necesitan coordinar el uso de espacios, instalaciones u otros recursos reservables.

## Módulos del proyecto

- **Usuarios:** registro, inicio de sesión y administración de cuentas. El backend incluye cifrado de contraseñas y generación de tokens de autenticación.
- **Recursos:** operaciones para crear, consultar y eliminar recursos con datos como descripción, capacidad, precio y estado.
- **Reservas:** lógica para crear, consultar, actualizar y eliminar reservas, asociándolas con usuarios, recursos, fechas y horarios.
- **Pagos:** operaciones para registrar, consultar, actualizar y eliminar pagos vinculados a reservas.

## Tecnologías

- **Frontend:** React y Vite.
- **Backend:** Node.js y Express.
- **Base de datos:** MongoDB mediante Mongoose.
- **Autenticación:** bcryptjs y JSON Web Tokens.

El proyecto todavía está en desarrollo. La interfaz de usuario y la integración completa de los módulos del backend están pendientes, por lo que las funciones descritas representan el alcance previsto y la lógica presente en el código, no una aplicación terminada.