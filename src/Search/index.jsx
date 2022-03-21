import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Octokit, App } from 'octokit'


export default function Search() {

    const octokit = new Octokit()
    const navigate = useNavigate()
    const [inputName, setInputName] = useState()

    async function search(event){
        event.preventDefault(); //防止在路徑加上"/?"
        console.log('into search')


        const response = await  octokit.request('GET /search/users?', {
            q:inputName,
            per_page: 10
        })

        navigate('users',{
            state:{
                users: response.data.items
            }
        })
    } 

    function upInputValue(event){
        setInputName(event.target.value)
    }
    
    return (
        <div>
            <form onSubmit={event=>search(event)}>
                <label>
                    用戶查詢
                    <input type="text" placeholder='輸入' onChange={event=>upInputValue(event)}/>
                </label>
                <input type="submit" value={'查詢'} />
            </form>
        </div>
    )
}
