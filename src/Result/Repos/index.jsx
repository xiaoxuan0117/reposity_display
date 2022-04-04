import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { Octokit } from 'octokit'
import './index.css'
import starImg from "../../image/star.png"
import eyeImg from "../../image/eye.png"
import loading from "../../image/loading.gif"

export default function Repos() {
  //取得隨轉換路由一起傳過來的數據
  const {state:{userRepos, user_url}} = useLocation()
  //取得隨轉換路由一起傳過來的數據
  const {username} = useParams()
  //儲存因為滾動到底部所以新增的倉庫資料
  const [moreRepos, setMoreRepos] = useState([])
  //儲存請求api的頁面數，因為在users的地方已經請求page1，所以這裡從2開始
  const [page, setPage] = useState(2)
  //設定是否可以發送請求
  const [request, setRequest] = useState(true)
  //判斷是否請求api還有結果
  const [end, setEnd] = useState(false)
  //判斷是否有render
  const [isRender, setIsRender] = useState(true)
  //判斷是否是初次進入頁面(要讓頁面滾到最頂端)
  const [isFirst, setIsFirst] = useState(true)
  const navigate = useNavigate()

  //點選倉庫之後請求api取得特定倉庫的資料
  async function showRepo(repoName){
    const octokit = new Octokit()
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
      owner:username,
      repo:repoName
    })
    //請求後切換路由到倉庫的頁面，並傳送資料
    navigate(`${repoName}`,{
        state:{
            repoData: response.data
        }
    })
  }

  useEffect(()=>{
    //當頁面滾動到底部的時候就再次請求api，把更多倉庫顯示出來
    async function addRepos(){
      const octokit = new Octokit()
      try{
        const response = await octokit.request('GET /users/{username}/repos', {
            username: username,
            per_page: 10,
            page:page
        })
        //用戶資料在結果的data裡面
        const data = response.data
        //把結果放到moreRepos裡面，讓return的地方去更新
        setMoreRepos(moreRepos=>[...moreRepos,...data])
        //page加1，下次請求api就會取得再下一組的用戶資料
        setPage(page+1)
        //回傳這次請求的結果長度(主要用在後面去判斷說這次請求的數量)
        return data.length
      }catch(e){
        alert("HttpError: API rate limit exceeded.")
        return 0
      }
    }
    
    //表示有render成功
    setIsRender(true)
    //如果是第一次進入頁面就移動到最上面
    if(isFirst === true){
      window.scrollTo(0, 0)
      console.log('here');
      setIsFirst(false)
    }
    //判斷從search傳來的用戶資料內容
    //如果資料小於10個
    if(userRepos.length<10){
      //設定request為false，代表不能請求api
      setRequest(false)
      //設定end為true，代表請求api的話不會再有更多資料
      setEnd(true)
    }

    const body = document.body
    //設定一個變數儲存滾動狀態
    let leftDistance
    //當視窗滾動的時候就執行
    window.onscroll=()=>{
      leftDistance = body.scrollHeight - window.scrollY
      //如果剩下可以滾動的距離跟視窗高度一樣，代表到達底部
      if (leftDistance <= window.innerHeight){
        //如果request為真的話就可以請求api
        if(request === true){
          //先設定request為false，避免重複請求
          setRequest(false)
          //執行請求api的函數
          addRepos().then(length=>{
            //如果有render成功再執行
            if(isRender){
              if(length === 10){
                //如果回傳的結果數量剛好是10判斷再次請求的話還有資料，所以過0.5秒之後把request設定成true
                setTimeout(()=>{setRequest(true)}, 500)
              }else{
                //如果結果數量小於10的話代表再次請求不會有更多結果，則讓request維持false，且end設定為true
                setEnd(true)
              }
            }else{
              return null
            }
          })
        }
      }
    }

    //在離開的時候把isRender設定為false，讓addUser()不會再更改state內容
    return function cleanup(){
      setIsRender(false)
    }
  },[userRepos, request, isRender, isFirst, page, username])

  return (
    <div>
      <div className="container repos">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
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
            {
              userRepos.map((userReposObj)=>{
                return (
                  <div key={userReposObj.id} className='repoCard col-12 col-lg-9' onClick={()=>showRepo(userReposObj.name)}>
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
              })
            }
            {
              moreRepos.map((userReposObj)=>{
                return (
                  <div key={userReposObj.id} className='repoCard col-12 col-lg-9' onClick={()=>showRepo(userReposObj.name)}>
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
            {end ? <h4 className='nomore'>no more repository</h4> : <div className='requestmore' style={{backgroundImage: `url(${loading})`}}/>}
          </div>
        </div>
      </div>
    </div>
  )
}


