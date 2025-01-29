import generateSupplierField from "../genericFunctions/generateSupplierField.js"
import validateInfo from "../validateFunctions/validateInfo.js"

function filterBySuppliersInfo(DATASTORE, info) {

    if(typeof info === 'undefined') {
        DATASTORE.forEach(currentSupplier => {
            generateSupplierField(currentSupplier)
        })
    }else {
        DATASTORE.forEach(currentSupplier => {
            if(validateInfo(currentSupplier, info)) {
                generateSupplierField(currentSupplier, info)
            }
        })
    }

}

export default filterBySuppliersInfo