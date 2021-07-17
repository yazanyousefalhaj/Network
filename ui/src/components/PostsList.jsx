import React, { useState } from "react"
import { EditPost } from "./EditPost.jsx"
import { Post } from './Post.jsx'


export const PostList = ({ list }) => {
	const [showEditPost, setShowEditPost] = useState(false)
	const [editPost, setEditPost] = useState(null)

	const handleEditPost = (_post) => {
		setShowEditPost(false)
		setShowEditPost(true)
		setEditPost(_post)
	}

	return (
		<>
			{
				list ? (
					<div className="container posts-content">
						<div className="row">
							{list.map((post) => <Post post={post} key={post.id} editPost={handleEditPost} />)}
						</div>
					</div>
				) : "No Posts"
			}
			<EditPost post={editPost} show={showEditPost} />
		</>
	)
}