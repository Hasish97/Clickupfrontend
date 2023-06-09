import * as React from 'react';
import Chart from 'react-apexcharts';
type ChartProps = React.ComponentProps<typeof Chart>;
const chartData: ChartProps = {
  height: 350,
  type: "radialBar",
  options: {
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      radialBar: {
        offsetY: -30,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ["#4680ff", "#0e9e4a", "#fa7d03", "#ff5252"],
    labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 0,
      offsetY: 0,
      labels: {
        useSeriesColors: true
      },
      markers: {
        size: 0
      },
      formatter: (seriesName: string, opts: any) =>
        seriesName + ":  " + opts.w.globals.series[opts.seriesIndex],
      itemMargin: {
        horizontal: 1
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  },
  series: [76, 67, 61, 90]
};
export default chartData;