const sessao = document.title.toLocaleLowerCase()

async function criarNavLateral() {
    let dados = await pegarDados(stringUnderline(sessao)).then((data) => { return data })

    if (Array.isArray(dados)){
        let lista = document.getElementById("listaLateral")
        let tituloSessao = document.getElementById("sessao")
        tituloSessao.innerText = stringCapitalize(sessao)
        for (let item of dados) {
            criaItemNav(item, lista)
        }
    } else {
        for (let topico in dados) {
            let lista = document.getElementById("listaLateral_"+topico)
            let tituloSessao = document.getElementById(topico)
            tituloSessao.innerText = stringCapitalize(sessao+" de "+topico)
            for (let item of dados[topico]) {
                criaItemNav(item, lista)
            }
        }
    }
    
}

function criaItemNav(item, lista) {
    let nome = item.nome.toLowerCase()

    let li = document.createElement("li")
    let a = document.createElement("a")
    a.href = "#" + nome
    a.text = stringCapitalize(nome)

    li.appendChild(a)
    lista.appendChild(li)
}

async function criarItensSessao() {
    let itens = document.getElementById("itens")
    let dados = await pegarDados(stringUnderline(sessao)).then((data) => { return data })

    if (Array.isArray(dados)) {
        for (let item of dados) {
            criaItemSessao(item, itens)
        }
    } else {
        for (let topico in dados) {
            for (let item of dados[topico]) {
                criaItemSessao(item, itens)
            }
        }
    }
}

function criaItemSessao(item, itens) {
    let nome = item.nome.toLowerCase()

    let div = document.createElement("div")
    div.className = "item explicativo"
    div.id = nome
    if (item.fundo) {
        div.style.backgroundImage = `url(${item.fundo})`
    } else {
        div.style.backgroundImage = `url('../../img/semcategoria/img${Math.floor(Math.random() * (10 - 1) + 1)}.jpg')`
    }

    let h2 = document.createElement("h2")
    h2.className = "fontHarry corTitulo textoCentralizado"
    h2.innerText = stringCapitalize(nome)
    div.appendChild(h2)

    let p = document.createElement("p")
    p.className = "fontVerdana corLetras textoCentralizado"
    p.innerText = item.descricao
    div.appendChild(p)

    itens.appendChild(div)
}

async function pegarDados(sessao) {
    let dados = await fetch(`../../data/${sessao}.json`)
    dados = await dados.json().then((data) => {
        return data
    }
    )
    return dados
}

function stringCapitalize(str) {
    let arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    return arr.join(" ");
}

function stringUnderline(str) {
    let result = ""
    for (let word = 0; word < str.length; word++) {
        result += str[word] == " " ? "_" : str[word]
    }
    return result
}

criarNavLateral('familias')
criarItensSessao("familias")