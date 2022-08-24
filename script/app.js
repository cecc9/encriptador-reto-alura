// https://albasly.github.io/ONE-Alura--Encriptador/#seccion-salida
import { encrypted, decrypted, copyToClipBoard } from "./data-encrypted.js";

const buttonEncryptor = document.querySelector(".btn-encrypted");
const buttonDecryptor = document.querySelector(".btn-decrypted");
const textArea = document.querySelector("textarea");
const backgroundTextArea = document.querySelector(".background-textarea");
const backgroundTextAreaTitle = document.querySelector(
    ".background-textarea h2"
);
const textsContainer = document.querySelector(".container-texts");
const textVoid = document.querySelector(".text-void");

let texts = [];

window.addEventListener("DOMContentLoaded", function () {
    domContentLoaded();
});

function domContentLoaded() {
    if (texts.length !== 0) {
        loadTexts();
        textVoid.style.display = "none";
    }
}

// DomContentLoaded();

buttonEncryptor.addEventListener("click", function () {
    if (textArea.value) {
        const textEncryted = encrypted(textArea.value);
        const similarText = texts.find((text) => text === textEncryted);

        if (similarText) {
            backgroundTextArea.classList.add("message-textarea");
            backgroundTextAreaTitle.textContent =
                "el texto ya se encuentra encriptado...";
            setTimeout(function () {
                backgroundTextArea.classList.remove("message-textarea");
                backgroundTextAreaTitle.textContent = "Ingrese texto...";
            }, 2000);
        } else {
            texts = [...texts, textEncryted];
            textArea.value = "";
            domContentLoaded();
        }

        // loadTexts();
    } else {
        backgroundTextArea.classList.add("message-textarea");
        setTimeout(function () {
            backgroundTextArea.classList.remove("message-textarea");
        }, 2000);
    }
});
buttonDecryptor.addEventListener("click", function () {
    if (textArea.value) {
        const textEncrytedIndex = texts.findIndex(
            (item) => item === textArea.value
        );

        if (textEncrytedIndex === -1) {
            backgroundTextArea.classList.add("message-textarea");
            backgroundTextAreaTitle.textContent = "Texto no encontrado...";
            setTimeout(function () {
                backgroundTextArea.classList.remove("message-textarea");
                backgroundTextAreaTitle.textContent = "Ingrese texto...";
            }, 2000);

            return;
        }

        const textEncryted = decrypted(textArea.value);
        texts[textEncrytedIndex] = textEncryted;
        textArea.value = "";
        loadTexts();

        textsContainer.children[textEncrytedIndex].classList.add("change-text");
        setTimeout(() => {
            textsContainer.children[textEncrytedIndex].classList.remove(
                "change-text"
            );
        }, 1000);
    } else {
        backgroundTextArea.classList.add("message-textarea");
        setTimeout(function () {
            backgroundTextArea.classList.remove("message-textarea");
        }, 2000);
    }
});

function loadTexts() {
    textsContainer.innerHTML = "";

    texts.forEach(function (text) {
        const article = document.createElement("article");
        article.classList.add("article-text");
        article.addEventListener("click", function () {
            copyToClipBoard(text);
        });
        article.innerHTML = `
            <div class="text">${text}</div>
        `;
        textsContainer.appendChild(article);
    });
}
