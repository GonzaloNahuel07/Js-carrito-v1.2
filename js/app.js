// Seleccionamos los elementos que vamos a utilizar y crearemos fragment
const carrito = document.getElementById("carrito");
const template = document.querySelector(".template");
const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll(".card .btn");

//Ahora voy a crear un objeto que sera donde se iran almacenando los productos
const carritoObjeto = {}

//Y ahora hare la funcion de agregar al carrito
const agregarAlCarrito = (eventoBoton) => {
    // aqui estamos mostrando que boton esta tocando el usuario
    // console.log(eventoBoton.target.dataset.fruta);
    
    //Ahora lo que hare sera agregar el dataset objetido de los botones al carritoObjeto(). Una forma sencilla es hacer lo que va a ir adentro del carritoObjero()
    const producto = {
        titulo: eventoBoton.target.dataset.fruta,
        id: eventoBoton.target.dataset.fruta,
        cantidad: 1
    }

    //aqui hare que el tema de la cantidad, el numero, sea dinamico y cada vez que toque en algun producto que ya este cargado en el carrito su numero aumento en uno
    if(carritoObjeto.hasOwnProperty(producto.titulo)){
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1
    }


    //ahora empujare mi objeto "producto" dentro del objeto "carritoObjeto", los corchetes los usamos para colocar el nombre de la propiedad del objeto que queremos agregar
    carritoObjeto[producto.titulo] = producto

    // y aqui dentro despues de crear el elemento imprimirCarrito debo ejecutarlo**
    imprimirCarrito(producto);

}
//ahora vamos a imprimir en pantalla todo lo que se vaya giardando en carritoObjeto a través de nuestro template. Para esto debo crear una funcion que se llame imprimirCarrito()**
const imprimirCarrito = (producto) => {

    //para arreglar el error de que se repite la impresion de nuestros productos en el carrito debemos hacer esto
    carrito.textContent = ""; //para que siemrpre comience vacio

    // aqui vamos a transformar el elemento carritoObjeto en un array para poder recorrerlo con forEach
    Object.values(carritoObjeto).forEach( (item) => {
        //ahora estos items los debo imprimir en el template que es donde ire el carrito, pero lo mas importante primero es clonarlo
        const clone =  template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;

        //ahora para evitar el reflow utilizamos el fragment y cargamos el clone
        fragment.appendChild(clone);

    })

    //luego ese fragment con el contenido cargado desde el clone se lo cargamos al carrito donde se imprimira en pantalla al user
    carrito.appendChild(fragment);

}


//Y aqui creare un funcion para recorrer los botones dentro del NodeList, y va a retornar de inmediato el evento de los botones el cual cada vez que se de click ejecutara agregarAlCarrito()
botones.forEach((btn) => btn.addEventListener('click', agregarAlCarrito));