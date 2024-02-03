import React from 'react'

export default function Alerts(props) {
  
  return (
    <div style={{height:"50px"}}>
      {props.message1 && <div>
        <div className={`alert alert-${props.message1.msgType} alert-dismissible fade show`} role="alert">
            <strong> {props.message1.msgType==="danger"?"error":props.message1.msgType}</strong>: {props.message1.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>}
    </div>
    
  )
}

