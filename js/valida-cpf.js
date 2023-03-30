export default function ehUmCPF(campo) {
    // ajua a manter somente os numeros, independente de como o usuário
    // colocar o cpf...seja com pontuação ou sem 
    const cpf = campo.value.replace(/\.|-/g, "");
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity ('Esse cpf não é valido!')
    } 
}
// impede cpf com numeros repetidos

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
    ]
    return numerosRepetidos.includes(cpf);
}
// validação do primeiro digito final xxx.xxx.xxx-(esse aqui)x

function validaPrimeiroDigito (cpf) {
    let soma = 0;
    let multiplicador = 10;
    for(let tamanho = 0; tamanho < 9; tamanho++){
        soma += cpf[tamanho] * multiplicador;
        multiplicador --;
    }
    soma = (soma *10) %11;
    if (soma == 10 || soma ==1) {
        soma =0
    }
    return soma!= cpf[9];
}
// validação do segundo digito final xxx.xxx.xxx-x(esse aqui)
function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}