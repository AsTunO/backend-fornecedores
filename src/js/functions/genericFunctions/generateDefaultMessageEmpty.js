function generateDefaultMessageEmpty() {
    let panelElement = document.getElementById('Panel')

    var EmptyMessageField = document.createElement('div');
    var EmptyMessageP = document.createElement('p');

    EmptyMessageField.classList.add('EmptyMessageF');
    EmptyMessageP.classList.add('EmptyMessageP');

    EmptyMessageP.textContent = "Não foi encontrado nenhum forncedor em nossa base de dados"

    EmptyMessageField.appendChild(EmptyMessageP);

    panelElement.appendChild(EmptyMessageField)
}

export default generateDefaultMessageEmpty