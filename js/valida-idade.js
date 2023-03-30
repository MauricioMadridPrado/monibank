export default function ehMaiorDeIdade(campo) {
    // captura a data no campo do formulário
    const dataNascimento = new Date(campo.value);
    // chama a função que valida a idade

    // se....o valida idade der falso, ou seja
    // a pessoa é menor de idade
    if(!validaIdade(dataNascimento)){
        // coloca essa mensagem lá, que é coisa customizada
         campo.setCustomValidity("O usuário não  é maior de idade!")
    } else {
        // se não, deixa sem mensagem
        campo.setCustomValidity("")
    }
}
// função que valida a idade
function validaIdade(data) {
    // pega a data atual
    const dataAtual  = new Date();
    // verifica todas as informações do que é inserido no nascimento...

    // pega aquela data e poe mais 18 anos e verifica
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    // retorna se é maior de idade
    return dataAtual >= dataMais18;
}