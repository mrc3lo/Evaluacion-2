// ==========================
// CAPTURAR ELEMENTOS
// ==========================

const formulario = document.getElementById("formulario");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const cargo = document.getElementById("cargo");
const correo = document.getElementById("correo");

const mensaje = document.getElementById("mensaje");

const tabla = document.getElementById("tablaColaboradores");

const busqueda = document.getElementById("busqueda");


// ==========================
// ARREGLO COLABORADORES
// ==========================

const colaboradores = [];


// ==========================
// ID AUTOMATICO
// ==========================

let idActual = 1;


/*
let

Permite modificar valores.

Aquí iremos aumentando:
1
2
3
4
...
*/


// ==========================
// VALIDAR CAMPOS VACIOS
// ==========================

function campoVacio(valor){

    return valor.trim() === "";

}


// ==========================
// VALIDAR CORREO
// ==========================

function correoValido(correoUsuario){

    return correoUsuario.endsWith("@empresa.cl");

}


// ==========================
// MOSTRAR MENSAJES
// ==========================

function mostrarMensaje(texto, tipo){

    mensaje.textContent = texto;

    mensaje.className = tipo;

}


// ==========================
// RENDERIZAR TABLA
// ==========================

function renderizarTabla(lista){

    tabla.innerHTML = "";

    lista.forEach(function(colaborador){

        tabla.innerHTML += `
        
            <tr>

                <td>${colaborador.nombre}</td>

                <td>${colaborador.apellido}</td>

                <td>${colaborador.cargo}</td>

                <td>${colaborador.correo}</td>

                <td>
                    <button 
                        class="btn-eliminar"
                        onclick="eliminarColaborador(${colaborador.id})"
                    >
                        Eliminar
                    </button>
                </td>

            </tr>

        `;

    });

}


/*
onclick

Ejecuta una función
cuando se presiona un botón.
*/


// ==========================
// FILTRAR COLABORADORES
// ==========================

function filtrarColaboradores(){

    const texto = busqueda.value.toLowerCase();

    const filtrados = colaboradores.filter(function(colaborador){

        return(

            colaborador.nombre.toLowerCase().includes(texto) ||

            colaborador.cargo.toLowerCase().includes(texto)

        );

    });

    renderizarTabla(filtrados);

}


// ==========================
// ELIMINAR COLABORADOR
// ==========================

function eliminarColaborador(id){

    /*
    filter()

    creará un nuevo arreglo
    SIN el colaborador eliminado
    */

    const nuevaLista = colaboradores.filter(function(colaborador){

        return colaborador.id !== id;

    });


    // limpiar arreglo original
    colaboradores.length = 0;

    // volver a llenar
    nuevaLista.forEach(function(colaborador){

        colaboradores.push(colaborador);

    });

    // actualizar tabla
    renderizarTabla(colaboradores);

}


/*
!==

significa:
"diferente de"
*/


// ==========================
// EVENTO BUSQUEDA
// ==========================

busqueda.addEventListener("keyup", filtrarColaboradores);


// ==========================
// EVENTO SUBMIT
// ==========================

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    // ==========================
    // VALIDACIONES
    // ==========================

    if(
        campoVacio(nombre.value) ||
        campoVacio(apellido.value) ||
        campoVacio(cargo.value) ||
        campoVacio(correo.value)
    ){

        mostrarMensaje(
            "Todos los campos son obligatorios.",
            "error"
        );

        return;
    }

    if(!correoValido(correo.value)){

        mostrarMensaje(
            "El correo debe terminar en @empresa.cl",
            "error"
        );

        return;
    }

    // ==========================
    // CREAR OBJETO
    // ==========================

    const colaborador = {

        id: idActual,

        nombre: nombre.value,

        apellido: apellido.value,

        cargo: cargo.value,

        correo: correo.value

    };


    // ==========================
    // AUMENTAR ID
    // ==========================

    idActual++;


    /*
    ++

    aumenta en 1
    */


    // ==========================
    // GUARDAR
    // ==========================

    colaboradores.push(colaborador);

    // ==========================
    // ACTUALIZAR TABLA
    // ==========================

    renderizarTabla(colaboradores);

    // ==========================
    // MENSAJE
    // ==========================

    mostrarMensaje(
        "Colaborador registrado correctamente.",
        "exito"
    );

    // ==========================
    // LIMPIAR FORMULARIO
    // ==========================

    formulario.reset();

});