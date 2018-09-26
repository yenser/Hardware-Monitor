import React from 'react';
import { Line } from 'react-chartjs-2';

class LineGraph extends React.Component {

    
    render() {

        const color = 'rgba(66, 134, 244)';
        const colorOpac = 'rgba(66, 134, 244,0.3)';
        
        const data = {
            labels: Array(60).fill(""),
            datasets: [{
                label: "Ram Usage",
                data: this.props.data,
                lineTension: 0,
                fill: true,
                borderColor: color,
                backgroundColor: colorOpac
            }]
        }

        const options = {
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: this.props.maxMem,
                        stepSize: 1,
                        callback: function(value, index, values) {
                            return value + "Gb";
                        }
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }

        return (
            <div>
                    <Line
                        data={data}
                        options={options}
                        redraw
                     />
                </div>
        );
    }
}

export default LineGraph;