import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Octokit, App } from 'octokit'
import './index.css'
import cat from '../../image/crying_cat.gif'
import loading from "../../image/loading.gif"

export default function Users() {
    const {state:{users,inputName}} = useLocation()
    const [haveUser, setHaveUser] = useState(true)
    const [moreUsers, setMoreUsers] = useState([])
    const [page, setPage] = useState(2)
    const [request, setRequest] = useState(true)
    const [end, setEnd] = useState(false)
    const [isRender, setIsRender] = useState(true)
    const octokit = new Octokit({
        auth: "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"
    })
    const navigate = useNavigate()

    useEffect(()=>{
    })

    async function showUserRepos(user){
        const response = await octokit.request('GET /users/{username}/repos', {
            username: user.login,
            per_page: 10,
            page:1
        })
        navigate(`${user.login}/repos`,{
            state:{
                userRepos: response.data,
                user_url: user.avatar_url
            }
        })
    }

    async function addUsers(){
        const response = await  octokit.request('GET /search/users?', {
            q:inputName,
            per_page: 30,
            page:page
        })
        const data = response.data.items
        setMoreUsers(moreUsers=>[...moreUsers,...data])
        // console.log(moreRepos);
        setPage(page+1)
        return data.length
    }

    useEffect(()=>{
        setIsRender(true)
        if(users.length == 0){
            setHaveUser(false)
            setRequest(false)
            setEnd(true)
        }else if(users.length<30){
            setRequest(false)
            setEnd(true)
            setHaveUser(true)
        }else{
            setHaveUser(true)
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
              addUsers().then(length=>{
                if(isRender){
                //   console.log('add then')
                  if(length==30){
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
        <div className='container users'>
            <div className='row justify-content-center gx-1'>
                <div className='col-9'>
                    <div className="row  gy-3 justify-content-center gx-1">
                        { haveUser ?
                            users.map((userObj)=>{
                                return(
                                    <div key={userObj.id} className="col-3">
                                        <div className="user_card" onClick={()=>showUserRepos(userObj)}>
                                            <div className="content">
                                                <div className="imgbox">
                                                    <div className="image_inner">
                                                        <div className="img" style={{backgroundImage: `url(${userObj.avatar_url})`}}></div>
                                                    </div>
                                                </div>
                                                <h6 className="username">{userObj.login}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : 
                            <div className='col-3 noUser'>
                                <div className="imgbox">
                                    <div className="image_inner">
                                        <div className="img" style={{backgroundImage: `url(${cat})`}}></div>
                                    </div>
                                </div>
                                <h4>find no user</h4>
                            </div>
                        }
                        {
                            moreUsers.map((userObj)=>{
                                return(
                                    <div key={userObj.id} className="col-3">
                                        <div className="user_card" onClick={()=>showUserRepos(userObj)}>
                                            <div className="content">
                                                <div className="imgbox">
                                                    <div className="image_inner">
                                                        <div className="img" style={{backgroundImage: `url(${userObj.avatar_url})`}}></div>
                                                    </div>
                                                </div>
                                                <h6 className="username">{userObj.login}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-9 to_bottom">
                    {end ? <h4 className='nomore'>no more users</h4> : <h4 className='requestmore' style={{backgroundImage: `url(${loading})`}}></h4>}
                </div>
            </div>
        </div>
    )
}
