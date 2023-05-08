import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  type: "bar",
  height: 150,
  options: {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#ffbf36"],
    plotOptions: {
      bar: {
        columnWidth: "25%"
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
      data: [150, 335, 240, 200, 275, 205, 170, 150]
    }
  ]
};
export default chartData;
