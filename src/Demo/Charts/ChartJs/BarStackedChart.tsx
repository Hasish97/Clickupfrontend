import * as React from 'react';
import { ChartData, Bar} from 'react-chartjs-2';
import * as chartjs from 'chart.js';
class BarStackedChart extends React.Component<{}, {}> {
  render() {
    const data: ChartData<chartjs.ChartData> = (canvas) => {
      let bar = (canvas as HTMLCanvasElement).getContext('2d');
      let theme_g1 = bar.createLinearGradient(0, 300, 0, 0);
      theme_g1.addColorStop(0, "#4680ff");
      theme_g1.addColorStop(1, "#4680ff");
      let theme_g2 = bar.createLinearGradient(0, 300, 0, 0);
      theme_g2.addColorStop(0, "#fa7d03");
      theme_g2.addColorStop(1, "#fa7d03");
      return {
        labels: [0, 1, 2, 3],
        datasets: [
          {
            label: "Data 1",
            data: [25, 45, 74, 85],
            borderColor: theme_g1,
            backgroundColor: theme_g1,
            hoverborderColor: theme_g1,
            hoverBackgroundColor: theme_g1
          },
          {
            label: "Data 2",
            data: [30, 52, 65, 65],
            borderColor: theme_g2,
            backgroundColor: theme_g2,
            hoverborderColor: theme_g2,
            hoverBackgroundColor: theme_g2
          }
        ]
      };
    };
    return (
      <Bar
        data={data}
        options={{
          scales: {
            xAxes: [
              {
                stacked: true
              }
            ],
            yAxes: [
              {
                stacked: true
              }
            ]
          }
        }}
      />
    );
  }
}
export default BarStackedChart;
