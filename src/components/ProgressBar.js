import React from 'react'

const Progress = ({ done }) => {
  const [style, setStyle] = React.useState({})
  const percentage = (done / 195) * 100

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${percentage}%`,
    }

    setStyle(newStyle)
  }, 200)

  return (
    <>
      <h3 className="countries-visisted">Countries Visisted: {done} /195</h3>
      <div className="progress">
        <div className="progress-done" style={style}></div>
      </div>
    </>
  )
}

const ProrgressBar = ({ number }) => (
  <>
    <Progress done={number} />
  </>
)

export default ProrgressBar
