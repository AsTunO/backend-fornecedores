import validateFullFields from "../validateFunctions/validateFullFields.js";
import generateSupplierField from "../genericFunctions/generateSupplierField.js";
import validateInfo from "../validateFunctions/validateInfo.js";

function filterByFullSuppliersInfo(DATASTORE, info) {

    if(typeof info === 'undefined') {
        DATASTORE.forEach(currentSupplier => {
            if(validateFullFields(currentSupplier)) {
                generateSupplierField(currentSupplier)
            }
        })
    }else {
        DATASTORE.forEach(currentSupplier => {
            if(validateFullFields(currentSupplier) && validateInfo(currentSupplier, info)) {
                generateSupplierField(currentSupplier, info)
            }
        })
    }


}

export default filterByFullSuppliersInfo;