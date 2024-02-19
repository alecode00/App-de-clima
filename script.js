//URL de la Api
let urlBase = "https://api.openweathermap.org/data/2.5/weather";
//ApiKey del la Api
let apiKey = "8dcfb5fba75e0613a26cad4cd88ba3fb";
//URL base para los iconos
let iconUrl = "https://openweathermap.org/img/wn/";

//Contante para transformar a grados Celsius
let diferenciaEnKelvin = 273.15;

//Traemos el boton search a JS
let botonBuscar = document.getElementById("SearchButton");

//Le asignamos el evento click al boton y la funcion que tiene q realizar.
botonBuscar.addEventListener("click", () => {
  //Traemos la entrada del usuario para saber con que ciudad trabajar
    let city = document.getElementById("inputCity").value;
  //Se realiza un fetch para que la Api nos devuelva el objeto
    fetch(`${urlBase}?q=${city}&appid=${apiKey}`)
    .then((response) => response.json())//utilizamos promesas para trabajar en cuanto llegue la respuesta
    .then((response) => {
      mostrarClima(response);
    });

});
//funcion que recibe la respuesta de la Api y hace ver al ususario la informacion
function mostrarClima(data) {
  //Mostrar data en consola
  console.log(data);
  //traer el div a JS
  let divContenedor = document.getElementById("datosClima");
  //Poner el div en vacio
  divContenedor.innerHTML = "";
  //Crear un h2 para ciudad, pais
  let encabezado = document.createElement("h2");
  //Crear un parrafo para temp
  let parrafo1 = document.createElement("p");
  //Crear un parrafo para humedad
  let parrafo2 = document.createElement("p");
  //Crear un parrafo para descripcion
  let parrafo3 = document.createElement("p");
  //Crear una imagen para mostrar el icono
  let logo = document.createElement("img");

  //Se toman las variables de la Api
  let city = data.name;
  let country = data.sys.country;
  let temperatura = data.main.temp;
  let descripcion = data.weather[0].description;
  let humidity = data.main.humidity;
  let icono = data.weather[0].icon;

  //Elemento h2 ponerle el valor del nombre de la ciudad,pais
  encabezado.innerHTML = `${city},${country}`;
  //Insertar h2 dentro del divContenedor
  divContenedor.appendChild(encabezado);

  //Darle el valor de la temp al p1 redondiando con round
  parrafo1.innerHTML = `The tempeture is: ${Math.round(
    temperatura - diferenciaEnKelvin
  )}°C`;
  //Insertar p1 dentro del divContenedor
  divContenedor.appendChild(parrafo1);

  //Darle el valor descripcion del clima al elemento p2
  parrafo2.textContent = `The weather description is: ${descripcion}`;
  //Insertar p2 dentro del divContenedor
  divContenedor.appendChild(parrafo2);
//Darle la fuente de donde traer la imagen
  logo.src = `${iconUrl}${icono}@2x.png`;
  //Insertar la imagen en el divContenedor
  divContenedor.appendChild(logo);
  //Darle valor a p3 de la humedad
  parrafo3.textContent = `The humidity in ${city} is: ${humidity}%`;
  //Insertat p3 en divContenedor
  divContenedor.appendChild(parrafo3);
}
