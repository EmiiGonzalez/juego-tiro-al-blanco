var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
pincel.fillStyle = "lightgrey";
pincel.fillRect(0, 0, 1024, 450);
const puntaje = document.querySelector(".puntaje");
var vidas = document.querySelector(".vidas");
var puntaje_contador = 0;
var vidas_contador = 10;
vidas.value = vidas_contador;

var radio = 10;
var xaleatorio;
var yAleatorio;

function sumar_puntos() {
  puntaje_contador += 10;
  return puntaje_contador;
}

function restar_vidas() {
  vidas_contador -= 1;
  return vidas_contador;
}

function disenharCircunferencia(x, y, radio, color) {
  pincel.fillStyle = color;
  pincel.beginPath();
  pincel.arc(x, y, radio, 0, 2 * Math.PI);
  pincel.fill();
}

function limpiarPantalla() {
  pincel.clearRect(0, 0, 1024, 450);
}

function actualizarPantalla() {
  limpiarPantalla();
  xaleatorio = sortearPosicion(1024);
  yAleatorio = sortearPosicion(450);
  disenharObjetivo(xaleatorio, yAleatorio);
}

function disenharObjetivo(x, y) {
  disenharCircunferencia(x, y, radio + 20, "red");
  disenharCircunferencia(x, y, radio + 10, "white");
  disenharCircunferencia(x, y, radio, "red");
}

function sortearPosicion(maximo) {
  return Math.floor(Math.random() * maximo);
}

function disparar(evento) {
  var x = evento.pageX - pantalla.offsetLeft;
  var y = evento.pageY - pantalla.offsetTop;

  if (
    x < xaleatorio + radio &&
    x > xaleatorio - radio &&
    y < yAleatorio + radio &&
    y > yAleatorio - radio
  ) {
    puntaje.value = sumar_puntos();
  } else {
    vidas_contador = restar_vidas();
    vidas.value = vidas_contador;
    if (vidas_contador == 0) {
      if (puntaje_contador > 150) {
        alert(
          `Tu puntuacion total ${puntaje_contador} \nNivel de puntería: Viejo oeste`
        );
        location.reload();
      } else if (puntaje_contador <= 150 && puntaje_contador >= 100) {
        alert(
          `Tu puntuacion total ${puntaje_contador} \nNivel de puntería: Sniper`
        );
        location.reload();
      } else if (puntaje_contador < 100 && puntaje_contador >= 50) {
        alert(
          `Tu puntuacion total ${puntaje_contador} \nNivel de puntería: Cazador`
        );
        location.reload();
      } else if (puntaje_contador < 50 && puntaje_contador >= 0) {
        alert(
          `Tu puntuacion total ${puntaje_contador} \nNivel de puntería: Teletubbie`
        );
        location.reload();
      }
    }
  }
}

setInterval(actualizarPantalla, 1250);

pantalla.onclick = disparar;
