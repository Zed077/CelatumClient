import { createChart } from "lightweight-charts";

// Runs with npx parcel index.html

// REPLACE EVERYTHING BELOW HERE
function generateData() {
  var res = [];
  var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
  for (var i = 0; i < 500; ++i) {
    res.push({
      time: time.getTime() / 1000,
      value: i
    });

    time.setUTCDate(time.getUTCDate() + 1);
  }

  return res;
}

var chart = createChart(document.getElementById("container"));

var candleSeries = chart.addCandlestickSeries({
  upColor: "#4bffb5",
  downColor: "#ff4976",
  borderDownColor: "#ff4976",
  borderUpColor: "#4bffb5",
  wickDownColor: "#838ca1",
  wickUpColor: "#838ca1"
});

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
