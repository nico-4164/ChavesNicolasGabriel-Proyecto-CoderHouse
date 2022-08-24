


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Variables y Arrays   ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.dir(document.body);

let tipo="";
let duracionMinima=0;
let duracionMaxima=15;
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


// creo arrays con las series y animes //
let series=[
    {nombre : "Bodyguard", capitulos:"13", duracion:4,imagen:"https://i.imgur.com/3jx6Y8b.png",link:"https://www.netflix.com/es/title/80235864"},
    {nombre : "The Mandalorian", capitulos:"16", duracion:12,imagen:"https://i.imgur.com/PQGvHTD.jpg",link:"https://www.disneyplus.com/es-419/series/the-mandalorian/3jLIGMDYINqD"},
    {nombre : "Mindhunter temporada 1", capitulos:"10", duracion:10,imagen:"https://i.imgur.com/L23VRzh.jpg",link:"https://www.netflix.com/es/title/80114855"},
    {nombre : "The Boys temporada 1", capitulos:"8", duracion:8,imagen:"https://i.imgur.com/eLJMgYp.jpg",link:"https://www.primevideo.com/detail/0KRGHGZCHKS920ZQGY5LBRF7MA/ref=atv_dp_season_select_s1"},
    {nombre : "Stranger Things temporada 1", capitulos:"8", duracion:7,imagen:"https://i.imgur.com/5dvQYiG.jpg",link:"https://www.netflix.com/es/title/80057281"},
    {nombre : "Mr Robot temporada 1", capitulos:"10", duracion:8,imagen:"https://i.imgur.com/DDk03v8.jpg",link:"https://www.primevideo.com/detail/0ND5POOAYD6A4THTH7C1TD3TYE/ref=atv_dp_season_select_s1?language=es_ES"},
    {nombre : "Rick And Morty temporada 1", capitulos:"11", duracion:4,imagen:"https://i.imgur.com/2srUl1I.jpg",link:"https://play.hbomax.com/page/urn:hbo:page:GXkRjxwjR68PDwwEAABKJ:type:series"},
    {nombre : "Chernobyl", capitulos:"5", duracion:5,imagen:"https://i.imgur.com/COACINU.jpg",link:"https://play.hbomax.com/page/urn:hbo:page:GXJvkMAU0JIG6gAEAAAIo:type:series"}
]
let animes=[
    {nombre : "Fullmetal Alchemist: Brotherhood", capitulos:"64", duracion:21,imagen:"https://i.imgur.com/iPmubwo.jpg",link:"https://www.crunchyroll.com/es/fullmetal-alchemist-brotherhood"},
    {nombre : "Mob Psycho 100", capitulos:"26", duracion:8,imagen:"https://i.imgur.com/aTAqXeO.jpg",link:"https://www.crunchyroll.com/es/mob-psycho-100"},
    {nombre : "Death Note", capitulos:"37", duracion:12,imagen:"https://i.imgur.com/eC69fXU.jpg",link:"https://www.netflix.com/us-es/title/70204970"},
    {nombre : "Record of Ragnarok", capitulos:"13", duracion:4,imagen:"https://i.imgur.com/OFDDwUd.jpg",link:"https://www.netflix.com/title/81281579"},
    {nombre : "Dr. Stone", capitulos:"24", duracion:8,imagen:"https://i.imgur.com/zCHwFRQ.jpg",link:"https://www.crunchyroll.com/es/dr-stone"},
    {nombre : "Arakawa Under the Bridge", capitulos:"13", duracion:4,imagen:"https://i.imgur.com/XQXccL9.jpg",link:"https://www.crunchyroll.com/es/arakawa-under-the-bridge"},
    {nombre : "Bakuman", capitulos:"25", duracion:8,imagen:"https://i.imgur.com/1weCaTG.jpg",link:"https://www.hulu.com/series/bakuman-1227fee0-4b9c-4250-843a-0b6d7ea57d61"},
    {nombre : "Kill la Kill", capitulos:"24", duracion:8,imagen:"https://i.imgur.com/iwUwDyx.jpg",link:"https://www.crunchyroll.com/es/kill-la-kill"},
    {nombre : "Death Parade", capitulos:"13", duracion:4,imagen:"https://i.imgur.com/DcIpZrV.jpg",link:"https://www.crunchyroll.com/es/death-parade"}
]

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
    }

    tieneDuracionPedida(min, max){
        if ((this.duracion >= min) && (this.duracion < max)) {
            return true;
        }else{
            return false;
        }
    }

};

// creo las listas de objetos que se van a usar //
let ListaAnimes = devolverListaDeObjetos(animes);
let listaSeries = devolverListaDeObjetos(series);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////    Funciones   //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// funcion para guardar las series y animes en un array de objetos y asi poder usar los metodos de clase //
function devolverListaDeObjetos(lista) {
    let listaDeObjetos=[];
    for (let i = 0; i < lista.length; i++) {
        let objeto = new AnimeSerie(lista[i].nombre,lista[i].capitulos,lista[i].duracion,lista[i].imagen,lista[i].link);
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

    if (maraton.length == 0) {
        contenedorResultado.innerHTML = 
        `<div class="card ${estiloCarta}" style="width: 18rem;">
            <img class="card-img-top" src="https://i.imgur.com/kM3lpVA.png" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">Lo sentimos, no fue posible encontrar una maraton con los datos solicitados</p>
            </div>
         </div>`
    }else{
        contenedorResultado.innerHTML = 
        `<div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col" style="max-width: 25rem;">
                <div class="card h-100">
                    <div class="card-body ${estiloCarta}">
                        <h5 class="card-title">${maraton[0].nombre}</h5>
                        <img src="${maraton[0].imagen}" class="card-img-top">
                        <p class="card-text">Capitulos: ${maraton[0].capitulos}</p>
                        <p class="card-text">Duracion: ${maraton[0].duracion} Horas aproximadamente</p>
                    </div>
                    <div class="card-footer" style="text-align:center;font-size: 2em;">
                        <small class="text-muted"><a href="${maraton[0].link}" class="card-link">Ver Online</a></small>
                    </div>
                </div>
            </div>
        </div>`;
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
    console.log("entro en el if de modo oscuro");
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
    if (duracionMinima.value >= duracionMaxima.value) {
        return alert("Los valores ingresados para la duracion de la maraton son invalidos");
    }

    //si los datos son validos, asignos los valores a las variables y las uso para encontrar una serie o anime para ver
    maraton = filtrarPorTipo(tipo);
    maraton = filtarPoDuracion(maraton, duracionMinima, duracionMaxima);

    //con los valores de la serie o anime creo un objeto maraton para que mostrar los datos
    crearCartaResultado(maraton);
    

}



