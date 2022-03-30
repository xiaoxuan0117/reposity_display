import React from 'react'
import github from './image/github-sign.png'
import './App.css'

export default function Start() {
  return (
    <div className="start">
      <h3>Please enter username in search bar</h3>
      <div className="title">
        <div className="imgbox">
            <div className="image_inner">
                <div className="img" style={{backgroundImage: `url(${github})`}}></div>
            </div>
        </div>
        <h5>This is a webpage that can display users reposities from github</h5>
      </div>
    </div>
  )
}
