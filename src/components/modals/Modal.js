import React, { useState } from 'react'
import "./modals.css";

export default function Modal(props) {

  return (
    <div className="modal-overlay">
        <div className="modal-container" >
        <h1 className="centered">{ props.header }</h1>
        <button onClick={ () => props.closeModal(false)} className="btn-close"></button>
        {props.children}
        </div></div>
  )
}
