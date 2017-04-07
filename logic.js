//Hi bro
var confObj = {};
window.onload = init();

/**
 * This fired when the HTML has loaded
 */
function init () {
//Initializations
//declared as global variables
confObj.count = 0;
confObj.dropDownValues = [];
confObj.selectElems = document.getElementById('dropdownContainer').getElementsByTagName('select');
}

/**
 * This method is fired when the user clicks on any of the checkboxes
 * @param {DOM checkbox object} checkBoxElem 
 * @param {number} checkBoxNo 
 */
function handleCheckBoxClick(checkBoxElem, checkBoxNo) {
    var isChecked = checkBoxElem.checked;
    if (isChecked) {
        confObj.count++;
        enableDrodown(checkBoxNo);
    } else {
        confObj.count--;
        disableDropdown(checkBoxNo);
    }
    console.log("No of checked boxes  is " + confObj.count);
    populateDropdownValuesBasedOnCount();
    populateAllDropdowns();
};

/**
 * this method enables the select tag that corresponds to checkbox
 * whose number is passed as an input param
 * @param {number} checkBoxNo 
 */
function enableDrodown(checkBoxNo) {
var elem = document.getElementById('selectBox' + checkBoxNo);
elem.disabled = false; 
}

/**
 * this method disables the select tag that corresponds to checkbox
 * whose number is passed as an input param
 * @param {number} checkBoxNo 
 */
function disableDropdown(checkBoxNo) {
var elem = document.getElementById('selectBox' + checkBoxNo);
elem.disabled = true; 
}

/**
 * This method populates all the dropdowns
 */
function populateAllDropdowns() {
    var selectElems  = confObj.selectElems;
    var dropDownValues = confObj.dropDownValues;
    for (var x=0;x<selectElems.length;x++) {
        populateDropdown(selectElems[x]);
    }
}

/**
 * This method is fired when value of select tag changes
 * @param {DOM select object} selectElem 
 */
function handleSelectClick(selectElem) { 
    var selectElems = confObj.selectElems;
    var dropDownValues = confObj.dropDownValues;
    for(var i=0;i<selectElems.length;i++) {
        if (dropDownValues.indexOf(selectElems[i].value) != -1) {
            dropDownValues.splice(dropDownValues.indexOf(selectElems[i].value),1);
        } 
    }
    console.log("Values sent to populateOtherDrodowns " + dropDownValues);
    populateOtherDropdowns(selectElem, dropDownValues);
}

/**
 * This method populates the dropdowns which have no option selected
 * @param {DOM select object} selectElem 
 * @param {Array} dropDownValues 
 */
function populateOtherDropdowns(selectElem, dropDownValues) {
    var selectElems = confObj.selectElems;
    for (var x=0;x<selectElems.length;x++) {
        if(selectElems[x].value === "") {
            populateDropdown(selectElems[x]);
        } 
    }
    populateDropdownValuesBasedOnCount();
    console.log("dropdown values for next iteration " + confObj.dropDownValues)
}

/**
 * Method to populate the select tag
 * @param {DOM seelct Object} selectElem 
 */
function populateDropdown(selectElem) {
    var dropDownValues = confObj.dropDownValues;
    //empty the array
    selectElem.length = 0;
    //adding th e first option
    selectElem.add(new Option("Please select a option",""));
    //populate the array
    for(var i=0;i<dropDownValues.length;i++){
        //Create a new Option object
        var optionElem = new Option(dropDownValues[i], dropDownValues[i]);
        //add it to the select object
        selectElem.add(optionElem);
    }
}

/**
 * Function to populate dropDownValues based on confObj.count
 */
function populateDropdownValuesBasedOnCount() {
    confObj.dropDownValues.length = 0;
    for(var i=1;i<=confObj.count;i++) {
    confObj.dropDownValues.push(i.toString());
    }
}