import React from 'react'
import dcard from './image/Dcard.png'
import './App.css'

export default function Start() {
  return (
    <div className="start">
      <h3>Please enter username in search bar</h3>
      <div className="title">
        <div className="imgbox">
            <div className="image_inner">
                <div className="img" style={{backgroundImage: `url(${dcard})`}}></div>
            </div>
        </div>
        <h5>Dcard Frontend Intern Homework</h5>
      </div>
    </div>
  )
}
