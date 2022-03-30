import React from 'react'
import cat from '../../image/crying_cat.gif'

export default function FindNoUser() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className='col-3 noUser'>
            <div className="imgbox">
                <div className="image_inner">
                    <div className="img" style={{backgroundImage: `url(${cat})`}}></div>
                </div>
            </div>
            <h4>find no user</h4>
        </div>
      </div>
    </div>
  )
}
