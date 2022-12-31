var runData = null;
var runDataIndex = 0;
var instrumentData = null;
function getRuns() {
    fetch("http://localhost:8080/Celatum/HelloWorld?method=runs").then(function(response) {
        return response.json();
    }).then(function(data) {
        displayRuns(data);
    }).catch(function(err) {
        console.log("error: " + err);
    });
}
function displayRuns(data) {
    // <option value="volvo">Volvo</option>
    runData = data;
    var container = document.getElementById("runs");
    for(var i = 0; i < data.length; i++){
        var div = document.createElement("option");
        div.innerHTML = data[i].runDate + " " + data[i].type;
        div.value = i;
        container.appendChild(div);
    }
    getInstruments(0);
}
function getInstruments(i) {
    runDataIndex = i;
    var description = document.getElementById("description");
    description.innerHTML = runData[i].algoDescription;
    var stats = document.getElementById("statistics");
    stats.innerHTML = runData[i].algoStatistics;
    fetch("http://localhost:8080/Celatum/HelloWorld?method=runs&algorunref=" + runData[i].algoRunRef).then(function(response) {
        return response.json();
    }).then(function(data) {
        displayInstrument(data);
    }).catch(function(err) {
        console.log("error: " + err);
    });
}
function displayInstrument(data) {
    instrumentData = data;
    var container = document.getElementById("instruments");
    // remove all children
    var child = container.lastElementChild;
    while(child){
        container.removeChild(child);
        child = e.lastElementChild;
    }
    // add new ones
    for(var i = 0; i < data.length; i++){
        var div = document.createElement("option");
        div.innerHTML = data[i].name;
        container.appendChild(div);
    }
    populateChart(0);
}
function populateChart(instIndex) {
    // Get histories
    fetch("http://localhost:8080/Celatum/HelloWorld?method=history&instrumentname=" + instrumentData[instIndex].name).then(function(response) {
        return response.json().then((data)=>{
            candleSeries.setData(data.map((candle)=>{
                return {
                    time: candle.time,
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close
                };
            }));
        });
    });
    // Get positions
    fetch("http://localhost:8080/Celatum/HelloWorld?method=runs&algorunref=" + runData[runDataIndex].algoRunRef + "&instrumentname=" + instrumentData[instIndex].name).then(function(response) {
        return response.json();
    }).then(function(data) {
        displayPositions(data);
    }).catch(function(err) {
        console.log("error: " + err);
    });
}
function displayPositions(data) {
    var markers = null;
    for(var i = 0; i < data.length; i++){
        markers.push({
            time: data[i].entryDate,
            position: "belowBar",
            color: "#2196F3",
            shape: "arrowUp",
            text: data[i].description
        });
        markers.push({
            time: data[i].closeDate,
            position: "aboveBar",
            color: "#e91e63",
            shape: "arrowDown",
            text: data[i].description
        });
    }
    candleSeries.setMarkers(markers);
}

//# sourceMappingURL=backtest.a00610d7.js.map
