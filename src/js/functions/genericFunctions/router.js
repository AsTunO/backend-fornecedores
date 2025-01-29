// router.js
import { isAuthenticated } from './auth.js';

export function navigate(route) {
    if (route === '/main') {
        // Verifica se o usuário está autenticado
        if (isAuthenticated()) {
            window.location.href = 'main.html'; // Navega para a página principal
        } else {
            alert('You must log in first!');
            window.location.href = 'index.html'; // Redireciona para o login
        }
    } else if (route === '/login') {
        window.location.href = 'index.html'; // Navega para o login
    }
}
