

////////////////    Variables y Arrays   //////////////////////

console.dir(document.body);

let tipo="";
let duracionMinima=0;
let duracionMaxima=15;

let inputTipo = document.getElementById("tipo_maraton");
let inputDuracionMinima = document.getElementById("duracion_minima");
let inputDuracionMaxima = document.getElementById("duracion_maxima");

inputTipo.onchange = () => {tipo = inputTipo.value};
inputDuracionMinima.onchange = () => {duracionMinima = inputDuracionMinima.value};
inputDuracionMaxima.onchange = () => {duracionMaxima = inputDuracionMaxima.value};

let listaSeries=[
    {nombre : "Bodyguard", capitulos:"13", duracion:4},
    {nombre : "The Mandalorian", capitulos:"16", duracion:12},
    {nombre : "Mindhunter temporada 1", capitulos:"10", duracion:10},
    {nombre : "The Boys temporada 1", capitulos:"8", duracion:8},
    {nombre : "Stranger Things temporada 1", capitulos:"8", duracion:7},
    {nombre : "Mr Robot temporada 1", capitulos:"10", duracion:8},
    {nombre : "Rick And Morty temporada 1", capitulos:"11", duracion:4},
    {nombre : "Chernobyl", capitulos:"5", duracion:5}
]

let ListaAnimes=[
    {nombre : "Fullmetal Alchemist: Brotherhood", capitulos:"64", duracion:21},
    {nombre : "Mob Psycho 100", capitulos:"26", duracion:8},
    {nombre : "Death Note", capitulos:"37", duracion:12},
    {nombre : "Record of Ragnarok", capitulos:"13", duracion:4},
    {nombre : "Dr. Stone", capitulos:"24", duracion:8},
    {nombre : "Arakawa Under the Bridge", capitulos:"13", duracion:4},
    {nombre : "Bakuman", capitulos:"25", duracion:8},
    {nombre : "Kill la Kill", capitulos:"24", duracion:8},
    {nombre : "Death Parade", capitulos:"13", duracion:4}
]

/////////////////////////////////////////////////////////////
////////////////    Clases y Objetos   //////////////////////

class AnimeSerie{
    constructor(nombre,capitulos,duracion){
        this.nombre = nombre;
        this.capitulos = capitulos;
        this.duracion = duracion;
    }

    mostrarInfo(){

        let mensaje = document.getElementById("maraton_mensaje");
        let titulo = document.getElementById("maraton_titulo");
        let capitulos = document.getElementById("maraton_capitulos");
        let duracion = document.getElementById("maraton_duracion");

        mensaje.innerText = "TE RECOMENDAMOS VER"
        titulo.innerText = this.nombre;
        capitulos.innerText = "Capitulos: " + this.capitulos;
        duracion.innerText = "Duracion: " + this.duracion + " Horas aproximadamente";
    }

    tieneDuracionPedida(min, max){
        if ((this.duracion >= min) && (this.duracion < max)) {
            return true;
        }else{
            return false;
        }
    }

};


//////////////////////////////////////////////////////
////////////////    Funciones   //////////////////////

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

function filtarPoDuracion(lista, min , max) {

    let maratonRespuesta=[];

    for(const contenido of lista){
        console.log(contenido)
        if ((contenido.duracion >= min) && (contenido.duracion < max)) {
            maratonRespuesta.push(contenido);
        }
    }
    console.log("log de la lista despues de buscar las duraciones");
    console.log(maratonRespuesta);

    return maratonRespuesta;
}

//////////////////////////////////////////////////////////////
////////////////    Funcion Principal   //////////////////////

function devolverMaraton() {

    let maraton=[];

    console.log("maraton al inicio ");
    console.log(maraton);

    //primero me fijo que los datos ingredaos sean validos
    if (duracionMinima.value >= duracionMaxima.value) {
        return alert("Los valores ingresados para la duracion de la maraton son invalidos");
    }



    //si los datos son validos, asignos los valores a las variables y las uso para encontrar una serie o anime para ver

    maraton = filtrarPorTipo(tipo);
    console.log("maraton despues de buscar por tipos");
    console.log(maraton);
    maraton = filtarPoDuracion(maraton, duracionMinima, duracionMaxima);
    console.log("maraton despues de buscar por duracion");
    console.log(maraton);


    //con los valores de la serie o anime creo un objeto maraton para que mostrar los datos
    if (maraton.length == 0) {
        alert("no a sido posible encontrar una maraton con las opciones seleccionadas")
    }else{
        let maratonCreada = new AnimeSerie(maraton[0].nombre,maraton[0].capitulos,maraton[0].duracion);
        maratonCreada.mostrarInfo();
    }
    

}



