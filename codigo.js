


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Variables y Arrays   ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let duracionMinima=0;
let duracionMaxima=0;
let tema = "claro";
let estiloCarta = "estilo-carta-claro";

let inputDuracionMinima = document.getElementById("duracion_minima");
let inputDuracionMaxima = document.getElementById("duracion_maxima");
let inputGenero = document.getElementById("genero_maraton");

let botonTema = document.getElementById("botonTema");
let botonBusqueda = document.getElementById("botonBusqueda");

inputDuracionMinima.onchange = () => {duracionMinima = inputDuracionMinima.value};
inputDuracionMaxima.onchange = () => {duracionMaxima = inputDuracionMaxima.value};
inputGenero.onchange = ()  => {_genero = inputGenero.value}

let _listaAnimes;

const opcionesFetch = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5274e925e0mshd826523d60f7471p126585jsnb217be20bab0',
		'X-RapidAPI-Host': 'jikan1.p.rapidapi.com'
	}
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Clases y Objetos   ///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// clase principal que voy a usar para crear los contenidos de las maratones //
class Anime{
    constructor(nombre,capitulos,duracion,imagen,link,puntaje){
        this.nombre = nombre;
        this.capitulos = capitulos;
        this.duracion = duracion;
        this.imagen = imagen;
        this.link = link;
        this.puntaje=puntaje;
    }

    tieneDuracionPedida(min, max){
        let duracionTotal= this.capitulos*this.duracion;
        return (duracionTotal >= min) && (duracionTotal < max) ? true : false;
    }

    duracionAproximada(){
        let resultado=(this.capitulos*this.duracion);
        return Math.ceil(resultado);
    }
    

};



// creo las listas de objetos de las series y animes //
const crearListaDeAnime = async() => {

    let URL="https://jikan1.p.rapidapi.com/genre/anime/"+_genero+"/1";

    const respuesta = await fetch(URL,opcionesFetch);
    const animes = await respuesta.json();

    return animes.anime;
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funciones   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// funcion para filtrar la busqueda por tipo //
async function devolverLista() {

    let listaDeObjetos=[];

    _listaAnimes = await crearListaDeAnime();
    
    for (const elemento of _listaAnimes) {
        let objeto = new Anime(elemento.title,elemento.episodes,0.3,elemento.image_url,elemento.url,elemento.score);
        listaDeObjetos.push(objeto);
    }
    return listaDeObjetos;

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
async function crearCartaResultado(maraton) {
    console.log("log del principio"+maraton.length)

    let contenedorResultado = document.getElementById("contenedor-resultados");

    if (maraton.length == 0) {
        contenedorResultado.innerHTML = 
        `<div class="card ${estiloCarta} container" style="margin-right: 40%;margin-left: 40%">
            <img src="https://i.imgur.com/kM3lpVA.png" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">Lo sentimos, no fue posible encontrar una maraton con los datos solicitados</p>
            </div>
         </div>
         `
    }
    else{
        for (let index = 0; index < 7; index++) {
            
            const elemento = maraton[index];
            console.log(elemento)
            contenedorResultado.innerHTML += 
            `
            <div class="col ${estiloCarta}">
                <div class="card h-100">
                <img class="card-img-top" src="${elemento.imagen}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${elemento.nombre}</h5>
                    <p class="card-text">Capitulos: ${elemento.capitulos}</p>
                    <p class="card-text">Duracion: ${elemento.duracionAproximada()} Horas aproximadamente</p>
                    <div class="card-footer" style="text-align:center;font-size: 2em;">
                        <p>RATING<p>
                        <h3>${elemento.puntaje}<h3>
                    </div>
                </div>
                </div>
            </div>`
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
    estiloCarta = "estilo-carta-oscuro";
}else{
    document.body.className = "claro";
    botonTema.innerText = "Modo Oscuro";
    tema = "claro";
    estiloCarta = "estilo-carta-claro";
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funcion Principal   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function devolverMaraton() {

    let maraton=[];

    //primero me fijo que los datos ingredaos sean validos

    console.log(duracionMinima)
    console.log(duracionMaxima)

    if (parseInt(duracionMinima) >= parseInt(duracionMaxima)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los valores ingresados para la duracion de la maraton son invalidos',
        })
        return
    }

    //si los datos son validos, asignos los valores a las variables y las uso para encontrar una serie o anime para ver
    maraton = await devolverLista();
    console.log(maraton)

    const maratonFinal = filtarPoDuracion(maraton, duracionMinima, duracionMaxima);

    //con los valores de la serie o anime creo un objeto maraton para que mostrar los datos
    console.log(await maratonFinal)
    crearCartaResultado(await maratonFinal);
}



