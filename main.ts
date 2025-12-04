/**
 * Detector de ruido para micro:bit V2
 */
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // Tomar varias muestras rápidas
    for (let index = 0; index < MUESTRAS; index++) {
        // lectura 0..255
        nivel = input.soundLevel()
        suma += nivel
        if (nivel > pico) {
            pico = nivel
        }
        basic.pause(20)
    }
    promedio = Math.round(suma / MUESTRAS)
    // Dibujar barra de LEDs (5x5)
    ledsEncendidos = Math.round(promedio * 25 / 255)
    for (let idx = 0; idx <= 24; idx++) {
        x = idx % 5
        y = 4 - Math.floor(idx / 5)
        if (idx < ledsEncendidos) {
            led.plot(x, y)
        } else {
            led.unplot(x, y)
        }
    }
    if (true) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
            `)
    }
    // Alerta si supera límite
    if (pico > LIMITE_RUIDO || promedio > LIMITE_RUIDO) {
        music.playTone(440, 120)
        basic.pause(150)
        basic.clearScreen()
    }
    basic.pause(80)
})
let y = 0
let x = 0
let ledsEncendidos = 0
let promedio = 0
let pico = 0
let suma = 0
let nivel = 0
let MUESTRAS = 0
let LIMITE_RUIDO = 0
// Ajusta sensibilidad (0..255)
LIMITE_RUIDO = 140
// Nº de lecturas rápidas por ciclo
MUESTRAS = 8
