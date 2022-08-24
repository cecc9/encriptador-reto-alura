const lorem = ["e", "i", "a", "o", "u"];
const ipsus = ["enter", "imes", "ai", "ober", "ufat"];

export function encrypted(value) {
    let stringValue = value.toLowerCase();
    lorem.forEach(function (item, index) {
        if (stringValue.includes(item)) {
            stringValue = stringValue.replaceAll(item, ipsus[index]);
        }
    });

    return stringValue;
}

export function decrypted(value) {
    let stringValue = value.toLowerCase();
    ipsus.forEach(function (item, index) {
        if (stringValue.includes(item)) {
            stringValue = stringValue.replaceAll(item, lorem[index]);
        }
    });
    return stringValue;
}

export function copyToClipBoard(copyText) {
    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");

    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute("value", copyText);

    // Añade el campo a la página
    document.body.appendChild(aux);

    // Selecciona el contenido del campo
    aux.select();

    // Copia el texto seleccionado
    document.execCommand("copy");

    // Elimina el campo de la página
    document.body.removeChild(aux);
}
