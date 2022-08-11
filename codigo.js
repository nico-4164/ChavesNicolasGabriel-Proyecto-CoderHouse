

//Variables y Arrays

let esAnime;
let esMaratonCorta;

const tiposDeMaraton = ["serie","anime"];
const duracionesDeMaraton = ["corta","larga"];

let series=[
    {nombre : "Bodyguard", capitulos:"13", duracion:4},
    {nombre : "The Mandalorian", capitulos:"16", duracion:12},
    {nombre : "Mindhunter temporada 1", capitulos:"10", duracion:10},
    {nombre : "Chernobyl", capitulos:"5", duracion:5}
]

let animes=[
    {nombre : "Mob Psycho 100", capitulos:"26", duracion:8},
    {nombre : "Death Note", capitulos:"37", duracion:12},
    {nombre : "Record of Ragnarok", capitulos:"13", duracion:4},
    {nombre : "Death Parade", capitulos:"13", duracion:4}
]


// Clases y Objetos

class AnimeSerie{
    constructor(nombre,capitulos,duracion){
        this.nombre = nombre;
        this.capitulos = capitulos;
        this.duracion = duracion;
    }
    mostrarInfo(){
        console.log("Te recomendamos ver "+ this.nombre+ " de "+this.capitulos+" capitulos, con una duracion de "+this.duracion+" horas en total");
        alert("Te recomendamos ver "+ this.nombre+ " de "+this.capitulos+" capitulos, con una duracion de "+this.duracion+" horas en total");
    }

};



//Funciones

function tipoMaraton(tipoMaraton) {
    return tiposDeMaraton[tipoMaraton] == "anime";
}

function duracionMaraton(duracionMaraton) {
    return duracionesDeMaraton[duracionMaraton] == "corta";
}



// Funcion Principal

function devolverMaraton() {

    let maraton;
    let tipo=prompt("ingresa un numero para el tipo de contenido que te gustaria ver -> 0=Serie / 1=Anime"); 
    let duracion=prompt("ingrese un numero para la duracion que quiere para la maraton -> 0=corta / 1=larga");

    //primero me fijo que los datos ingredaos sean validos
    if (tipo > 1 || duracion > 1) {
        return alert("Uno de los valores ingresado es invalido");
    }


    //si los datos son validos, asignos los valores a las variables y las uso para encontrar una serie o anime para ver
    esAnime=tipoMaraton(tipo);
    esMaratonCorta=duracionMaraton(duracion);

    if (esAnime) {
        if (esMaratonCorta) {
            maraton = animes.find((anime) => anime.duracion <= 5)
        }else{
            maraton = animes.find((anime) => anime.duracion > 5)
        }
    }
    else{
        if (esMaratonCorta) {
            maraton = series.find((anime) => anime.duracion <= 5)
        }else{
            maraton = series.find((anime) => anime.duracion > 5)
        }
    }

    //con los valores de la serie o anime creo un objeto maraton para que mostrar los datos
    let maratonCreada = new AnimeSerie(maraton.nombre,maraton.capitulos,maraton.duracion);
    maratonCreada.mostrarInfo();

}

