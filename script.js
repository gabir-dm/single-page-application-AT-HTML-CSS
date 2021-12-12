let depArray = []
let partyArray = []

function getDeps (url) {
    let response
    let request = new XMLHttpRequest()
    let depImg = document.querySelectorAll(".imgDeputado")
    let depName = document.querySelectorAll(".nameDep")

    request.open ("GET", url) 
    request.send()
    request.onreadystatechange = function (evt) {
        response = JSON.parse(request.responseText)
        depArray = depArray.concat(response.dados)

        depImg.forEach((dep, i) =>{
            dep.setAttribute("src", depArray[i].urlFoto)
            dep.setAttribute("title", depArray[i].nome)
        })
        depName.forEach((dep, i) =>{
            dep.innerHTML = `<b>${depArray[i].nome} <br> ${depArray[i].siglaPartido} - ${depArray[i].siglaUf}</b>`
        })
    }  
}

function getParties (url) {
    let partyResponse
    let partyRequest = new XMLHttpRequest()
    let partyImg = document.querySelectorAll(".imgPartido")
    let partyName = document.querySelectorAll(".namePartido")

    partyRequest.open ("GET", url) 
    partyRequest.send()
    partyRequest.onreadystatechange = function (evt) {
        partyResponse = JSON.parse(partyRequest.responseText)
        partyArray = partyArray.concat(partyResponse.dados)

        ///// Não está funcionando corretamente, os logos de partidos da API estão todos quebrados. Coloquei um ícone de Placeholder no html.
        // partyImg.forEach((party, i) =>{
        //     party.setAttribute("src", partyArray[i].urlLogo)
        // })

        partyName.forEach((party, i) =>{
            party.innerHTML = `<b>${partyArray[i].nome}</b>`
        })
    }  
}

getDeps("https://dadosabertos.camara.leg.br/api/v2/deputados?itens=8");
getParties ("https://dadosabertos.camara.leg.br/api/v2/partidos?itens=8")
