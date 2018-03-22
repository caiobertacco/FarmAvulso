'use strict';
var usuarioLogado = "Caio Henrique Bertacco de Menezes";

var retiradas = [{
    medicamento: "Aspirina",
    endereco: "Avenida Industrial, 1580"
},{
    medicamento: "Amoxicilina",
    endereco: "Avenida Industrial, 1580"
}];

var encomendas = [];

var medDisponiveis = [{
    id: 1,
    nome: "Aspirina",
    quantidade: 100,
    valor: 5.00
},
{
    id:2,
    nome: "Amoxicilina",
    quantidade: 2,
    valor: 5.00
},
{
    id: 3,
    nome: "Clordiazepóxido",
    quantidade: 20,
    valor: 9.00
},
{
    id: 4,
    nome: "Clonazepam",
    quantidade: 5, 
    valor:8.00
}];

listar(retiradas, "lista-retiradas");
listar(encomendas, "lista-encomendas");

function adicionarRetirada(){
    var retirada = {
        medicamento : $("#retirada-medicamento").val(),
        endereco: $("#retirada-endereco").val(),
        tratar: $("#retirada-tratar-com").val() === undefined || $("#retirada-tratar-com").val() === "" ? usuarioLogado : $("#retirada-tratar-com").val()
    }

    if(retirada.medicamento == null) {
        alert("Favor inserir o nome do medicamento!");
        return;
    }

    if(retirada.endereco == null) {
        alert("Favor inserir o endereço!");
        return;
    }

    adicionar(retirada, "lista-retiradas");
    retiradas.push(retirada);

    $("#retirada-medicamento").val("");
    $("#retirada-endereco").val("");
    $("#retirada-tratar-com").val("");
}

function adicionarEncomenda(){
    var encomenda = {
        medicamento : $("#encomenda-medicamento").val(),
        endereco: $("#encomenda-endereco").val()
    }

    if(encomenda.medicamento == null) {
        alert("Favor inserir o nome do medicamento!");
        return;
    }

    if(encomenda.endereco == null) {
        alert("Favor inserir o endereço!");
        return;
    }

    adicionar(encomenda, "lista-encomendas");
    encomendas.push(encomenda);
    verificaDisponibilidade(encomenda.medicamento);
    $("#encomenda-medicamento").val("");
    $("#encomenda-endereco").val("");
}

function adicionar(item, idLista) {
    var id = idLista + "-" + item.medicamento.toLowerCase();
    var valor = item.medicamento;
    $("#" + idLista).append("<a id='" + id + "' onclick='viewDetail(this)' class='list-group-item list-group-item-action'>" + valor + "</a>");
    $("#" + idLista).append("<a id='" + id + "-detail' class='list-group-item list-group-item-action' style='display:none'><h4 class=list-group-item-heading'>" + valor + "</h4><p class='list-group-item-text'>" + details(item) + "</p></a>");
}

function viewDetail(item){
    for(let i = 0; i < retiradas.length; i++) {
        let id = "#lista-retiradas" + retiradas[i].medicamento.toLowerCase();
        $(id+"-detail").hide();
        $(id).show();
    }

    for(let i=0; i < encomendas.length; i++) {
        let id = "#lista-encomendas" + encomendas[i].medicamento.toLowerCase();
        $(id+"-detail").hide();
        $(id).show();
    }

    $("#" + item.id ).hide();
    $("#" + item.id + "-detail").show();
}

function details(item){
    var detalhe = "";

    for(var prop in item){
        if (prop !== 'nome' && prop !== 'medicamento') {
            detalhe += prop.substr(0,1).toUpperCase() + prop.substr(1, prop.length) + ": " + item[prop] + "<br/>";
        }
    }

    return detalhe;
}

function listar(list, idLista) {
    for(var i = 0; i < list.length; i++){
        adicionar(list[i], idLista);
        if(idLista === "lista-encomendas"){
            verificaDisponibilidade(list[i].medicamento);
        }
    }
}

function verificaDisponibilidade(medicamento){
    for(var i = 0; i < medDisponiveis.length; i++) {
        if(medDisponiveis[i].nome.toLowerCase() === medicamento.toLowerCase()) {
            toastr.info(medicamento + " está disponível!");
            $("#lista-encomendas-"+ medicamento.toLowerCase()).append("<span class='badge'>" + medDisponiveis[i].quantidade + " diponível(eis)</span><span class='badge'>R$ " + medDisponiveis[i].valor + "</span>")
            $("#lista-encomendas-"+ medicamento.toLowerCase() + "-detail").append("<br/><label>" + medDisponiveis[i].quantidade + " diponível(eis)</label><br/><label>R$ " + medDisponiveis[i].valor + "</label>");
            $("#lista-encomendas-"+ medicamento.toLowerCase() + "-detail").append("<input type='button' style='float:right' value='Comprar' onclick=\"comprar('lista-encomendas-"+ medicamento.toLowerCase() + "')\" />");
        }
    }
}

function comprar(id){
    $("#" + id).show();
    $("#" + id + "-detail").hide();
    $("#" + id + " span").remove();
    $("#" + id).append("<span class='badge'>ENCOMENDADO</span>")
    $("#" + id).addClass("list-group-item-success");
}