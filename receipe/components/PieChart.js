import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { NEXT_APP_BASE_URL } from './Env';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ item }) => {

  const [result,setResult]=useState([]);
  const [result1,setResult1]=useState([]);

  useEffect(() => {

    axios.post(`${NEXT_APP_BASE_URL}/chart`,{recipeId:item._id}).then(res=>{
      
      res.data.length>0 ? res?.data?.forEach((data)=>{
        
        console.log(data.rating);
        console.log(data.count);
       setResult([...result,data?.rating]);
       setResult1([...result1,data?.count]);
      }):null
    })
  }, [])
 


  const series= result1.length>0 ?result1:[1];

  console.log(result1);

  const options = {
    chart: {
      type: 'pie',
    },
    series: series, // Set the series data here
    labels:result.length >0 ? result : ['No Data'], //
    responsive: [
      {
        breakpoint: 768, // Adjust as needed for smaller devices
        options: {
          chart: {
            width: '50%', // Adjust width for smaller screens
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 425, // Adjust as needed for smaller devices
        options: {
          chart: {
            width: '90%', // Adjust width for smaller screens
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 1200, // Adjust as needed for larger devices
        options: {
          chart: {
            width: '50%', // Adjust width for larger screens
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 1700, // Adjust as needed for larger devices
        options: {
          chart: {
            width: '60%', // Adjust width for larger screens
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', height: '270px', marginBottom: "65px" }}>
      <ReactApexChart options={options} series={options.series} type="pie" height={650} />
    </div>
  );
};

export default PieChart;
