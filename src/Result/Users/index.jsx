import React, {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Octokit, App } from 'octokit'

export default function Users() {
    const {state:{users}} = useLocation()
    const octokit = new Octokit()
    const navigate = useNavigate()


    async function showUserRepos(user){
        console.log('show user repos', user);
        const response = await octokit.request('GET /users/{username}/repos', {
            username: user,
            per_page: 10,
            page:1
        })
        navigate(`${user}/repos`,{
            state:{
                userRepos: response.data
            }
        })
    }
    
    return (
        <div className='users'>
            show users
            {
                users.map((userObj)=>{
                    return(
                        <button key={userObj.id} onClick={()=>showUserRepos(userObj.login)}>{userObj.login}</button>
                    )
                })
            }
        </div>
    )
}
