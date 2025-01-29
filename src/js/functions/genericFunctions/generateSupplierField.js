function createAndAppendElement(tag, classes = [], textContent = '') {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = textContent;
    return element;
}

function generateSupplierField(currentSupplier) {
    const panelElement = document.getElementById('Panel');
    const whitePanel = createAndAppendElement('div', ['white-panel']);
    
    const divSupplierField = createAndAppendElement('div', ['supplierField', 'button']);
    
    // Verifica se o campo "Descrição de serviço ou produto" está definido antes de usar toUpperCase
    const serviceType = currentSupplier["Descrição de serviço ou produto"] 
        ? currentSupplier["Descrição de serviço ou produto"].toUpperCase() 
        : 'N/A';
    divSupplierField.appendChild(createAndAppendElement('p', ['serviceType'], serviceType));

    const nameElement = createAndAppendElement('p', ['name']);
    const razaoSocial = currentSupplier["Razão Social"] && currentSupplier["Razão Social"].length >= 2
        ? currentSupplier["Razão Social"].toUpperCase()
        : currentSupplier["Nome fantasia"] ? currentSupplier["Nome fantasia"].toUpperCase() : 'N/A';
    nameElement.textContent = razaoSocial;
    divSupplierField.appendChild(nameElement);

    const cnpjElement = createAndAppendElement('p', ['cnpj']);
    cnpjElement.textContent = currentSupplier["CNPJ"] ?? 'CNPJ não disponível';
    divSupplierField.appendChild(cnpjElement);

    const showMoreButton = createAndAppendElement('button', ['arrow-button']);
    divSupplierField.appendChild(showMoreButton);
    
    const detailsPanel = createAndAppendElement('div', ['details-panel']);
    panelElement.appendChild(divSupplierField);
    panelElement.appendChild(detailsPanel);
    document.body.appendChild(whitePanel);

    let isDetailsVisible = false;

    showMoreButton.addEventListener('click', () => {
        if (isDetailsVisible) {
            detailsPanel.innerHTML = '';
            detailsPanel.style.display = 'none';
            isDetailsVisible = false;
        } else {
            for (let field in currentSupplier) {
                if (field !== "Informe o link para o seu portfólio") {
                    const detailWrapper = createAndAppendElement('div', ['detail-wrapper']);
    
                    const fieldElement = createAndAppendElement('p', ['field'], `${field.replace(/_/g, ' ')}:`);
                    detailWrapper.appendChild(fieldElement);
    
                    let value = currentSupplier[field] ? currentSupplier[field].replace(/_/g, ' ') : 'Informação indisponível';
                    if (field === "Endereço de e-mail") {
                        value = value.toLowerCase(); // Convertendo para minúsculas
                    }
                    const valueElement = createAndAppendElement('p', ['value'], value);
                    detailWrapper.appendChild(valueElement);
    
                    detailsPanel.appendChild(detailWrapper);
                }
            }
            detailsPanel.style.display = 'grid';
            isDetailsVisible = true;
        }
    });
}

export default generateSupplierField;
