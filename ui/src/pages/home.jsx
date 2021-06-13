import React, { useContext, useState, useEffect } from "react"
import {authContext} from '../pages/auth.jsx'


export const HomePage = () => {
	const [body, setBody] = useState("")
	const [list, setList] = useState([])
	const auth = useContext(authContext)

	useEffect(async () => {
		if (auth.user) {
			let res = await fetch("/api/posts.json")
			setList(await res.json());
		}
	}, [auth.user])

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (body) {
			const csrftoken = Cookies.get('csrftoken');
			let res = await fetch(`/api/posts.json`, {
				method: "post",
				headers: new Headers({
					'Content-type': 'application/json',
					'X-CSRFToken': csrftoken,
				}),
				credentials: 'include',
				body: JSON.stringify({ body }),
			})
		}
	}

	const handleFormChanged = (event) => {
		setBody(event.target.value)
	}

	return (
		<>
			{
				list ? (
					list.map((post) => (<div key={post.body}>{post.body} -- {post.author}</div>))
				) : "No Posts"
			}

			<form onSubmit={handleSubmit}>

				<div className="form-group">
					<input
						autoFocus
						className="form-control"
						type="text"
						name="body"
						placeholder="Write your post"
						onChange={handleFormChanged}
						value={body}
					/>
				</div>
				<input className="btn btn-primary" type="submit" value="Submit" />
			</form>
		</>
	)
}