function validarCNPJ(cnpj) {
  if (!cnpj) {
    return false;
}
    cnpj = cnpj.replace(/[^\d]+/g,'');
  
    if (cnpj.length !== 14) {
      return false;
    }
  
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return false;
    }
  
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
  
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
  
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
      return false;
    }
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
  
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
  
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
      return false;
    }
  
    return true;
  }  

function validateFullFields(currentSupplier) {
    const LIST_OF_VALID_FIELDS = [
        "Descrição de serviço ou produto",
        "CNPJ"
    ]
    const isValidFields = LIST_OF_VALID_FIELDS.every(field => {
        return field in currentSupplier && currentSupplier[field].length > 2;
    });
    
    const isValidCNPJ = validarCNPJ(currentSupplier["CNPJ"]);
    
    const isValid = isValidFields && isValidCNPJ;
    
    return isValid;
}

export default validateFullFields