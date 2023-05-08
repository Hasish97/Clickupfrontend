import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  type: "bar",
  height: 30,
  options: {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#f83f37"],
    plotOptions: {
      bar: {
        columnWidth: "60%"
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
      data: [2, 9, 7, 4, 3, 8, 1]
    }
  ]
};
export default chartData;
