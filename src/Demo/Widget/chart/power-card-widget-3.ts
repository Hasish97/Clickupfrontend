import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  type: "line",
  height: 75,
  options: {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#22af47"],
    stroke: {
      curve: "smooth",
      width: 3
    },
    yaxis: {
      min: 10,
      max: 100
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName: string) =>  "Temperature"
        }
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      name: "series1",
      data: [55, 35, 75, 50, 90, 50]
    }
  ]
};
export default chartData;
