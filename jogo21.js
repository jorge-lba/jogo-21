// Função pra gerar as cartas de 0 a 10 e depois somar adicionando no array
var resultado = []
const cartas = function () {

    for(let contador = 0; contador < 2; contador ++) {
        let cartas = Math.floor(Math.random() * 10 + 1)
        console.log(`Carta numero ${contador+1} = ${cartas}`)
        resultado.push(cartas)
        }
    var reducer = function (accumulator, currentValue) { return accumulator + currentValue }
    console.log(`Resultado das cartas: ${resultado.reduce(reducer)}`)
}


// COMPRAR MAIS UMA CARTA
var resultadocomprarcartas = function () { 
    var reducer = function (accumulator, currentValue) { return accumulator + currentValue }
    for(let contador = 0; contador < 1; contador ++) {
        let cartas = Math.floor(Math.random() * 10 + 1)
        console.log(`Você comprou a carta: ${cartas}`)
        resultado.push(cartas)
        }
    console.log(`TOTAL = ${resultado.reduce(reducer)}`) 
    if (resultado.reduce(reducer) < 21 ) {
        comprarcartas()
    } else if (resultado.reduce(reducer) > 21) {
        console.log("VOCÊ ESTOUROU!!")
    } else if (resultado.reduce(reducer) == 21)
    console.log("VOCÊ VENCEU!!")
}



//INPUT NO CONSOLE
const input = function () {
    const readline = require('readline')
    const resp = ""

    const leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    leitor.question("PRONTO PARA JOGAR? \n[1]- SIM \n[2]- NÃO: \n", function(answer) {
        const resp = answer
        leitor.close()
        

// Testando se o jogador quer jogar ou não.
    if (resp == 1) {
        cartas()
        comprarcartas()
    } else if (resp == 2) {
        console.log("Jogo Finalizado.")
        leitor.close()
    } else {
        console.log("Numero não encontrado. Tente novamente")
        input()
    }
    })
}


// Perguntar se quer mais cartas
const comprarcartas = function () {
    const readline = require('readline')
    const resp = ""

    const leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    leitor.question("Deseja comprar mais cartas?  \n[1]- SIM \n[2]- NÃO: \n", function(answer) {
        const resp = answer
        leitor.close()

// Input pra ver a reposta do jogador
        if (resp == 1) {
            resultadocomprarcartas()
        } else {
            console.log("Numero Inválido.")
        }
    })
    
}

console.log("==========================")
console.log("|  BEM-VINDO AO JOGO 21  |")
console.log("==========================")

input() 