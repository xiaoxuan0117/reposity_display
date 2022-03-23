import React from 'react'
import {useLocation, useParams} from 'react-router-dom'
import { Octokit, App } from 'octokit'
import starImg from "../../image/star.png"
import eyeImg from "../../image/eye.png"
import './index.css'

export default function Repo() {
  const {state:{repoData}} = useLocation()
  const {repo} = useParams()
  // console.log(repoData)

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
          <div className="col-9">
            <div className="contect">
                {/* <div className="repoLink">
                  <a href={`${repoData.html_url}`} target="_blank">
                  <h4>{repo}</h4>
                  <span className='linkText'>link to github page</span></a>
                </div> */}
                <div className="repoLink">
                  <h3>
                    <a href={`${repoData.html_url}`} target="_blank">{repo}<span className='linkText'>link to github</span></a>
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
