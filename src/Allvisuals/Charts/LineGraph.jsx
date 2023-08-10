import { Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,} from 'chart.js';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Line } from 'react-chartjs-2';

 ChartJs.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

 const options = {
  plugins: {
      Legend: true,
  },
  scales: {
      y: {
        min: 0,
        max: 8,
      },
  },
};

const LineGraph = ({selectedRegion}) => {
  const [storedDataPlotting, setStoredDataPlotting] = useState();
  var url = "http://localhost:8080/api/v1/main/getLD";
  if(selectedRegion !== ""){
    url = "http://localhost:8080/api/v1/main/getLD/" + selectedRegion;
    console.log(selectedRegion);
  }
    async function fetchfunction() {
        try {
          const response = await axios.get(url);
          const dataGathered = response.data;
          const likelihood = dataGathered[0];
          const relevance = dataGathered[1];
          console.log(likelihood);
          console.log(relevance);
          setStoredDataPlotting({
            labels: likelihood,
            datasets: [
              {
                label: "Likelihood",
                data: likelihood,
                backgroundColor: "rgba(255,50,50)",
                borderColor: 'red',
                pointBorderColors:"rgba(50,50,255)",
                pointRadius: 1,
                tension: 0.2
              },
              {
                label: "Relevance",
                data: relevance,
                backgroundColor: "rgba(50,255,50)",
                borderColor: 'green',
                pointBorderColors:"rgba(50,50,255)",
                pointRadius: 1,
                tension: 0.2
              },
            ],
          });
          
        } catch (error) {
          console.log("cant plot the data");
        }
      }
      useEffect(() => {
        fetchfunction();
      }, [url,selectedRegion]);

    return (storedDataPlotting ?<div>  <Line data={storedDataPlotting} options={options}/></div>:"")
};

export default LineGraph;
