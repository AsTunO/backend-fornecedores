document.addEventListener('DOMContentLoaded', function () {

    const loginContainer = document.querySelector('.container-login');
    loginContainer.classList.add('show');
    // Função para lidar com a resposta do Google Login
    function handleCredentialResponse(response) {
        if (!response || !response.credential) {
            alert("Erro ao fazer login com o Google. Por favor, tente novamente.");
            return;
        }

        console.log("Credential Response:", response);

        const jwt = response.credential; // Token JWT retornado pelo Google
        console.log("JWT recebido:", jwt);

        // Armazena no localStorage que o usuário está autenticado
        localStorage.setItem('authenticated', 'true');

        // Redireciona para a página principal
        window.location.href = "./src/mainPage.html";
    }

    // Inicializa o botão de login do Google
    google.accounts.id.initialize({
        client_id: "423424600170-siq6j9atm3j9rrabkjljl1ko9c83d4s2.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: false, // Evita login automático
    });

    google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"),
        {
            theme: "outline",
            size: "large",
            logo_alignment: "left"
        }
    );

    google.accounts.id.prompt(); // Prompt para login
});

// Adiciona verificação de autenticação na mainPage.html
if (window.location.pathname.includes("mainPage.html")) {
    document.addEventListener('DOMContentLoaded', function () {
        const isAuthenticated = localStorage.getItem('authenticated');
        if (!isAuthenticated) {
            // Redireciona para a página de login
            window.location.href = "../index.html";
        }
    });
}

