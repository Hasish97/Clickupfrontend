import * as React from 'react';
import { ChartData, Line } from 'react-chartjs-2';
import * as chartjs from 'chart.js';
class LineFillEndChart extends React.Component<{}, {}> {
  render() {
    const data: ChartData<chartjs.ChartData> = (canvas) => {
      let bar = (canvas as HTMLCanvasElement).getContext('2d');
      let theme_g2 = bar.createLinearGradient(0, 0, 500, 0);
      theme_g2.addColorStop(0, "#0e9e4a");
      theme_g2.addColorStop(1, "#0e9e4a");
      return {
        labels: [0, 1, 2, 3, 4, 5, 6],
        datasets: [
          {
            label: "D1",
            data: [85, 55, 70, 50, 75, 45, 60],
            borderWidth: 1,
            borderColor: theme_g2,
            backgroundColor: theme_g2,
            hoverborderColor: theme_g2,
            hoverBackgroundColor: theme_g2,
            fill: "end"
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
export default LineFillEndChart;
