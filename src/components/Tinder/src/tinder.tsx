import { useState } from 'react'
import './App.css'
// import Switch from 'react-ios-switch'

import Simple from './examples/Simple'

const Tinder = () => {
  //const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <div className='app'>
      {/* {showAdvanced ? <Advanced /> : <Simple />} */}
      <Simple />
      {/* <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div> */}
    </div>
  )
}

export default Tinder
