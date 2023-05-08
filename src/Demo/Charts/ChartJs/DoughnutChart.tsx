import * as React from 'react';
import { ChartData, Doughnut } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
class DoughnutChart extends React.Component<{}, {}> {
  render() {
    const data :ChartData<chartjs.ChartData> = (canvas) => {
      let bar = (canvas as HTMLCanvasElement).getContext('2d');
      let theme_g1 = bar.createLinearGradient(100, 0, 300, 0);
      theme_g1.addColorStop(0, "#7ad835");
      theme_g1.addColorStop(1, "#7ad835");
      let theme_g2 = bar.createLinearGradient(100, 0, 300, 0);
      theme_g2.addColorStop(0, "#fa7d03");
      theme_g2.addColorStop(1, "#fa7d03");
      return {
        labels: ["Data 1", "Data 2", "Data 3"],
        datasets: [
          {
            data: [30, 30, 40],
            backgroundColor: [theme_g1, theme_g2, "#ff5252"],
            hoverBackgroundColor: [theme_g1, theme_g2, "#ff5252"]
          }
        ]
      };
    };
    return (
      <Doughnut
        data={data}
        height={300}
        options={{
          maintainAspectRatio: false
        }}
      />
    );
  }
}
export default DoughnutChart;
