import { createChart } from "lightweight-charts";

// Runs with npx parcel index.html

var chartContainer = document.getElementById("container");
var chart = createChart(chartContainer);

var runData = null;
var runDataIndex = 0;
var instrumentData = null;

var candleSeries = chart.addCandlestickSeries({
  upColor: "#4bffb5",
  downColor: "#ff4976",
  borderDownColor: "#ff4976",
  borderUpColor: "#4bffb5",
  wickDownColor: "#838ca1",
  wickUpColor: "#838ca1"
});

var pnlSeries = chart.addLineSeries({
	color: '#26a69a',
	priceFormat: {
		type: 'volume',
	},
	priceScaleId: '',
	scaleMargins: {
		top: 0.8,
		bottom: 0,
	},
});

/*
fetch("http://localhost:8080/Celatum/HelloWorld?method=history")
  .then(function (response) {
    return response.json().then((data) => {
      candleSeries.setData(data.map(candle => {
        return {
          time: candle.time,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        };
      }));
    });
  });
*/
// Make Chart Responsive with screen resize
new ResizeObserver(entries => {
  if (entries.length === 0 || entries[0].target !== chartContainer) { return; }
  const newRect = entries[0].contentRect;
  chart.applyOptions({ height: newRect.height, width: newRect.width });
}).observe(chartContainer);


  fetch("http://localhost:8080/Celatum/HelloWorld?method=runs")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayRuns(data);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });


function displayRuns(data) {
  // <option value="volvo">Volvo</option>

  runData = data;
  var container = document.getElementById("runs");

  for (var i = 0; i < data.length; i++) {
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

  fetch("http://localhost:8080/Celatum/HelloWorld?method=runs&algorunref=" + runData[i].algoRunRef)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayInstrument(data);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });
}

function displayInstrument(data) {
  instrumentData = data;

  var container = document.getElementById("instruments");

  // remove all children
  var child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }

  // add new ones
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("option");
    div.innerHTML = data[i].name;
    div.value = i;
    container.appendChild(div);
  }

  populateChart(0);
}

function populateChart(instIndex) {
  // Get histories
  fetch("http://localhost:8080/Celatum/HelloWorld?method=history&instrumentname=" + instrumentData[instIndex].name)
    .then(function (response) {
      return response.json().then((data) => {
        candleSeries.setData(data.map(candle => {
          return {
            time: candle.time,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close,
          };
        }));
      });
    });

  // Get positions
  fetch("http://localhost:8080/Celatum/HelloWorld?method=runs&algorunref=" + runData[runDataIndex].algoRunRef + "&instrumentname=" + instrumentData[instIndex].name)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayPositions(data);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });

  // Get PnL
  fetch("http://localhost:8080/Celatum/HelloWorld?method=pnl&algorunref=" + runData[runDataIndex].algoRunRef)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayPnL(data);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });
}

function displayPositions(data) {
  var markers = [{ time: data[0].entryDate, position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: data[0].entryDesc }];
  markers.push({ time: data[0].closeDate, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: data[0].closeDesc });
  for (var i = 1; i < data.length; i++) {
    markers.push({ time: data[i].entryDate, position: 'belowBar', color: '#2196F3', shape: 'arrowUp', text: data[i].entryDesc });
    markers.push({ time: data[i].closeDate, position: 'aboveBar', color: '#e91e63', shape: 'arrowDown', text: data[i].closeDesc });
  }
  candleSeries.setMarkers(markers);
}

function displayPnL(data) {
  pnlSeries.setData(data.map(candle => {
    return {
      time: candle.date,
      value: candle.value,
      color: candle.value>0?'rgba(0, 150, 136, 0.8)':'rgba(255,82,82, 0.8)' 
    };
  }));
}

window.populateChart = populateChart;
window.getInstruments = getInstruments;