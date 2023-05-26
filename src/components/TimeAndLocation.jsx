import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

function TimeAndLocation({weather:{ts,timezone,city_name,country_code}}) {
  return <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                {formatToLocalTime(ts,timezone)}
            </p>
        </div>

        <div className='flex items-center justify-center my-3
        '>
            <p className='text-white text-3xl font-medium'>
                {`${city_name},${country_code}`}
            </p>

        </div>
  </div>
}

export default TimeAndLocation