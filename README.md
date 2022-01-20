# Proyecto E-commerce - El Librero.
<br>
<br>

# Funcionalidad de la Aplicación.

### - Inicio: 
<br>
    
Mutesra el listado de libros, los baners con las promos disponibles, los dintintos filtros combinables
<br>
    
    ·Paginado.
    ·Filtrado por idioma (ing, esp).
    ·Filtrado por categoría de género.
    ·Buscar por nombre de producto (mínimo 2 caracteres).
    ·Ordenamiento ascendente y descendente (precio, alfabéticamente).
    ·Buscador: Se puede buscar por nombre de autor o del libro (efecto debounce).
    ·Filtrado por rango de precio (validacion: precio min < precio mayor).
 <br>
 <br>

### - Detalles de Producto:
<br>
Muestra el stock del producto, un breve resumen de el, y sus datos ( autor, año de publicacion y editorial) y boton de compra para agregar al carrito
<br>
<br>

### - Carro de Compras:
<br>
Muestra el listado de los productos agregados y modificar la cantidad de ellos, eliminar el producto o el carrito completo, muestra el precio final incluyendo los descuentos ya aplicados
<br>
<br>
  
    ·Boton borar item.
    ·Borrar carro completo.
    ·Muestra el precio final.
    ·Agregar o eliminar un producto.
    ·Boton para confirmar la compra ( redirige a la pagina de pago)
<br>
<br>

### - Pasarela de Pago:
<br>

Muestra el listado de productos a pagar, el precio de cada unop y el total y el total del descuento, presenta un formulario a llenar para la realizacion de pago, tiene datos requeridos como direccion, nombre completo, numero de tarjeta, codigo de seguridad y fecha de caducidad, numero de documento. Al finalizar el pago el usuario recibiora un correo con la informacion del pago si se aprobo o no, y el dueño un correo informando la compra.
<br>
<br>

### - Login y registro:
<br>
Permite al usuario crear una cuenta con su cuenta de Google con solo un click o crearlo manuelamente, lo mismo ocurre con el login puede iniciar con su usuario y password o conm Google, al iniciar seccion va a poder acceder a la pagina de pago de su carrito de compras, su historial de compras, y su perfil
<br>
<br>
  
    ·Crear usuario manualmente o con Google.
    ·Logearse manualmente o con Google.

<br>
<br>

### - Pantalla de Usuario (opciones):
<br>
Dependiento del status del usuario ( administrador, o usuario comun) se renderizaran las opciones disponibles, entre ellas su perfil e historial de compras 
<br>
<br>

     - Usuario Comun:
     
        ·Historial de compras y el estado de las mismas.
        ·Perfil de usuario, editable (foto de perfil).
        ·Acceso a la pagina de pago.
    
     - Administrador:
     
        ·Historial de compras de todos los usuarios (puede modificar su estado).
        ·Edicion de pagina y productos; Puede editar, agregar o eliminar productos o las categorias por medio de un formulario.
        ·Perfiles de usuario; tiene acceso al listado de usuarios registrados, puede bloquearlos o modificar su estatus a administrador.
        ·Creacion de promociones; Puede crear promociones mediante un formulario, debe de elegir las categorias, fechas y porcentaje de descuento.

<br>
<br>

### - Tiendas:
<br>
Esta ultima parte muestra un mapa interactivo que le permite al usuario ver las sedes de la empresa y buscar la mas cercana a el con solo un click
<br>
<br>


# Tecnologías Utilizadas.
<br>

    · SASS.
    · HTML.
    · React.
    · Redux.
    · Express.
    · MongoDb.
    · Mongoose.
    · NodeJs.
    · Javascript.

<br>
<br>

### Clonar Repositorio.

<br>

    · git clone https://github.com/andreajhl/e-commerce-front.git
<br>
<br>

### Probar Aplicación.

<br>

    · Ingresar a la carpeta del proyecto desde tu editor de codigo favorito.
    · Abre la consola del proyecto.
    · ejecute los comandos npm i.
    · Al culminar la instalacion ejecute 'npm start' para arrancar el proyecto.
    
<br>

## Video de Muestra
<br>

[![Alt text](https://img.youtube.com/vi/Oz77ZNfxCHs/2.jpg)](https://www.youtube.com/watch?v=Oz77ZNfxCHs)


