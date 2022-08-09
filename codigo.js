
//Arrays

const tipo = ["serie","anime"];
const duracion = ["corta","larga"];


// Clases

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

// Objetos

const animeCorto = new AnimeSerie("Record of Ragnarok","13","4");
const animeLargo = new AnimeSerie("Mob Psycho 100","26","8");

const serieCorta = new AnimeSerie("Bodyguard","6","6");
const serieLarga = new AnimeSerie("The Mandalorian","16","10");


// Main

function devolverMaraton() {

    tipoIngresado = prompt("ingresa un numero para el tipo de contenido que te gustaria ver -> 0=Serie / 1=Anime")
    duracionIngresada = prompt("ingrese un numero para la duracion que quiere para la maraton -> 0=corta / 1=larga");

    if ((duracion[duracionIngresada] == "corta") && (tipo[tipoIngresado] == "serie")) {
        serieCorta.mostrarInfo();
    }
    else if((duracion[duracionIngresada] == "corta") && (tipo[tipoIngresado] == "anime")){
        animeCorto.mostrarInfo();
    }
    else if ((duracion[duracionIngresada] == "larga") && (tipo[tipoIngresado] == "serie")) {
        serieLarga.mostrarInfo();
    }
    else if ((duracion[duracionIngresada] == "larga") && (tipo[tipoIngresado] == "anime")) {
        animeLargo.mostrarInfo();
    }
    else {
        console.log("Uno de los valores ingresado es invalido");
        alert("Uno de los valores ingresado es invalido");
    }

}

