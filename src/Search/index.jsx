import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Octokit, App } from 'octokit'
import './index.css'


export default function Search() {

    const octokit = new Octokit({
        auth: "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"
    })
    const navigate = useNavigate()
    const [inputName, setInputName] = useState()

    async function search(event){
        event.preventDefault(); //防止在路徑加上"/?"
        // console.log('into search')


        const response = await  octokit.request('GET /search/users?', {
            q:inputName,
            per_page: 30,
            page:1
        })

        navigate('users',{
            state:{
                inputName:inputName,
                users: response.data.items
            }
        })
    } 

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
