# Jogo 21

Este código vou escrito pelo [Luiz Eduardo](https://github.com/EduardooPV) e estarei usando para estudo, fazendo refactoring adicionando boas práticas do livro [Código Limpo](https://www.altabooks.com.br/produto/codigo-limpo-habilidades-praticas-do-agile-software/).

## Funções

A função `cartas` está responsável por sortear duas cartas para o inicio do game, as cartas estão sendo adicionadas no variável global `resultado` e são chamados dois `console.log` para apresentar as cartas e o valor total somado.

```js
const cartas = function () {

    for(let contador = 0; contador < 2; contador ++) {
      let cartas = Math.floor(Math.random() * 10 + 1)
      console.log(`Carta numero ${contador+1} = ${cartas}`)
      resultado.push(cartas)
    }

    var reducer = function (accumulator, currentValue) { 
      return accumulator + currentValue 
    }

    console.log(`Resultado das cartas: ${resultado.reduce(reducer)}`)
}
```

Uma função deve fazer apenas uma coisa, em `cartas` podemos ver que ela está responsável por sortear duas cartas, apresentar as cartas, somar o resultado e apresentar o resultado.

No código abaixo removi as funcionalidades de somar e apresentar o resultado criando as funções `valorTotal` e  `apresentarResultado`.

```js 
const valorTotal = (valorArray) => valorArray.reduce((a,b) => a + b, 0)

const apresentarResultado = (valor) => 
  console.log(`Resultado das cartas: ${valor}`)
```

A função `Math.floor` que está gerando um numero aleatório foi transformada em uma função separada para tornar o código mais legível e reutilizável. 

```js
const comprarCarta = () => Math.floor(Math.random() * 13 + 1)
```

Agora função `cartas` foi transformada em `darDuasCartas` que era a sua responsabilidade desde o inicio.

```js
const darDuasCartas = () => [comprarCarta(), comprarCarta()]
```

A próxima função é a `resultadocomprarcartas`.

```js
var resultadocomprarcartas = function () { 
  var reducer = function (accumulator, currentValue) { 
    return accumulator + currentValue 
  }

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
```
Está função está responsável por comprar e apresentar uma carta, apresentar o resultado total e verificar em que estado o jogo se encontra.

Essa função pode ser removida, já que ela faz a mesma função que outras funções anteriores, a parte do teste do estado do jogo vai para a função que cuida do fluxo do jogo.

Agora vamos ver a função `input`.

```js
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
```

Está função está responsável por iniciar o jogo, criar o objeto que faz a leitura e escrita no `CMD` e  fazer a leitura se o jogador quer mesmo iniciar.

Como o `CMD` vai ser usando em durante todo o game, sua inicialização foi removida da parte interna da função e colocada como `global`, dessa forma poderemos utiliza-la em diversas parte do código.

Também foi criada a função `entrada` utilizando o a variável `it` para esperar o comando do jogador.

A função `comprarcartas` foi unida com a `input` já que ela faz parte do fluxo do jogo.

```js
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
    } else if (resp == 2) {
        console.log("Jogo Finalizado.")
        leitor.close()
    } else {
        console.log("Numero não encontrado. Tente novamente")
        input()
    }
    })
}
```

Para melhorar o fluxo de leitura, foi criada uma função `perguntar`, que recebe a mensagem e retornar a resposta do jogador.

```js
const perguntar = async (mensagem) => {
  leitor.resume()

  console.log(mensagem)
  const resposta = await entrada()

  leitor.pause()

  return resposta
}
```

O fluxo que pergunta e faz ou não a compra de mais cartas foi separado em na função `fluxoCompraDeCartas`.

```js
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
```

O teste que verificar em qual estado o jogo se encontra foi transformado em uma função chamada `testarEstadoDoJogo`.

```js
const testarEstadoDoJogo = (valor) => {
  if (valor > 21) return "VOCÊ ESTOUROU!!"
  if (valor == 21) return "VOCÊ VENCEU!!"
  return 'CONTINUAR'
}
```

Todo o fluxo do jogo foi adicionado na função `jogo`.

```js
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
```

Com a função `jogo` separada da `iniciar` fica mais claro como o jogo funciona.

1. A variável `cartas` recebe duas cartas da função `darDuasCartas`.
2. As cartas são apresentadas pela função `apresentarCarta`.
3. A variável `estado` recebe 'CONTINUAR' para manter o jogo rodando no `do while`.
4. O valor total das cartas é somado pela função `valorTotal`.
5. O resultado é apresentado usando a função `apresentarResultado`.
6. O estado é atualizado com o resultado da função `testarEstadoDoJogo`.
7. É verificado se o jogo vai continuar e caso vá, a variável `cartas` vai receber o valor retornado pela função `fluxoCompraDeCartas`.
8. Após sair do `do while` é apresentado o resultado final do jogo.

Agora a função `iniciar` fica responsável por perguntar se o jogador quer ou não iniciar o game, caso sim é chamada a função `jogo`, caso o jogador não queira jogar ele é finalizado e se a resposta for invalida a função iniciar é chamada novamente.

Obs.: Além de separar as funções utilizamos boas praticas de nomeação para as variáveis e funções, utilizando o padrão [CamelCase](https://pt.wikipedia.org/wiki/CamelCase#:~:text=CamelCase%20%C3%A9%20a%20denomina%C3%A7%C3%A3o%20em,defini%C3%A7%C3%B5es%20de%20classes%20e%20objetos.) que torna mais legível as palavras utilizadas e foram dados nomes que representam o que a função faz, como `perguntar`, `comprarCarta` e etc. (os nomes ainda podem ser mudados para coisas que fazem mais sentido para o jogo)

