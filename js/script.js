import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

// cria o estado dos campos.
const camposDoFormulario = document.querySelectorAll("[required]")
// seleciona o formulario
const formulario = document.querySelector("[data-formulario]");

// evento ao clicar no submit
formulario.addEventListener("submit" , (e)=>{
    // previne comportamento padrao
    e.preventDefault();
    // pega cada dado dos inputs e adiciona no lista Respostas
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }
    // adiciona o local Storage
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas))
    // chama outra tela
    window.location.href = "./abrir-conta-form-2.html";
})



// e, pra cada campo..toda vez que tirar o foco dele
camposDoFormulario.forEach( (campo) =>{
                                // vai criar a função verificaCampo
    campo.addEventListener("blur", () =>verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})
// erros prováveis
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]
// mensagens de erro
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}


// verificação se é um numero de cpf
function verificaCampo (campo) {
    let mensagem = "";
    campo.setCustomValidity('')
    if(campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo)
    }
    if(campo.name == "aniversario" && campo.value != ""){
        ehMaiorDeIdade(campo)
    }
    // pra cada tipo de erro, pega esse erro e..
    tiposDeErro.forEach (   (erro) => {
        // ve se na validação vai acontecer ele....se acontecer
        if(campo.validity[erro]) {
            // faz isso aqui
            mensagem = mensagens[campo.name][erro];

        }
    })
    // captura o espaço onde vai ir a mensagem
    // o parent node ali é pra selecionar apenas o que ta embaaixo
    // do input desejado
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    // verifica se é true ou false o erro
    const validadorDeInput = campo.checkValidity();

    // se
    if(!validadorDeInput) {
        // não for valido, imprime a mensagem
        mensagemErro.textContent = mensagem
    } else {
        // se for valido, deixa em branco
        mensagemErro.textContent = ''
    }
}