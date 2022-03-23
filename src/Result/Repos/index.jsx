import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { Octokit, App } from 'octokit'
import './index.css'
import starImg from "../../image/star.png"
import eyeImg from "../../image/eye.png"
import loading from "../../image/loading.gif"

export default function Repos() {
  const {state:{userRepos, user_url}} = useLocation()
  const {username} = useParams()
  const [haveRepos, setHaveRepos] = useState(true)
  const [moreRepos, setMoreRepos] = useState([])
  const [page, setPage] = useState(2)
  const [request, setRequest] = useState(true)
  const [end, setEnd] = useState(false)
  const [isRender, setIsRender] = useState(true)
  const octokit = new Octokit({
    auth: "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"
  })
  const navigate = useNavigate()

  async function showRepo(repoName){
    // console.log('showRepo');
    const response = await  octokit.request('GET /repos/{owner}/{repo}', {
      owner:username,
      repo:repoName
    })
    navigate(`${repoName}`,{
        state:{
            repoData: response.data
        }
    })
  }

  async function addRepos(){
      const response = await octokit.request('GET /users/{username}/repos', {
          username: username,
          per_page: 10,
          page:page
      })
      const data = response.data
      setMoreRepos(moreRepos=>[...moreRepos,...data])
      // console.log(moreRepos);
      setPage(page+1)
      return data.length
  }

  useEffect(()=>{
    setIsRender(true)
    if(userRepos == []){
      setHaveRepos(false)
      setRequest(false)
      setEnd(true)
    }else if(userRepos.length<10){
      setRequest(false)
      setEnd(true)
    }

    const body = document.body
    let leftDistance
    // console.log('window.innerHeight', window.innerHeight)
    window.onscroll=()=>{
      leftDistance = body.scrollHeight - window.scrollY
      // console.log('leftDistance', leftDistance)
      // console.log('window.scrollY', window.scrollY)

      if (leftDistance <= window.innerHeight){
        // console.log('bottom!')
        if(request==true){
          setRequest(false)
          addRepos().then(length=>{
            if(isRender){
              // console.log('add then')
              if(length==10){
                // console.log('back to true')
                setTimeout(()=>{setRequest(true)}, 500)
              }else{
                setEnd(true)
              }
            }else{
              return null
            }
          })
        }
      }
    }

    return function cleanup(){
      setIsRender(false)
    }
  })

  return (
    <div>
      <div className="container repos">
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="userInfo">
              <div className="content">
                    <div className="imgbox">
                        <div className="image_inner">
                            <div className="img" style={{backgroundImage:`url(${user_url})`}}></div>
                        </div>
                    </div>
                    <div className="username">
                      <h3 className="name">{username}</h3>
                    </div>
                </div>
            </div>
          </div>
            { haveRepos ? 
              userRepos.map((userReposObj)=>{
                return (
                  <div key={userReposObj.id} className='repoCard col-9' onClick={()=>showRepo(userReposObj.name)}>
                      <div className="repo">
                        <div className="content">
                          <h4 className="full_name">{userReposObj.full_name}</h4>
                            <div className="count">
                              <div className='star'>
                                <div className="star_img" style={{backgroundImage: `url(${starImg})`}}></div>
                                <p className="star_count">{userReposObj.stargazers_count}</p>
                              </div>
                              <div className='watcher'>
                                <div className="watcher_img" style={{backgroundImage: `url(${eyeImg})`}}></div>
                                <p className="watcher_count">{userReposObj.watchers_count}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                )
              })  : <div>沒有</div>
            }
            {
              moreRepos.map((userReposObj)=>{
                return (
                  <div key={userReposObj.id} className='repoCard col-9' onClick={()=>showRepo(userReposObj.name)}>
                    <div className="repos">
                      <div className="repo">
                        <div className="content">
                          <h4 className="full_name">{userReposObj.full_name}</h4>
                            <div className="count">
                              <div className='star'>
                                <div className="star_img" style={{backgroundImage: `url(${starImg})`}}></div>
                                <p className="star_count">{userReposObj.stargazers_count}</p>
                              </div>
                              <div className='watcher'>
                                <div className="watcher_img" style={{backgroundImage: `url(${eyeImg})`}}></div>
                                <p className="watcher_count">{userReposObj.watchers_count}</p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
        </div>
        <div className="row justify-content-center">
          <div className="col-9 to_bottom">
            {end ? <h4 className='nomore'>no more repository</h4> : <h4 className='requestmore' style={{backgroundImage: `url(${loading})`}}></h4>}
          </div>
        </div>
      </div>
    </div>
  )
}


