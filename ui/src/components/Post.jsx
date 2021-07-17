import React, { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { like } from '../api.js'
import { authContext } from '../authContext.jsx'


export const Post = ({ post, editPost }) => {
	const { user } = useContext(authContext)
	const queryClient = useQueryClient()
	const likePost = useMutation(like, {
		onSuccess: () => {
			queryClient.invalidateQueries({predicate: query => query.queryKey[0] == "list" || query.queryKey[0] == "profile"})
		}
	})

	return (
		<>
			<div className="col-lg-6">
				<div className="card mb-4">
					<div className="card-body">
						<div className="media mb-3">
							<img
								src="https://bootdey.com/img/Content/avatar/avatar3.png"
								className="d-block ui-w-40 rounded-circle"
								alt=""
							/>
							<div className="media-body ml-3">
								{post.author_name}
								<div className="text-muted small">3 days ago</div>
							</div>
						</div>
						<p>{post.body}</p>
					</div>

					<div className="card-footer">
						<a href="#" className="d-inline-block text-muted">
							<strong>{post.likes}</strong>
							<small>Likes</small>
						</a>
						<a href="#" className="d-inline-block text-muted ml-3">
							<strong>12</strong>
							<small>Comments</small>
						</a>
						{
							user && post.author_id == user.id &&
							(
								<button onClick={() => editPost(post)} className="d-inline-block text-muted ml-3">
									<small className="align-middle">Edit</small>
								</button>
							)
						}
						<button className="d-inline-block text-muted ml-3" onClick={() => likePost.mutate({id: post.id})}>
							<small className="align-middle">{post.liked_by_user? "Unlike": "Like"}</small>
						</button>
					</div>

				</div>
			</div>

		</>
	)
}