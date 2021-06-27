import React, { useState, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { authContext } from '../authContext.jsx'


export const FollowingPage = () => {
	const [list, setList] = useState([])
	const auth = useContext(authContext)

	useEffect(async () => {
		if (auth.user) {
			let res = await fetch("/api/following/").then(res => res.json())
			setList(res);
		}
	}, [auth.user])

	return (
		<>
			{
				list ? (
					list.map((post) => (
					<div className="card m-1" key={post.id}>
						<div className="card-body">
							<div className="card-title">
								{post.body}
							</div>
							<Link to={`/profile/${post.author_id}`}>author: {post.author_name}</Link> -- likes: {post.likes}
						</div>
					</div>))
				) : "No Posts"
			}
		</>
	)
}