import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = () => {
  const [label, setLabel] = useState(['chicken', 'tomato', 'salt', 'ginger']); // Provide labels
  const [series, setSeries] = useState([12, 34, 56, 65]); // Corrected to numbers

  
  const options = label.length > 0 && series.length > 0 ? {
    series: [{
      data: series
    }],
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function(chart, w, e) {
          // console.log(chart, w, e)
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: label, // Use the labels for x-axis categories
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    }
  } : null; // Set options to null if label and series are empty

  return (
    <div style={{ width: '400px', height: '350px'}}>
      {options && <ReactApexChart options={options} series={options.series} type="bar" height={350} />}
    </div>
  );
};

export default BarChart;
