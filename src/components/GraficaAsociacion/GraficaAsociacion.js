import React from 'react'
import {
  Chart as ChartJS
} from 'chart.js/auto';
import {Bar} from 'react-chartjs-2'

export const GraficaAsociacion = ({x,y}) => {

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Frecuencia de los elementos ingresados",
            },
        },
    };
    const data = {
        labels: y,
        datasets: [
            {
                label: "Transacciones",
                data: x,
                borderWidth: 1,
            },
        ],
    };
  return (
    <div class="chart-container">
        <Bar
            data={data}
            options={options}
        />
    </div>
  )
}