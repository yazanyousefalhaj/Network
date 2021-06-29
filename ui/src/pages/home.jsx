import React, { useContext, useState, useEffect } from "react"
import { authContext } from '../authContext.jsx'
import { postRequestOptions } from '../api.js'


export const HomePage = () => {
	const [body, setBody] = useState("")
	const [list, setList] = useState([])
	const [currentPage, setCurrentPage] = useState("/api/posts.json")
	const [paginationParams, setPaginationParams] = useState({next: null, back: null})
	const auth = useContext(authContext)

	useEffect(async () => {
		if (auth.user) {
			let res = await fetch(currentPage).then(res => res.json())
			setList(res.results);
			setPaginationParams({
				next: res.next,
				back: res.previous,
			})
		}
	}, [auth.user, currentPage])

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

	const navigatePosts = (direction) => {
		let target = paginationParams[direction]
		if (target) {
			setCurrentPage(target)
		}
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

			{
				list ? (
					list.map((post) => (
						<div className="card m-1" key={post.id}>
							<div className="card-body">
								<div className="card-title">
									{post.body}
								</div>
								author: {post.author_name} -- likes: {post.likes}
							</div>
						</div>))
				) : "No Posts"
			}

			<nav aria-label="Page navigation example">
				<ul className="pagination">
					<li className="page-item"><button className="page-link" onClick={() => navigatePosts("back")}>Previous</button></li>
					<li className="page-item"><button className="page-link" onClick={() => navigatePosts("next")}>Next</button></li>
				</ul>
			</nav>
		</>
	)
}