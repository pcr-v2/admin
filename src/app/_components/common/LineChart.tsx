"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
);

export default function LineChart() {
  const data: ChartData<"line", { x: string; y: number }[], string> = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // Day 1 ~ Day 30
    datasets: [
      {
        type: "line",
        label: "Line Dataset",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: Array.from({ length: 30 }, (_, i) => ({
          x: `Day ${i + 1}`,
          y: Math.round(Math.random() * 100), // 0 ~ 100 사이 랜덤 값
        })),
      },
      //   {
      //     type: "line",
      //     label: "Bar Dataset 1",
      //     backgroundColor: "rgb(255, 99, 132)",
      //     data: Array.from({ length: 30 }, (_, i) => ({
      //       x: `Day ${i + 1}`,
      //       y: Math.round(Math.random() * 100), // 0 ~ 100 사이 랜덤 값
      //     })),
      //     borderColor: "rgb(255, 99, 132)",
      //     borderWidth: 1,
      //   },
      //   {
      //     type: "line",
      //     label: "Bar Dataset 2",
      //     backgroundColor: "rgb(75, 192, 192)",
      //     data: Array.from({ length: 30 }, (_, i) => ({
      //       x: `Day ${i + 1}`,
      //       y: Math.round(Math.random() * 100), // 0 ~ 100 사이 랜덤 값
      //     })),
      //   },
    ],
    // datasets: [
    //   {
    //     type: "line",
    //     label: "Line Dataset",
    //     borderColor: "rgb(54, 162, 235)",
    //     borderWidth: 2,
    // data: Array.from({ length: 30 }, (_, i) => ({
    //   x: `Day ${i + 1}`,
    //   y: Math.round(Math.random() * 100), // 0 ~ 100 사이 랜덤 값
    // })),
    //   },
    // ],
  };
  return (
    <Line
      style={{
        width: "100%",
        maxWidth: "900px",
      }}
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "white",
            bodyColor: "#424242",
            titleColor: "#424242",
            displayColors: false,
            borderColor: "#E0E0E0",
            borderWidth: 1,
            padding: 10,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 11,
            },
          },
          y: {
            beginAtZero: true,
            border: {
              dash: [2, 4],
            },
            ticks: {
              count: 6,
            },
          },
        },
      }}
    />
  );
}
