import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 350,
  type: "heatmap",
  options: {
    dataLabels: {
      enabled: false
    },
    colors: ["#4680ff"],
    title: {
      text: "HeatMap Chart (Single color)"
    }
  },
  series: [
    {
      name: "Metric1",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric2",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric3",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric4",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric5",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric6",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric7",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric8",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    },
    {
      name: "Metric9",
      data: generateDatasehratheat(12, {
        min: 0,
        max: 90
      })
    }
  ]
};
function generateDatasehratheat(count: number, yrange: { max: number; min: number }) {
  let i = 0;
  const series = [];
  while (i < count) {
    series.push({
      x: "w" + (i + 1).toString(),
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
    i++;
  }
  return series;
}
export default chartData;