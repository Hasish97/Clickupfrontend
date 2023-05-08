import * as React from 'react';
import { ChartData, Line } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
class LineBasicChart extends React.Component<{}, {}> {
  render() {
    const data: ChartData<chartjs.ChartData> = (canvas) => {
      let bar = (canvas as HTMLCanvasElement).getContext('2d');
      let theme_g1 = bar.createLinearGradient(0, 0, 500, 0);
      theme_g1.addColorStop(0, "#4680ff");
      theme_g1.addColorStop(1, "#4680ff");
      let theme_g2 = bar.createLinearGradient(0, 0, 500, 0);
      theme_g2.addColorStop(0, "#7ad835");
      theme_g2.addColorStop(1, "#7ad835");
      return {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: "D1",
            data: [45, 60, 45, 80, 60, 80, 45],
            fill: true,
            borderWidth: 4,
            borderColor: theme_g1,
            backgroundColor: theme_g1,
            hoverborderColor: theme_g1,
            hoverBackgroundColor: theme_g1
          },
          {
            label: "D2",
            data: [45, 80, 45, 45, 60, 45, 80],
            fill: true,
            cubicInterpolationMode: "monotone",
            borderWidth: 0,
            borderColor: "#0e9e4a",
            backgroundColor: "#0e9e4a",
            hoverborderColor: "#0e9e4a",
            hoverBackgroundColor: "#0e9e4a"
          },
          {
            label: "D3",
            data: [83, 45, 60, 45, 45, 55, 45],
            fill: true,
            borderWidth: 4,
            borderColor: theme_g2,
            backgroundColor: theme_g2,
            hoverborderColor: theme_g2,
            hoverBackgroundColor: theme_g2
          }
        ]
      };
    };
    return (
      <Line
        data={data}
        height={300}
        options={{
          maintainAspectRatio: false
        }}
      />
    );
  }
}
export default LineBasicChart;
