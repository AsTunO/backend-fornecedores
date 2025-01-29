function changeBackground(color, element) {

    if(color != null) {
        element.style.cursor = 'pointer'; // Muda o cursor quando o mouse está sobre o ícone
        element.style.color = color;
    }else {
        element.style.color = '';
    }
}

export default changeBackground