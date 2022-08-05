'use strict';

let inputTextContent = document.querySelector(".text-input");
let warningText = document.querySelector(".conditions-container")
let encryptButton = document.querySelector(".encrypt");
let decryptButton = document.querySelector(".decrypt");
let resultTextContainer = document.querySelector(".result-text");


encryptButton.onclick = () => encrypt();
decryptButton.onclick = () => decrypt();

function saveText(){
    let inputText = inputTextContent.value.split('');
    return inputText;
}

function verifyText(text){
    let condition = true;
    for(let i=0; i<text.length; i++) {
        if(((text[i].charCodeAt(0) >= 97)  && (text[i].charCodeAt(0) <= 160 )) ||
            (text[i].charCodeAt(0) == 32)){
                //son minúsculas o espacios
            }
        else{
            warningText.style.border = "1px solid red"
            condition = false;
            break;
        }
    }
    return condition;
}

function encrypt(){
    let text = ''
    text = saveText();
    if(verifyText(text)){
        for(let i = 0; i < text.length; i++) {
            if(text[i] == 'a'){
                text[i] = 'ai';
            }
            else if(text[i] == 'e'){
                text[i] = 'enter';;
            }
            else if(text[i] == 'i'){
                text[i] = 'imes';
            }
            else if(text[i] == 'o'){
                text[i] = 'ober';
            }
            else if(text[i] == 'u'){
                text[i] = 'ufat';
            }
        }
    }
    else{
        return false;
    }
    warningText.style.border = "none";
    renderText(text.join(''));
}

function decrypt(){
    let text = inputTextContent.value
    if(verifyText(text)){
        let reA = /ai/gi;
        let reE = /enter/gi;
        let reI = /imes/gi;
        let reO = /ober/gi;
        let reU = /ufat/gi;
        let textA = text.replace(reA, "a");
        let textE = textA.replace(reE, "e");
        let textI = textE.replace(reI, "i");
        let textO = textI.replace(reO, "o");
        let textU = textO.replace(reU, "u");
        let newText = textU;
        renderText(newText);
    }
    else{
        return false;
    }
}

function renderText(text){
    resultTextContainer.innerHTML = '';
    if(text != null && text != '' && text != undefined){
        const textContainer = document.createElement("div");
        const textContent = document.createElement("p");
        const copyButton = document.createElement("button");

        textContainer.classList.add("text-result");
        copyButton.classList.add("copy-button");
        textContent.classList.add("main-result-text");

        textContent.innerHTML = text;
        copyButton.innerHTML = "Copiar";

        resultTextContainer.appendChild(textContainer);
        textContainer.appendChild(textContent);
        textContainer.appendChild(copyButton);

        copyButton.onclick = () => copyText(textContent);
    }
    else{
        const textContainer = document.createElement("div");
        const textH1 = document.createElement("h1");
        const textP = document.createElement("p");
        const img = document.createElement("img");
        

        textContainer.classList.add("result-text");

        textH1.innerHTML = "Ningún mensaje fue encontrado";
        textP.innerHTML = "Ingresa el texto que desees encriptar o desencriptar";

        img.setAttribute('src', "./img/find.png");

        resultTextContainer.appendChild(textContainer);
        textContainer.appendChild(img);
        textContainer.appendChild(textH1);
        textContainer.appendChild(textP);
    }
}

function copyText(text){
    navigator.clipboard.writeText(text.innerHTML);
}