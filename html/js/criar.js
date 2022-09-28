const sessao = document.title

async function criarNavLateral(){
    let lista = document.getElementById("listaLateral")
    let tituloSessao = document.getElementById("sessao")
    let dados = await pegarDados(sessao).then((data)=>{return data})

    tituloSessao.innerText = stringCapitalize(sessao)

    for (let item of dados){
        let nome = item.nome.toLowerCase()

        let li = document.createElement("li")
        let a = document.createElement("a")
        a.href = "#"+nome
        a.text = stringCapitalize(nome)
        
        li.appendChild(a)
        lista.appendChild(li)

    }
}

async function criarIntensSessao(){
    let itens = document.getElementById("itens")
    let dados = await pegarDados(sessao).then((data)=>{return data})
    console.log(document.title)

    for (let item of dados){
        let nome = item.nome.toLowerCase()

        let div = document.createElement("div")
        div.className = "item explicativo"
        div.id = nome
        div.style.backgroundImage = `url('../img/familias/fundos/${nome}.jpg')`

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
}

async function pegarDados(sessao){
    let dados = await fetch(`../data/${sessao}.json`)
    dados = await dados.json().then((data)=>{
        return data}
        )
    return dados
}

function stringCapitalize(str){
    let arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    return arr.join(" ");
}

criarNavLateral('familias')
criarIntensSessao("familias")