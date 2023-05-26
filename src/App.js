import './App.css';
import TopButtons from './components/TopButtons';
import Inputting from './components/inputing';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [query, setQuery]=useState({city:'berlin'})
    const [units,setUnits]=useState('metric')
    const [weather,setWeather]=useState(null);

    useEffect(()=>{


      const fetchWeather= async()=>{

        const message=query.city ? query.city:'current location.'
        toast.info('Fetching weather for '+message)

        await getFormattedWeatherData({...query,units}).then
        ((data)=>{

          toast.success(`Successfully fetched weather for ${data.city_name},${data.country_code}`)

          setWeather(data);
        });
    };

    fetchWeather();

    },[query,units]);


    const formatBackground=()=>{
      if(!weather) return  'from-cyan-700 to-blue-700'
      const threshold = units === 'metric' ? 20:60
      if(weather.temp <threshold) return ' from-cyan-700 to-blue-700'
      return 'from-yellow-700 to-orange-700'
    }



  return (
   <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
    <TopButtons setQuery={setQuery}/>
    <Inputting setQuery={setQuery} units={units} setUnits={setUnits} />

    
    {/* load only when we have location */}
    {weather && (
      <div>
      <TimeAndLocation weather={weather} />
      <TemperatureAndDetails weather={weather}/>

      <Forecast title="Hourly ForeCast" items={weather.hourly}/>
      <Forecast title="Daily ForeCast" items={weather.daily}/>
      </div>
    )}

    <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>



   </div>

    

    
  );
}

export default App;
