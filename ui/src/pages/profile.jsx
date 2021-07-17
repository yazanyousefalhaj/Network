import React, { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { fetchProfile, follow } from "../api"
import { authContext } from "../authContext"
import { PostList } from '../components/PostsList'


export const ProfilePage = () => {
	const {user} = useContext(authContext)
	let { id } = useParams()
	const queryClient = useQueryClient()

	const { data } = useQuery(["profile", id], fetchProfile)

	const followUser = useMutation(follow, {
		onSuccess: () => {
			queryClient.invalidateQueries({predicate: query => query.queryKey[0] == "profile"})
		}
	})

	return (
		!data ? <div> Loading</div> : (
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
										{
											(user && user.id !== Number.parseInt(id)) &&
												<button href="#" className="btn btn-outline-dark btn-sm btn-block" onClick={() => followUser.mutate({id: id})}>Follow</button>
										}
									</div>
									<div className="media-body mb-5 text-white">
										<h4 className="mt-0 mb-0">{data.username}</h4>
										<p className="small mb-4">
											<i className="fas fa-map-marker-alt mr-2"></i>New York
										</p>
									</div>
								</div>
							</div>
							<div className="bg-light p-4 d-flex justify-content-end text-center">
								<ul className="list-inline mb-0">
									<li className="list-inline-item">
										<h5 className="font-weight-bold mb-0 d-block">{data.followers}</h5>
										<small className="text-muted">
											<i className="fas fa-user mr-1"></i>Followers
										</small>
									</li>
									<li className="list-inline-item">
										<h5 className="font-weight-bold mb-0 d-block">{data.following}</h5>
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
									<PostList list={data.posts} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}