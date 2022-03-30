import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Octokit } from 'octokit'
import './index.css'
import loading from "../../image/loading.gif"

export default function Users() {
    //取得隨轉換路由一起傳過來的數據
    const {state:{users,inputName}} = useLocation()
    //儲存因為滾動到底部所以新增的用戶資料
    const [moreUsers, setMoreUsers] = useState([])
    //儲存請求api的頁面數，因為在search的地方已經請求page1，所以這裡從2開始
    const [page, setPage] = useState(2)
    //設定是否可以發送請求
    const [request, setRequest] = useState(true)
    //判斷是否請求api還有結果
    const [end, setEnd] = useState(false)
    //判斷是否有render
    const [isRender, setIsRender] = useState(true)
    const navigate = useNavigate()
    
    //點選用戶之後請求api取得用戶的倉庫資料
    async function showUserRepos(user){
        const octokit = new Octokit()
        const response = await octokit.request('GET /users/{username}/repos', {
            username: user.login,
            per_page: 10,
            page:1
        })
        //請求後切換路由到倉庫列表的頁面，並傳送資料
        navigate(`${user.login}/repos`,{
            state:{
                userRepos: response.data,
                user_url: user.avatar_url
            }
        })
    }

    useEffect(()=>{
        //當頁面滾動到底部的時候就再次請求api，把更多用戶顯示出來
        async function addUsers(){
            const octokit = new Octokit()
            const response = await  octokit.request('GET /search/users?', {
                q:inputName,
                per_page: 30,
                page:page
            })
            //用戶資料在結果的data的items裡面
            const data = response.data.items
            //把結果放到moreUsers裡面，讓return的地方去更新
            setMoreUsers(moreUsers=>[...moreUsers,...data])
            //page加1，下次請求api就會取得再下一組的用戶資料
            setPage(page+1)
            //回傳這次請求的結果長度(主要用在後面去判斷說這次請求的數量)
            return data.length
        }

        //表示有render成功
        setIsRender(true)
        //判斷從search傳來的用戶資料內容
        //如果資料小於30個
        if(users.length<30){
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
                addUsers().then(length=>{
                    //如果有render成功再執行
                    if(isRender){
                    if(length === 30){
                        //如果回傳的結果數量剛好是30判斷再次請求的話還有資料，所以過0.5秒之後把request設定成true
                        setTimeout(()=>{setRequest(true)}, 500)
                    }else{
                        //如果結果數量小於30的話代表再次請求不會有更多結果，則讓request維持false，且end設定為true
                        setEnd(true)
                    }
                    }else{
                    return null
                    }
                })
                }
            }
        }
        
        //在頁面要unmount的時候把isRender設定為false，讓addUser()不會再更改state內容
        return function cleanup(){
            setIsRender(false)
        }
      },[inputName, page, users, navigate, request, isRender])
    
    return (
        <div className='container users'>
            <div className='row justify-content-center gx-1'>
                <div className='col-12 col-md-9'>
                    <div className="row  gy-3 justify-content-center gx-1">
                        {
                            users.map((userObj)=>{
                                return(
                                    <div key={`${userObj.login}-${userObj.id}`} className="col-6 col-sm-4 col-md-3">
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
                        {
                            moreUsers.map((userObj,index)=>{
                                return(
                                    <div id='' key={`${index}-${userObj.id}`} className="col-6 col-sm-4 col-md-3">
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
                    {  end ? <h4 className='nomore'>no more users</h4> : <div className='requestmore' style={{backgroundImage: `url(${loading})`}}/>}
                </div>
            </div>
        </div>
    )
}
