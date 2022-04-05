import React from 'react'
import {useLocation} from 'react-router-dom'
import starImg from "../../image/star.png"
import eyeImg from "../../image/eye.png"
import './index.css'

export default function Repo() {
  //取得隨轉換路由一起傳過來的數據
  const {state:{repoData}} = useLocation()

  return (
    <div>
      <div className="container singleRepoPage">
        <div className="row">
          <div className="col-12">
            <div className="userInfo">
              <div className="content">
                <div className="imgAndName">
                  <div className="imgbox">
                      <div className="image_inner">
                          <div className="img" style={{backgroundImage:`url(${repoData.owner.avatar_url})`}}></div>
                      </div>
                  </div>
                  <div className="username">
                    <h3 className="name">{repoData.owner.login}</h3>
                  </div>
                </div>
                  <div className="count">
                    <div className='star'>
                      <div className="star_img" style={{backgroundImage: `url(${starImg})`}}></div>
                      <p className="star_count">{repoData.stargazers_count}</p>
                    </div>
                    <div className='watcher'>
                      <div className="watcher_img" style={{backgroundImage: `url(${eyeImg})`}}></div>
                      <p className="watcher_count">{repoData.watchers_count}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-9">
            <div className="repo_content">
                <div className="repoLink">
                  <h3>
                    <a href={`${repoData.html_url}`} target="_blank" rel="noreferrer"><span className='repoName'>{repoData.full_name}</span><span className='linkText'>link to github</span></a>
                  </h3>
                </div>
              <p>description : </p>
              <p>{repoData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
