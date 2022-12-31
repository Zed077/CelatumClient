function getSizing() {
    // var sizingDataContainer = document.getElementById("sizingDataContainer");
    fetch("http://localhost:8080/Celatum/HelloWorld?method=sizing").then(function(response) {
        return response.json();
    }).then(function(data) {
        appendData(data);
    }).catch(function(err) {
        console.log("error: " + err);
    });
}
function appendData(data) {
    /*
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i].instrumentName + ' ' + parseFloat(data[i].minContractsATR).toFixed(2);
    sizingDataContainer.appendChild(div);
  }
*/ let table = document.querySelector("table");
    let keys = Object.keys(data[0]);
    generateTableHead(table, keys);
    generateTable(table, data);
}
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key1 of data){
        let th = document.createElement("th");
        let text = document.createTextNode(key1);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateTable(table, data) {
    for (let element of data){
        let row = table.insertRow();
        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

//# sourceMappingURL=index.2a33c23e.js.map
