import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 350,
  type: "bubble",
  options: {
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient"
    },
    colors: ["#4680ff", "#0e9e4a", "#fa7d03", "#ff5252"],
    title: {
      text: "3D Bubble Chart"
    },
    xaxis: {
      tickAmount: 12,
      type: "datetime",
      labels: {
        rotate: 0
      }
    },
    yaxis: {
      max: 70
    },
    theme: {
      palette: "palette2"
    }
  },
  series: [
    {
      name: "Product1",
      data: generateDatasehratheatbubble3d(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "Product2",
      data: generateDatasehratheatbubble3d(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "Product3",
      data: generateDatasehratheatbubble3d(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60
        }
      )
    },
    {
      name: "Product4",
      data: generateDatasehratheatbubble3d(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60
        }
      )
    }
  ]
};
function generateDatasehratheatbubble3d(baseval: number, count: number, yrange: { max: number; min: number }) {
  let i = 0;
  const series = [];
  while (i < count) {
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
    series.push([baseval, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}
export default chartData;