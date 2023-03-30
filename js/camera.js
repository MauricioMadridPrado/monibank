// captura o botao de iniciar a camera
const botaoIniciarCamera = document.querySelector("[data-video-botao]");
// captura o campo da camera, onde ela vai ficar
const campoCamera = document.querySelector("[data-camera]");
// captura parte do video
const video = document.querySelector("[data-video]");
// captura o botão que tira a foto
const botaoTirarFoto = document.querySelector("[data-tirar-foto]")
// local onde a foto vai ficar
const canvas = document.querySelector("[data-video-canvas]")
// local do resultado de texto pós foto
const mensagem = document.querySelector("[data-mensagem]")
// variavel iniciada, onde vai ir a imagem
let ImagemURL = "";
// capturando botão que envia a foto
const botaoEnviarFoto = document.querySelector("[data-enviar]")

// evento que ocorre ao clicar na regiao da camera
botaoIniciarCamera.addEventListener("click", async function (){
    // captura a ação de iniciar o video. Assincrona pela questão
    // das premissões 
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    // muda o estilo das coisas com javascript
    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block"
    video.srcObject = iniciarVideo;
})
// colocando evento de tirar foto no botão
botaoTirarFoto.addEventListener("click", function(){
    // criou um canvas e colocou o video na posião que o video estava e no tamanho
    canvas.getContext('2d').drawImage(video, 0, 0,canvas.width, canvas.height)
    // transforma a imagem gerada no canvas numa url
    ImagemURL = canvas.toDataURL("imagem/jpeg");
    // tira o campo da camera
    campoCamera.style.display = "none";
    // deixa a imagem na tela =D
    mensagem.style.display = "block";
})

botaoEnviarFoto.addEventListener("click", () =>{
    const receberDadosExistentes = localStorage.getItem("cadastro")
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = ImagemURL;
    localStorage.setItem("cadastro", JSON.stringify(converteRetorno));
    window.location.href = "./abrir-conta-form-3.html";
})