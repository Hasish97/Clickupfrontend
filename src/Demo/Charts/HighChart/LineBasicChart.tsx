import * as React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const options = {
  chart: {
    type: "spline"
  },
  colors: ["#1de9b6", "#1dc4e9", "#A389D4"],
  title: {
    text: "Solar Employment Growth by Sector, 2010-2017"
  },
  subtitle: {
    text: "Source: thesolarfoundation.com"
  },
  yAxis: {
    title: {
      text: "Number of Employees"
    }
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },
  series: [
    {
      name: "Installation",
      data: [5, 25, 15, 35, 25, 35, 45, 75]
    },
    {
      name: "Manufacturing",
      data: [25, 35, 45, 75, 5, 25, 15, 35]
    },
    {
      name: "Sales & Distribution",
      data: [45, 75, 25, 5, 15, 55, 5, 25]
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom"
          }
        }
      }
    ]
  }
};
class LineBasicChart extends React.Component<{}, {}> {
  render() {
    // @ts-ignore
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}
export default LineBasicChart;
