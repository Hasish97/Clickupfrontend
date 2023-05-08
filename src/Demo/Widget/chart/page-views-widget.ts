import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  type: "bar",
  height: 90,
  options: {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [
      "#ffbf36",
      "#ffbf36",
      "#ffbf36",
      "#ffbf36",
      "#ffbf36",
      "#CCCCCC",
      "#CCCCCC"
    ],
    plotOptions: {
      bar: {
        columnWidth: "60%",
        distributed: true
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: (seriesName: string) => {
            return "Amount Spent :";
          }
        }
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      data: [5, 2, 7, 4, 3, 2, 6]
    }
  ]
};
export default chartData;