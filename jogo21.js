// Função pra gerar as cartas de 0 a 10 e depois somar adicionando no array
const readline = require('readline')

const leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const it = leitor[Symbol.asyncIterator]()

const entrada = async () => (await it.next()).value

const valorTotal = (valorArray) => valorArray.reduce((a,b) => a + b, 0)

const apresentarResultado = (valor) => 
  console.log(`Resultado das cartas: ${valor}`)

const comprarCarta = () => Math.floor(Math.random() * 13 + 1)

const apresentarCarta = (valor) => console.log(`Carta recebida foi ${valor}`)

const darDuasCartas = () => [comprarCarta(), comprarCarta()]

const perguntar = async (mensagem) => {
  leitor.resume()

  console.log(mensagem)
  const resposta = await entrada()

  leitor.pause()

  return resposta
}

const fluxoCompraDeCartas = async (cartas) => {
  leitor.resume()

  const resposta = await perguntar("Deseja comprar mais cartas?  \n[1]- SIM \n[2]- NÃO \n")
   
  if (resposta === '1') {

    const novaCarta = comprarCarta()
    apresentarCarta(novaCarta)
    
    cartas.push(novaCarta)
  } else {
    console.log("Numero Inválido.")
  }

  leitor.pause()

  return cartas
}

const testarEstadoDoJogo = (valor) => {
  if (valor > 21) return "VOCÊ ESTOUROU!!"
  if (valor == 21) return "VOCÊ VENCEU!!"
  return 'CONTINUAR'
}

const jogo = async () => {
  const cartas = darDuasCartas()

  cartas.forEach(apresentarCarta)

  let estado = 'CONTINUAR'
  do{
    const somaDasCartas = valorTotal(cartas)
    apresentarResultado(somaDasCartas)

    estado = testarEstadoDoJogo(somaDasCartas)
          
    if (estado === 'CONTINUAR') cartas.concat( await fluxoCompraDeCartas(cartas))

  }while(estado === 'CONTINUAR')

  console.log(estado)
}

const iniciar = async function () {
  leitor.resume()
  
  console.log("==========================\n|  BEM-VINDO AO JOGO 21  |\n==========================")

  const iniciarOJogo = await perguntar('PRONTO PARA JOGAR? \n[1]- SIM \n[2]- NÃO \n')

  if (iniciarOJogo === '1'){
    await jogo()
  } else if (iniciarOJogo === '2') {
      console.log("Jogo Finalizado.")
      leitor.close()
  } else {
    console.log("Numero não encontrado. Tente novamente")
    leitor.pause()
    await iniciar()
  }
}

iniciar() 