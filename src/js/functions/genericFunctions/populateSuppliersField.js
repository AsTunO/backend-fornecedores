import filterByFullSuppliersInfo from "../filterFunctions/filterByFullSuppliersInfo.js";
import filterBySuppliersInfo from "../filterFunctions/filterBySuppliersInfo.js"
import generateDefaultMessageEmpty from "../genericFunctions/generateDefaultMessageEmpty.js"

function populateSuppliersField(DATASTORE, stateFullFields, info) {

    const listInfoIndex = document.getElementById("listInfoIndex"); // Set span text
    if(info != undefined) {listInfoIndex.textContent = "- " + info;}
    
    let panelElement = document.getElementById('Panel')
    let searchField = document.getElementById("Search")
    panelElement.innerHTML = '';
    if(info == "Todos" || info == null) {
        stateFullFields == "on" ? filterByFullSuppliersInfo(DATASTORE) : filterBySuppliersInfo(DATASTORE)
        if(!panelElement.hasChildNodes()) {
            generateDefaultMessageEmpty()
            searchField.value = ""
        }
    }else {
        stateFullFields == "on" ? filterByFullSuppliersInfo(DATASTORE, info) : filterBySuppliersInfo(DATASTORE, info)
        if(!panelElement.hasChildNodes()) {
            generateDefaultMessageEmpty()
            searchField.value = ""
        }
    }
}

export default populateSuppliersField;