import React from 'react';
import axios from 'axios';

import Tooltip from './Tooltip';

const getDateURL = (i, date) => {
  let url = 'https://www.cbr-xml-daily.ru'

  if (i) {
    const methods = ['getFullYear', 'getMonth', 'getDate']
    url += '/archive/'

    url += methods
      .map(method => {
        const value = date[method]()
        return value < 10 ? '0' + value : value
      })
      .join('/')
  }

  return url + '/daily_json.js'
}

const getStatistics = async (days) => {
  const date = new Date()
  const responses = []

  for (let i = 0; i < days; i++) {
    const previousDate = new Date(date);

    previousDate.setDate(date.getDate() - i);
    responses.push(getRates(getDateURL(i, previousDate)))
  }

  return Promise.all(responses)
}

const getRates = async (url) => {
  try {
    /*
      Почему когда axios отправляет запрос данных (которых нет), выдается ошибка отсутствия заголовка?
      Вместо этой ошибки я ожидала получить ошибку с кодом 404 или объект-заглушку.
      Как действовать в такой ситуации?

      текст ошибки:
      Access to XMLHttpRequest at 'https://www.cbr-xml-daily.ru/archive/2022/02/24/daily_json.js' from
      origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on
      the requested resource.

      ответ который получаю отправляя запрос вручную:
      // 20220328071436 // https://www.cbr-xml-daily.ru/archive/2022/02/24/daily_json.js

      {
      "error": "Not found",
      "code": 404,
      "explanation": "Курс ЦБ РФ на данную дату не установлен. Проверить: https://www.cbr.ru/currency_base/daily/"
      }
    */
    const response = await axios.get(url)
    return Object.values(response.data.Valute)
  } catch (e) {
    if (e.isAxiosError) {
      return e.response
    } else {
      throw e
    }
  }
}

const ExchangeRates = () => {
  const [rates, setRates] = React.useState()
  const [tooltipText, setTooltipText] = React.useState()
  const [tooltipCoords, setTooltipCoords] = React.useState()
  const [lastEl, setLastEl] = React.useState()

  React.useEffect(() => {
    getStatistics(10).then(rates => {
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
        rates && rates[0]?.map(({CharCode, Name}, i) => {
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
