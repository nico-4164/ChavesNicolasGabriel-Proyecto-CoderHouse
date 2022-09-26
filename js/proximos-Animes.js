


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Variables y Arrays   ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let tema = "claro";
let estiloCarta = "estilo-carta-claro";


let botonTema = document.getElementById("botonTema");

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
    constructor(nombre,capitulos,duracion,imagen,link,fecha){
        this.nombre = nombre;
        this.capitulos = capitulos;
        this.duracion = duracion;
        this.imagen = imagen;
        this.link = link;
        this.fecha=fecha;
    }

    tieneDuracionPedida(min, max){
        let duracionTotal= this.capitulos*this.duracion;
        return (duracionTotal >= min) && (duracionTotal < max) ? true : false;
    }

    duracionAproximada(){
        let resultado=(this.capitulos*this.duracion);
        return Math.ceil(resultado);
    }
    
    devolverCapitulos(){
        return (this.capitulos == null) ? "no disponible" : this.capitulos;
    }

    devolverFecha(){
        return (this.fecha == null) ? "no disponible" : this.fecha;
    }


};



// creo las listas de objetos de las series y animes //
const crearListaDeAnime = async() => {

    let URL="https://jikan1.p.rapidapi.com/top/anime/1/upcoming";

    const respuesta = await fetch(URL,opcionesFetch);
    const animes = await respuesta.json();

    return animes.top;
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funciones   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// funcion para filtrar la busqueda por tipo //
async function devolverLista() {

    let listaDeObjetos=[];

    _listaAnimes = await crearListaDeAnime();
    
    for (const elemento of _listaAnimes) {
        let objeto = new Anime(elemento.title,elemento.episodes,0.3,elemento.image_url,elemento.url,elemento.start_date);
        listaDeObjetos.push(objeto);
    }
    return listaDeObjetos;

}


// funcion para crear una card en el html y mostrar la info de la maraton //
async function crearCartaResultado(proximosAnimes) {

    let contenedorResultado = document.getElementById("contenedor-resultados");

    contenedorResultado.innerHTML = "";

    for (const elemento of proximosAnimes) {
        
        contenedorResultado.innerHTML += 
        `
        <div class="col ${estiloCarta}">
            <div class="card h-100">
            <img class="card-img-top" src="${elemento.imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${elemento.nombre}</h5>
                <p class="card-text">Capitulos: ${elemento.devolverCapitulos()}</p>
                <div class="card-footer" style="text-align:center;font-size: 2em;">
                    <p>Fecha de estreno<p>
                    <h3>${elemento.devolverFecha()}<h3>
                </div>
            </div>
            </div>
        </div>`
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

async function devolverProximosAnimes() {

    proximosAnimes = await devolverLista();

    crearCartaResultado(await proximosAnimes);
}

devolverProximosAnimes();


