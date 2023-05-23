import React, {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom"

import Index from '../pages/Index'
import Show from '../pages/Show'

const Main = (props) => {
    const [ weather, setWeather] = useState(null)

    // const URL = "http://localhost:4000/weather/";
    const URL ="https://weather-backend-hhcy.onrender.com/weather/";
    const getWeather = async () => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        setWeather(data)
    }

    const createWeather = async (indvweather) => {
        if (!props.user) return;
        const token = await props.user.getIdToken();
        await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(indvweather),
        });
      };
      
    const updateWeather = async (indvweather, id) => {
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(indvweather),
        });
        getWeather();
    }
    const deleteWeather = async id => {
        await fetch(URL + id, {
            method: "DELETE",
        })
        getWeather();
    }
    useEffect(() => {
        if (props.user) {
          getWeather();
        } else {
          setWeather(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.user]);
      

return (
    <main>
        <Routes>
            <Route path="/" element={<Index weather={weather} createWeather={createWeather}/>} />
            <Route
                path="/weather/:id"
                element = {
                    <Show
                    weather={weather}
                    updateWeather={updateWeather}
                    deleteWeather={deleteWeather}
                    />
                }
            />
        </Routes>
    </main>
)
}
export default Main;