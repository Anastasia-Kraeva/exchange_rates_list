import React from 'react';

const Statistics = ({content, coords, setStatisticsContent}) => {
  const newDate = new Date()

  content = content.map((Value, i) => {
    const date = new Date(newDate)
    date.setDate(newDate.getDate() - i);

    return <div>{date.getDate()}.{date.getMonth() + 1} : {Value} ₽</div>
  })

  return (
    <div
      className="popOver statistics"
      style={{
        left: coords[0] - 20,
        top: coords[1] + 20,
      }}
    >
      <button
        className="closeButton"
        onClick={() => {
          setStatisticsContent(null)
        }}>
        <svg viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>

      <p style={{margin: '8px 0'}}>Цены за 10 дней:</p>
      {content}
    </div>
  )
}

export default Statistics
