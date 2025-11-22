var PRECIO_KIT = 800;
var PRECIO_CONTROL = 1500;
var PRECIO_TALLER = 2500;

var frecuenciaActual = "una-vez";

function calcularImpacto() {
    var campoMonto = document.getElementById("monto");
    var selectTipo = document.getElementById("tipo-impacto");
    var textoCantidad = document.getElementById("resultado-cantidad");
    var textoDetalle = document.getElementById("resultado-detalle");

    var monto = parseInt(campoMonto.value);

    if (isNaN(monto) || monto <= 0) {
        textoCantidad.textContent = "0";
        textoDetalle.textContent = "Ingresá un monto mayor a 0.";
        return;
    }

    var tipo = selectTipo.value;
    var cantidad = 0;
    var textoTipo = "";

    if (tipo === "kits") {
        cantidad = Math.floor(monto / PRECIO_KIT);
        textoTipo = "kits de prevención";
    } else if (tipo === "controles") {
        cantidad = Math.floor(monto / PRECIO_CONTROL);
        textoTipo = "controles básicos de salud";
    } else if (tipo === "talleres") {
        cantidad = Math.floor(monto / PRECIO_TALLER);
        textoTipo = "cupos en talleres de hábitos saludables";
    }

    var textoFrecuencia;

    if (frecuenciaActual === "mensual") {
        textoFrecuencia = "Con tu donación mensual podés financiar ";
    } else {
        textoFrecuencia = "Con tu donación única podés financiar ";
    }

    if (cantidad < 1) {
        textoCantidad.textContent = "0";
        textoDetalle.textContent = "El monto no alcanza para financiar una unidad completa.";
    } else {
        textoCantidad.textContent = cantidad;
        textoDetalle.textContent = textoFrecuencia + cantidad + " " + textoTipo + ".";
    }
}

function seleccionarMontoDesdeBoton() {
    var valor = parseInt(this.getAttribute("data-monto"));
    var campoMonto = document.getElementById("monto");
    campoMonto.value = valor;

    var botones = document.getElementsByClassName("monto-btn");
    var i = 0;

    while (i < botones.length) {
        botones[i].classList.remove("monto-btn-activo");
        i = i + 1;
    }

    this.classList.add("monto-btn-activo");
}

function cambiarFrecuencia() {
    var tabs = document.getElementsByClassName("calc-tab");
    var i = 0;

    while (i < tabs.length) {
        tabs[i].classList.remove("calc-tab-activo");
        i = i + 1;
    }

    this.classList.add("calc-tab-activo");
    frecuenciaActual = this.getAttribute("data-frecuencia");
}

function limpiarSeleccionMontos() {
    var botones = document.getElementsByClassName("monto-btn");
    var i = 0;

    while (i < botones.length) {
        botones[i].classList.remove("monto-btn-activo");
        i = i + 1;
    }
}



document.addEventListener("DOMContentLoaded", function () {
    /* calculadora */
    var campoMonto = document.getElementById("monto");
    var botonCalcular = document.getElementById("btn-calcular");

    if (campoMonto && botonCalcular) {
        var botonesMontos = document.getElementsByClassName("monto-btn");
        var j = 0;
        while (j < botonesMontos.length) {
            botonesMontos[j].addEventListener("click", seleccionarMontoDesdeBoton);
            j = j + 1;
        }

        var tabsFrecuencia = document.getElementsByClassName("calc-tab");
        var k = 0;
        while (k < tabsFrecuencia.length) {
            tabsFrecuencia[k].addEventListener("click", cambiarFrecuencia);
            k = k + 1;
        }

        campoMonto.addEventListener("input", limpiarSeleccionMontos);
        botonCalcular.addEventListener("click", calcularImpacto);
    }

    /* Menu hamburguesa  */
    var botonMenu = document.getElementById("boton-menu");
    var zonaMenu = document.getElementById("zona-menu");

    if (botonMenu && zonaMenu) {
        botonMenu.addEventListener("click", function () {
            var abierto = zonaMenu.classList.toggle("menu-abierto");
            botonMenu.classList.toggle("activo", abierto);
            botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
        });
    }
});

// carrusel
document.addEventListener("DOMContentLoaded", function () {
    var carrusel = document.getElementById("carrusel-galeria");

    if (!carrusel) {
        return; // esta página no tiene carrusel
    }

    var pista = carrusel.querySelector(".carrusel-pista");
    var items = carrusel.querySelectorAll(".carrusel-item");
    var botonPrev = carrusel.querySelector(".carrusel-prev");
    var botonNext = carrusel.querySelector(".carrusel-next");
    var indicadores = document.querySelectorAll(".carrusel-indicadores .indicador");

    var indiceActual = 0;
    var total = items.length;

    function actualizarCarrusel() {
        var desplazamiento = -indiceActual * 100;
        pista.style.transform = "translateX(" + desplazamiento + "%)";

        var i = 0;
        while (i < indicadores.length) {
            indicadores[i].classList.remove("activo");
            i = i + 1;
        }
        if (indicadores[indiceActual]) {
            indicadores[indiceActual].classList.add("activo");
        }
    }

    function irASiguiente() {
        indiceActual = indiceActual + 1;
        if (indiceActual >= total) {
            indiceActual = 0;
        }
        actualizarCarrusel();
    }

    function irAAnterior() {
        indiceActual = indiceActual - 1;
        if (indiceActual < 0) {
            indiceActual = total - 1;
        }
        actualizarCarrusel();
    }

    if (botonPrev) {
        botonPrev.addEventListener("click", irAAnterior);
    }

    if (botonNext) {
        botonNext.addEventListener("click", irASiguiente);
    }

    var j = 0;
    while (j < indicadores.length) {
        indicadores[j].addEventListener("click", function () {
            var indice = parseInt(this.getAttribute("data-indice"));
            if (!isNaN(indice)) {
                indiceActual = indice;
                actualizarCarrusel();
            }
        });
        j = j + 1;
    }

    // Comenzar en la primera imagen
    actualizarCarrusel();
});

// animacion de scroll 
var elementosRevelar = document.querySelectorAll(".revelar-scroll");

function revelarScroll() {
    var altoVentana = window.innerHeight;

    for (var i = 0; i < elementosRevelar.length; i++) {
        var elem = elementosRevelar[i];
        var distanciaTop = elem.getBoundingClientRect().top;

        // cuando el elemento está a 80px de entrar en la ventana
        if (distanciaTop < altoVentana - 80) {
            elem.classList.add("visible");
        }
    }
}

window.addEventListener("load", revelarScroll);
window.addEventListener("scroll", revelarScroll);
