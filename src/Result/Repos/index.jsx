import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { Octokit, App } from 'octokit'

export default function Repos() {
  const {state:{userRepos}} = useLocation()
  const [moreRepos, setMoreRepos] = useState([])
  const {username} = useParams()
  const octokit = new Octokit()
  const navigate = useNavigate()
  const [page, setPage] = useState(2)
  const [request, setRequest] = useState(true)
  const [end, setEnd] = useState(false)

  async function showRepo(repoName){
    console.log('showRepo');
    const response = await  octokit.request('GET /repos/{owner}/{repo}', {
      owner:username,
      repo:repoName
    })
    navigate(`${repoName}`,{
        state:{
            repoData: response
        }
    })
  }
  useEffect(()=>{
    const body = document.body
    let leftDistance
    // console.log('window.innerHeight', window.innerHeight)

    if(userRepos.length<10){
      setRequest(false)
      setEnd(true)
    }

    async function addRepos(){
        const response = await octokit.request('GET /users/{username}/repos', {
            username: username,
            per_page: 10,
            page:page
        })
        const data = response.data
        setMoreRepos(moreRepos=>[...moreRepos,...data])
        console.log(moreRepos);
        setPage(page+1)
        return data.length
    }

    window.onscroll=()=>{
      leftDistance = body.scrollHeight - window.scrollY
      // console.log('leftDistance', leftDistance)
      // console.log('window.scrollY', window.scrollY)

      if (leftDistance <= window.innerHeight){
        console.log('bottom!')
        if(request==true){
          setRequest(false)
          addRepos().then(length=>{
            console.log('add then')
            if(length==10){
              console.log('back to true')
              setTimeout(()=>{setRequest(true)}, 1000)
            }else{
              setEnd(true)
            }
          })
        }
      }
    }
  })

  

  return (
    <div>
      <h3>{username}</h3>
      {
        userRepos.map((userReposObj)=>{
          return (
            <div key={userReposObj.id} className='repoCard' onClick={()=>showRepo(userReposObj.name)}>
              <h4>name:{userReposObj.name}</h4>
              <h5>full_name:{userReposObj.full_name}</h5>
              <h4>star:{userReposObj.stargazers_count}</h4>
              <hr/>
            </div>
          )
        })
      }
      {
        moreRepos.map((userReposObj)=>{
          return (
            <div key={userReposObj.id} className='repoCard' onClick={()=>showRepo(userReposObj.name)}>
              <h4>name:{userReposObj.name}</h4>
              <h5>full_name:{userReposObj.full_name}</h5>
              <h4>star:{userReposObj.stargazers_count}</h4>
              <hr/>
            </div>
          )
        })
      }
      {end ? <div>已經沒了~~~</div> : <div>下滑查看更多</div>}
    </div>
  )
}


