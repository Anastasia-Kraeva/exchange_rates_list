import React from 'react';
import axios from 'axios';

import Tooltip from './Tooltip';

const getRates = async () => {
  const response = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
  return Object.values(response.data.Valute)
}

const ExchangeRates = () => {
  const [rates, setRates] = React.useState()
  const [tooltipText, setTooltipText] = React.useState()
  const [tooltipCoords, setTooltipCoords] = React.useState()
  const [lastEl, setLastEl] = React.useState()

  React.useEffect(() => {
    getRates().then(rates => {
      if (rates) setRates(rates)
    })
  }, [])

  return (
    <ul
      onMouseOver={(e) => {
        if (e.target.tagName === 'UL') return null

        const currentEl = e.target

        currentEl.style.backgroundColor = 'rgb(221 217 233)'
        setTooltipText(currentEl.getAttribute('data-tooltip'))
        setTooltipCoords([e.pageX, e.pageY])
        setLastEl(currentEl)
      }}
      onMouseMove={(e) => {
        setTooltipCoords([e.pageX, e.pageY])
      }}
      onMouseOut={() => {
        lastEl.style.backgroundColor = '#fff'
        setTooltipText(null)
      }}
    >
      {
        rates?.map(({CharCode, Name}, i) => {
          return (
            <li
              key={i}
              className="ratesListEl"
              id={`li-${i}`}
              data-tooltip={Name}
            >
              {CharCode}
            </li>
          )
        })
      }
      {tooltipText && <Tooltip text={tooltipText} coords={tooltipCoords}/>}
    </ul>
  )
}

export default ExchangeRates;
