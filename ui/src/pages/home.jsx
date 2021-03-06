import React, { useContext, useState, useEffect } from "react"
import { authContext } from '../authContext'
import { postRequestOptions } from '../api'
import { PostList } from "../components/PostsList"
import { Pagination } from "../components/Pagination"


export const HomePage = () => {
	const [body, setBody] = useState("")
	const auth = useContext(authContext)

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (body) {
			let res = await fetch(`/api/posts.json`, {
				...postRequestOptions,
				body: JSON.stringify({ body }),
			})
			if (res.status == 201) {
				let post = await res.json()
				setList([post, ...list])
				setBody("")
			}
		}
	}

	const handleFormChanged = (event) => {
		setBody(event.target.value)
	}

	return (
		<>
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

			<Pagination list_url="/api/posts.json">
				{(list) => (<PostList list={list} />)}
			</Pagination>

		</>
	)
}