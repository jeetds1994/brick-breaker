import React from 'react'

const SettingButton = ({triggerSettings}) => {
  return(
    <div>
      <div id="settings" onClick={triggerSettings}></div>
    </div>
  )
}

export default SettingButton
