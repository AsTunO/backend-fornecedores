// fetchData.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const dadosContainer = document.getElementById('dadosContainer');
  const dadosTableBody = document.querySelector('#dadosTable tbody');

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;



      
      // Aqui você deve implementar a lógica de autenticação
      // Por simplicidade, vamos assumir que qualquer entrada é válida

      // Após a autenticação, buscar os dados
      try {
          const response = await fetch('/api/dados');
          if (!response.ok) {
              throw new Error('Erro ao buscar os dados');
          }
          const dados = await response.json();
          exibirDados(dados);
      } catch (error) {
          console.error(error);
          alert('Falha ao carregar os dados.');
      }
  });

  function exibirDados(dados) {
      // Limpa a tabela antes de adicionar novos dados
      dadosTableBody.innerHTML = '';

      dados.forEach(item => {
          const tr = document.createElement('tr');

          const tdNome = document.createElement('td');
          tdNome.textContent = item.nome || 'N/A';
          tr.appendChild(tdNome);

          const tdMajor = document.createElement('td');
          tdMajor.textContent = item.major || 'N/A';
          tr.appendChild(tdMajor);

          // Adicione mais células conforme necessário

          dadosTableBody.appendChild(tr);
      });

      // Mostra a seção de dados
      dadosContainer.style.display = 'block';
  }
});
