
let duracion;
let tipo;


function devolverMaraton() {

    tipo=prompt("ingresa un numero para el tipo de contenido que te gustaria ver -> 1=Serie / 2=Anime")
    duracion=prompt("ingrese un numero para la duracion que quiere para la maraton -> 1=corta / 2=larga");

    if ((duracion == 1) && (tipo == 1)) {
        console.log("Te recomendamos ver 'Bodyguard' de 6 capitulos, con una duracion de 6 horas en total");
        alert("Te recomendamos ver 'Bodyguard' de 6 capitulos, con una duracion de 6 horas en total");
    }
    else if((duracion == 1) && (tipo == 2)){
        console.log("Te recomendamos ver 'Another' de 13 capitulos, con una duracion de 4 horas en total");
        alert("Te recomendamos ver 'Another' de 13 capitulos, con una duracion de 4 horas en total");
    }
    else if ((duracion == 2) && (tipo == 1)) {
        console.log("Te recomendamos ver 'The Mandalorian' con 2 temporadas de 8 capitulos C/U, con una duracion de 10 horas en total");
        alert("Te recomendamos ver 'The Mandalorian' con 2 temporadas de 8 capitulos C/U, con una duracion de 10 horas en total");
    }
    else if ((duracion == 2) && (tipo == 2)) {
        console.log("Te recomendamos ver 'Mob Psycho 100' con 2 temporadas de 13 capitulos C/U, con una duracion de 8 horas en total");
        alert("Te recomendamos ver 'Mob Psycho 100' con 2 temporadas de 13 capitulos C/U, con una duracion de 8 horas en total");
    }
    else {
        console.log("Uno de los valores ingresado es invalido");
        alert("Uno de los valores ingresado es invalido");
    }

}

