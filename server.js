const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const cors = require('cors');  // Importando o CORS

const app = express();
const port = 80;

// Habilitar CORS para todas as rotas
app.use(cors());

// Se modificando os SCOPES, delete o token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '12RGAJJEi21HxE4mutVIwy-tDBMQxE57Pl-m2Qi2F1M4',
    range: 'Respostas ao formulário 1',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return [];
  }
  
  let data = [];
  rows.forEach((row) => {
    const obj = {
      "Carimbo de data/hora": row[0],
      "Endereço de e-mail": row[1],
      "Razão Social": row[2],
      "CNPJ": row[3],
      "Anexe o seu portfólio": row[4],
      "Informe o link para o seu portfólio": row[5],
      "Descrição de serviço ou produto": row[6],
      "Nome fantasia": row[7],
      "Cidade": row[8],
      "CNAE": row[9],
      "Estado": row[10],
      "Telefone/Celular": row[11]
    };
    data.push(obj);
  });
  return data;
}

// Rota para retornar o 'data' como uma API JSON
app.get('/api/data', async (req, res) => {
  try {
    const auth = await authorize();
    const data = await listMajors(auth);
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
