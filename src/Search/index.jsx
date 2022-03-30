import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Octokit } from 'octokit'
import './index.css'


export default function Search() {
    const octokit = new Octokit()
    const navigate = useNavigate()
    const [inputName, setInputName] = useState()

    async function search(event){
        event.preventDefault(); //不要發送form

        //請求api，根據用戶名稱查詢
        const response = await  octokit.request('GET /search/users?', {
            q:inputName,
            per_page: 30,
            page:1
        })

        //取得資料後切換路由並傳遞資料
        navigate('users',{
            state:{
                inputName:inputName,
                users: response.data.items
            }
        })

        //如果請求結果有用戶就重新整理，把原本的結果清空
        if(response.data.items.length !== 0){
            window.location.reload()
        }else{
            //如果請求結果查無用戶用切換到柴無用戶的路由
            navigate('findNoUser')
        }
    } 

    //搜尋欄內容改變的話要輸入的name也要更新
    function upInputValue(event){
        setInputName(event.target.value)
    }
    
    return (
        <div className='search_bar'>
            <div className='search_form'>
                <form onSubmit={event=>search(event)}>
                        <label>
                            <input className='search_input' type="text" onChange={event=>upInputValue(event)}/>
                        </label>
                        <input className='search_submit' type="submit" value={' '} />
                </form>
            </div>
        </div>
    )
}
