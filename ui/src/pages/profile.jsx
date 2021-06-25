import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { postRequestOptions } from "../api"


export const ProfilePage = () => {
	const [user, setUser] = useState(null)
	let { id } = useParams()

	useEffect(async () => {
		let res = await fetch(`/api/users/${id}/`).then(res => res.json())
		console.log(res)
		setUser(res)
	}, [id])

	const follow = async () => {
		let res = await fetch("/api/follow/", { ...postRequestOptions, body: JSON.stringify({ "user_id": id }) })
		console.log(res)
		console.log(await res.json())
	}

	return (
		!user ? <div> Loading</div> : (
			<div>
				<div className="row py-5 px-4">
					<div className="col-md-5 mx-auto">
						<div className="bg-white shadow rounded overflow-hidden">
							<div className="px-4 pt-0 pb-4 cover">
								<div className="media align-items-end profile-head">
									<div className="profile mr-3">
										<img
											src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
											alt="..."
											width="130"
											className="rounded mb-2 img-thumbnail"
										/>
										<a href="#" className="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
									</div>
									<div className="media-body mb-5 text-white">
										<h4 className="mt-0 mb-0">{user.username}</h4>
										<p className="small mb-4">
											<i className="fas fa-map-marker-alt mr-2"></i>New York
										</p>
									</div>
								</div>
							</div>
							<div className="bg-light p-4 d-flex justify-content-end text-center">
								<ul className="list-inline mb-0">
									<li className="list-inline-item">
										<h5 className="font-weight-bold mb-0 d-block">{user.followers}</h5>
										<small className="text-muted">
											<i className="fas fa-user mr-1"></i>Followers
										</small>
									</li>
									<li className="list-inline-item">
										<h5 className="font-weight-bold mb-0 d-block">{user.following}</h5>
										<small className="text-muted">
											<i className="fas fa-user mr-1"></i>Following
										</small>
									</li>
								</ul>
							</div>
							<div className="px-4 py-3">
								<h5 className="mb-0">About</h5>
								<div className="p-4 rounded shadow-sm bg-light">
									<p className="font-italic mb-0">Web Developer</p>
									<p className="font-italic mb-0">Lives in New York</p>
									<p className="font-italic mb-0">Photographer</p>
								</div>
							</div>
							<div className="py-4 px-4">
								<div className="d-flex align-items-center justify-content-between mb-3">
									<h5 className="mb-0">Recent posts</h5>
									<a href="#" className="btn btn-link text-muted">Show all</a>
								</div>
								<div className="row">
									{
										user.posts ? (
											user.posts.map((post) => (
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}