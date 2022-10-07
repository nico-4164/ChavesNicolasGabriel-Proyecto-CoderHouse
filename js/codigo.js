


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
let inputPuntaje = document.getElementById("puntaje_maraton");

let botonTema = document.getElementById("botonTema");
let botonBusqueda = document.getElementById("botonBusqueda");

inputDuracionMinima.onchange = () => {duracionMinima = inputDuracionMinima.value};
inputDuracionMaxima.onchange = () => {duracionMaxima = inputDuracionMaxima.value};
inputGenero.onchange = ()  => {_genero = inputGenero.value}
inputPuntaje.onchange = ()  => {_puntaje = inputPuntaje.value}

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
    constructor(nombre,capitulos,imagen,link,puntaje){
        this.nombre = nombre;
        this.capitulos = capitulos;
        this.imagen = imagen;
        this.link = link;
        this.puntaje=puntaje;
    }

    // multiplico la cantidad de capitulos por 0.3 debido a que cada capitulo dura alrededor de 20 min.
    // y de esta manera obtengo la cantidad aproximada de horas que se tarde en maratonear el anime.

    tieneDuracionPedida(min, max){
        let duracionTotal= this.capitulos*0.3;
        return (duracionTotal >= min) && (duracionTotal < max) ? true : false;
    }

    duracionAproximada(){
        let resultado=(this.capitulos*0.3);
        return Math.ceil(resultado);
    }

    puntajeEsMayor(_puntaje){
        return (this.puntaje > _puntaje) ? true : false;
    }

};



// creo las listas de objetos de las series y animes //
const crearListaDeAnime = async() => {

    let URL="https://api.jikan.moe/v4/anime?genres="+_genero;

    const respuesta = await fetch(URL);
    const animes = await respuesta.json();

    console.log(animes.data)
    return animes.data;
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funciones   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// funcion para filtrar la busqueda por tipo //
async function devolverLista() {

    let listaDeObjetos=[];

    _listaAnimes = await crearListaDeAnime();
    
    for (const elemento of _listaAnimes) {
        let objeto = new Anime(elemento.title,elemento.episodes,elemento.images.jpg.image_url,elemento.url,elemento.score);
        listaDeObjetos.push(objeto);
    }
    return listaDeObjetos;

}



// funcion para filtrar la busqueda por duracion //
function filtar(lista) {

    let maratonRespuesta=[];

    for(const contenido of lista){
        if (contenido.tieneDuracionPedida(duracionMinima,duracionMaxima) && contenido.puntajeEsMayor(_puntaje)) {
            maratonRespuesta.push(contenido);
        }
    }


    return maratonRespuesta;



}



// funcion para crear una card en el html y mostrar la info de la maraton //
async function crearCartaResultado(maraton) {

    let contenedorResultado = document.getElementById("contenedor-resultados");

    contenedorResultado.innerHTML = ""

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
    else if(maraton.length <= 5){
        for (const elemento of maraton) {
            contenedorResultado.innerHTML += 
            `
            <div class="col">
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
    else{
        for (let index = 0; index < 6; index++) {
            
            const elemento = maraton[index];
            contenedorResultado.innerHTML += 
            `
            <div class="col">
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

    if (parseInt(duracionMinima) >= parseInt(duracionMaxima) || (duracionMinima <= 0) || (duracionMaxima <=0)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los valores ingresados para la duracion de la maraton son invalidos',
        })
        return
    }

    //si los datos son validos, asignos los valores a las variables y las uso para encontrar una serie o anime para ver
    maraton = await devolverLista();
    const maratonFinal = filtar(maraton);

    //con los valores de la serie o anime creo un objeto maraton para que mostrar los datos

    crearCartaResultado(await maratonFinal);
    console.log(maratonFinal.length)
}



