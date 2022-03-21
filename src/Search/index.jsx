import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Octokit, App } from 'octokit'


export default function Search() {

const octokit = new Octokit()
const navigate = useNavigate()

async function search(event){
    event.preventDefault(); //防止在路徑加上"/?"
    console.log('into search')


    const response = await  octokit.request('GET /search/users?', {
        q:'xiaoxuan',
        per_page: 10
    })

    // const response = await  octokit.request('GET /rate_limit')

    navigate('users',{
        state:{
            users: response.data.items
        }
    })

    // console.log(response.data.items);
    // console.log(response);
} 
    
  return (
    <div>
        <form onSubmit={event=>search(event)}>
            <label>
                用戶查詢
                <input type="text" placeholder='輸入' />
            </label>
            <input type="submit" value={'查詢'} />
        </form>
    </div>
  )
}
