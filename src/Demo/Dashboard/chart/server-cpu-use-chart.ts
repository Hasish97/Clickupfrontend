import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 350,
  type: "area",
  options: {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 0
    },
    colors: ["#dce7fd"],
    fill: {
      type: "solid"
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00"
      ]
    },
    grid: {
      borderColor: "#eee"
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }
  },
  series: [
    {
      name: "series1",
      data: [0, 50, 20, 60, 30, 25, 10]
    }
  ]
};
export default chartData;