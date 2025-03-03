import React, { useEffect, useState } from "react";
import { Box } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis } from 'recharts';
import axios from "axios"

// import { Tooltip, Legend,  } from "recharts";


const Chart = () => {

     const [data, setData] = useState([]);


     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.get("/api/iot/analyse/analyser.php");
                    console.log(response.data);
                    setData(response.data)
               } catch (error) {
                    console.error(error);
               }
          }
          fetchData()
     }, [])

     return (
          <Box>
               <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="etat" />
                    <YAxis dataKey="" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="VIBRATION" fill="#8884d8" />
               </BarChart>
          </Box>
     );
};

export default Chart;