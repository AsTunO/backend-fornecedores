import populateSuppliersField from './functions/genericFunctions/populateSuppliersField.js';
import changeBackground from './functions/genericFunctions/changeBackground.js';
import addSupplier from './functions/CRUD/addSupplier.js';

const defaultButtons = document.querySelectorAll('.ButtonType');
const submitButton = document.getElementById("SubmitButton");
const checkStatusSuppliersInfo = document.getElementById("completeSuppliers");
const searchField = document.getElementById("Search");
const addSupplierField = document.getElementById("addSupplier");

let DATASTORE = null;

// Função para buscar o data do server.js
async function fetchDataFromServer() {
    try {
        const response = await fetch('http://147.79.82.201:3000/api/data');
        DATASTORE = await response.json();
        console.log(DATASTORE);
        // Agora vai mostrar os dados obtidos do backendS

        checkStatusSuppliersInfo.value = "on";

        let info = undefined;
        let value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";

        populateSuppliersField(DATASTORE, checkStatusSuppliersInfo.value);

        value = checkStatusSuppliersInfo.addEventListener('change', () => {
            value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
            populateSuppliersField(DATASTORE, value, info);
        });

        defaultButtons.forEach(defaultButton => {
            defaultButton.addEventListener('click', () => {
                value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
                info = defaultButton.textContent;
                populateSuppliersField(DATASTORE, value, info);
                defaultButtons.forEach(button => {
                    button.classList.remove('clicked');
                });
                defaultButton.classList.add('clicked');
            });
        });

        submitButton.addEventListener('click', () => {
            if ((searchField.value).length >= 3) {
                value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
                info = searchField.value;
                populateSuppliersField(DATASTORE, value, info);
                defaultButtons.forEach(button => {
                    button.classList.remove('clicked');
                });
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === "Enter" && (searchField.value).length >= 3) {
                event.preventDefault();
                value = checkStatusSuppliersInfo.checked ? checkStatusSuppliersInfo.value : "off";
                info = searchField.value;
                populateSuppliersField(DATASTORE, value, info);
                defaultButtons.forEach(button => {
                    button.classList.remove('clicked');
                });
            }
        });

        addSupplierField.addEventListener("mouseout", () => changeBackground(null, addSupplierField));
        addSupplierField.addEventListener("mouseover", () => changeBackground("green", addSupplierField));
        addSupplierField.addEventListener("click", () => addSupplier());



    } catch (err) {
        console.error('Erro ao buscar dados do servidor:', err);
    }
}

// Chama a função assíncrona para buscar os dados
fetchDataFromServer();