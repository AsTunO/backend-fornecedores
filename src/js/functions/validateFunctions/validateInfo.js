function validateInfo(currentSupplier, info) {
    
    let validateStatus = null;

    let contentString = '';

    for (const prop in currentSupplier) {
        contentString += currentSupplier[prop];
    }

    contentString = contentString.toUpperCase()
    info = info.toUpperCase()

    if(contentString.includes(info)) {
        validateStatus =  true
    }else {
        validateStatus = false
    }

    return validateStatus
}

export default validateInfo