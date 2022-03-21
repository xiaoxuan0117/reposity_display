import React from 'react'
import {useLocation, useParams} from 'react-router-dom'
import { Octokit, App } from 'octokit'

export default function Repo() {
  const {state:{repoData}} = useLocation()
  const {repo} = useParams()
  // console.log(repoData)

  return (
    <div>
      <h4>{repo}</h4>
      <p>{repoData.data.description}</p>
      <h4>{repoData.data.stargazers_count}</h4>
      <a href={`${repoData.data.html_url}`} target="_blank">link</a>
    </div>
  )
}
