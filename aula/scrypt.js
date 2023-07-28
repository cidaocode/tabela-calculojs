// Algoritmo plano

// ok 1. Pegar os valores dos inputs
// ok 2. Fazer o calculo do IMC -> valor IMC
// ok 3. Gerar a classificacao IMC
// ok 4. Organizar os dados do usuarios para salvar na lista  e gerar a data
// ok 5. Inserir o usuario na lista  (salvar no localStorage)
// ok 6. Funcao para carregar  os usuarios (localStorage), chamar ao carregar
// ok 7. Reinderizar os usuarios o CONTEUDO DA TABELA  com os usuarios cadastrados 
// ok 8. Botao para limpar os registros (localStorage)  




// alert("Hello world")


function calcular(event) {

    event.preventDefault()

    console.log("foi executada a funcao calcular")
    // passo 1 Declarando o usuario
    let usuario = receberValores()
    // passo 2 declarando o imcCalculado
    let imcCalculado = calcularImc(usuario.altura, usuario.peso)
    // passo 3 Declarando a classificacaoImc
    let classificacaoImc = classificarIMc(imcCalculado)

    // console.log(classificacaoImc)

    console.log(classificacaoImc)
    // passo 4 Declarando OrganizarDados
    usuario = OrganizarDados(usuario, imcCalculado, classificacaoImc)
    // passo 5 Declarar cadastrarUsuario
    casdastrarUsuarios(usuario)
    window.location.reload()
    // passo 6 Declarar referencia do localStorege







}
function receberValores() {
    // variavel
    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebido = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value

    // com essa variavel nao precisa declarar console log
    let dadosUsuario = {

        nome: nomeRecebido,
        altura: alturaRecebido,
        peso: pesoRecebido,


    }


    // console.log(nomeRecebido)
    // console.log(alturaRecebida)
    // console.log(pesoRecebido)

    console.log(dadosUsuario)
    return dadosUsuario
}
function calcularImc(altura, peso) {


    let imc = peso / (altura * altura)

    console.log(imc)
    return imc
}

function classificarIMc(imc) {
    // Resultado            Situacao
    // Entre 18.15 e 24.99    peso normal
    // Entre 25 e 29.99       sobre peso
    // Acima 30               obesidade



    if (imc < 18.5) {

        return "Abaixo do peso"

    } else if (imc >= 18.5 && imc < 25) {

        return "Peso normal"

    } else if (imc >= 25 && imc < 30) {

        return "sobre peso"

    } else {
        return "Obesidade"
    }
}
function OrganizarDados(dadosUsuario, valorImc, classificacaoImc) {
    // Essa linha e para pegar data e hora 
    // now data hora atual
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', {
        timeStyle: 'long',
        dateStyle: 'short'
    }).format(Date.now())

    console.log(dataHoraAtual);
    // Organizando o objeto para salvar 
    let dadosUsuarioAtualizado = {

        ...dadosUsuario,
        imc: valorImc,
        situacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }
    return dadosUsuarioAtualizado;


}
function casdastrarUsuarios(dadosUsuario) {
    // utiliza declaracao array [] uma lista
    let listaUsuario = []
    // se 
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    // adiciona o usuario na lista
    listaUsuario.push(dadosUsuario)

    // locaStorege salva a lista de usuarios os dados
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario))


    // se eu pedir uma lista e tiver na lista e for diferente de nulo

}
function carregarUsuarios() {
    let listaCarregada = []


    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))

    }
    if (listaCarregada.length == 0) {
        // se nao tiver nenhum usuario cadastrado ,mostrar mensagen
        // obs: trazendo a tag do html corpo-tabela
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem"><td colspan="6">Nenhum usuario cadastrado :(😒</td)</tr>`


    } else {
        // mostrar conteudo da tabela
        montarTabela(listaCarregada)

        // chamando o html para a mensagem desejada "nenhum nome cadastrado"
    }


    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())
// passo 7
function montarTabela(listaUsuarios) {

    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {

        // console.log("O usuario e: ", carregarUsuarios)

        template += `<tr>

<td data-cell="nome">${usuario.nome}</td>
<td data-cell="altura">${usuario.altura}</td>
<td data-cell="peso">${usuario.peso}</td>
<td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
<td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
<td data-cell="data de cadastro">${usuario.datacadastro}</td>

</tr>`



    })
    tabela.innerHTML = template;
    // funcao REMOVE o item do localStorage
    
}
function deletarRegistros() {

    localStorage.removeItem("usuariosCadastrados")
    // Recarrega a pagina
    window.location.reload()

}
