import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 350,
  type: "scatter",
  options: {
    chart: {
      zoom: {
        type: "xy"
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#4680ff", "#0e9e4a", "#ff5252", "#fa7d03", "#00acc1"],
    grid: {
      xaxis: {
        showLines: true
      },
      yaxis: {
        showLines: true
      }
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      max: 70
    }
  },
  series: [
    {
      name: "TEAM 1",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "TEAM 2",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "TEAM 3",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        30,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "TEAM 4",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        10,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "TEAM 5",
      data: generateDayWiseTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        30,
        {
          min: 10,
          max: 60
        }
      )
    }
  ]
};
function generateDayWiseTimeSeries(baseval: number, count: number, yrange: { max: number; min: number }) {
  let i = 0;
  const series = [];
  while (i < count) {
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([baseval, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
export default chartData;