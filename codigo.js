


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Variables y Arrays   ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.dir(document.body);

let tipo="";
let duracionMinima=0;
let duracionMaxima=0;
let tema = "claro";
let estiloCarta = "estilo-carta-claro";

let inputTipo = document.getElementById("tipo_maraton");
let inputDuracionMinima = document.getElementById("duracion_minima");
let inputDuracionMaxima = document.getElementById("duracion_maxima");

let botonTema = document.getElementById("botonTema");
let botonBusqueda = document.getElementById("botonBusqueda");

inputTipo.onchange = () => {tipo = inputTipo.value};
inputDuracionMinima.onchange = () => {duracionMinima = inputDuracionMinima.value};
inputDuracionMaxima.onchange = () => {duracionMaxima = inputDuracionMaxima.value};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Clases y Objetos   ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// clase principal que voy a usar para crear los contenidos de las maratones //
class AnimeSerie{
    constructor(nombre,capitulos,duracion,imagen,link){
        this.nombre = nombre;
        this.capitulos = capitulos;
        this.duracion = duracion;
        this.imagen = imagen;
        this.link = link;
        this.genero="";
    }

    tieneDuracionPedida(min, max){

        return (this.duracion >= min) && (this.duracion < max) ? true : false;
    }

    esGenero(_genero){
        return this.genero == _genero ? true : false;
    }

};


// creo las listas de objetos de las series y animes //

let ListaAnimes = devolverListaDeObjetos(animes);
let listaSeries = devolverListaDeObjetos(series);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funciones   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// funcion para guardar las series y animes en un array de objetos y asi poder usar los metodos de clase //
function devolverListaDeObjetos(lista) {
    let listaDeObjetos=[];
    for (const elemento of lista) {
        let objeto = new AnimeSerie(elemento.nombre,elemento.capitulos,elemento.duracion,elemento.imagen,elemento.link);
        listaDeObjetos.push(objeto);
    }
    return listaDeObjetos;
}

// funcion para filtrar la busqueda por tipo //
function filtrarPorTipo(tipo) {
    switch (tipo) {
        case "serie":
            return listaSeries;
        case "anime":
            return ListaAnimes;
        default:
            break;
    }
}

// funcion para filtrar la busqueda por duracion //
function filtarPoDuracion(lista, min , max) {

    let maratonRespuesta=[];

    for(const contenido of lista){
        if (contenido.tieneDuracionPedida(min,max)) {
            maratonRespuesta.push(contenido);
        }
    }
    return maratonRespuesta;
}

// funcion para crear una card en el html y mostrar la info de la maraton //
function crearCartaResultado(maraton) {

    let contenedorResultado = document.getElementById("contenedor-resultados");

    Swal.fire({
        title: '¡¡BUSCANDO MARATON!!',
        html: 'El resultado se mostrara en <b></b> milisegundos.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })

    if (maraton.length == 0) {
        contenedorResultado.innerHTML = 
        `<div class="card ${estiloCarta} container" style="margin-right: 40%;margin-left: 40%">
            <img src="https://i.imgur.com/kM3lpVA.png" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">Lo sentimos, no fue posible encontrar una maraton con los datos solicitados</p>
            </div>
         </div>
         `
    }else{
        for (const elemento of maraton) {
            contenedorResultado.innerHTML += 
            `
            <div class="card">
            <img class="card-img-top" src="${elemento.imagen}" alt="Card image cap">
            <div class="card-body ${estiloCarta}">
                <h5 class="card-title">${elemento.nombre}</h5>
                <p class="card-text">Capitulos: ${elemento.capitulos}</p>
                <p class="card-text">Duracion: ${elemento.duracion} Horas aproximadamente</p>
                <div class="card-footer" style="text-align:center;font-size: 2em;">
                    <small class="text-muted"><a href="${elemento.link}" class="card-link">Ver Online</a></small>
                </div>
            </div>
          </div>`;
        }
        
    }
}

// boton para cambiar el tema de la pagina y guardar el resultado en el storage local //
botonTema.onclick=()=>{

    if(tema=="claro"){
        document.body.className="oscuro";
        botonTema.innerText="Modo Claro";
        tema="oscuro";
        estiloCarta = "estilo-carta-oscuro";
        localStorage.setItem("modo-oscuro","true");
    }
    else{
        document.body.className = "claro";
        botonTema.innerText = "Modo Oscuro";
        tema = "claro";
        estiloCarta = "estilo-carta-claro";
        localStorage.setItem("modo-oscuro","false");
    }

}

// compruebo en el storage local si el modo oscuro esta seleccionado //
if (localStorage.getItem("modo-oscuro") === "true") {
    document.body.className="oscuro";
    botonTema.innerText="Modo Claro";
    tema="oscuro";
}else{
    document.body.className = "claro";
    botonTema.innerText = "Modo Oscuro";
    tema = "claro";
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funcion Principal   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function devolverMaraton() {

    let maraton=[];

    //primero me fijo que los datos ingredaos sean validos
    if (parseInt(duracionMinima) >= parseInt(duracionMaxima)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los valores ingresados para la duracion de la maraton son invalidos',
        })
        return
    }

    //si los datos son validos, asignos los valores a las variables y las uso para encontrar una serie o anime para ver
    maraton = filtrarPorTipo(tipo);
    maraton = filtarPoDuracion(maraton, duracionMinima, duracionMaxima);

    //con los valores de la serie o anime creo un objeto maraton para que mostrar los datos
    crearCartaResultado(maraton);
}



