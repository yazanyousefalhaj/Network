import React, { useState, useEffect, useContext } from "react"
import { authContext } from "../authContext.jsx"
import { Post } from './Post.jsx'


export const PostList = ({ list }) => {
	return (
		<>
			{
				list ? (
					<div className="container posts-content">
						<div className="row">
							{list.map((post) => <Post post={post} key={post.id} /> )}
						</div>
					</div>
				) : "No Posts"
			}
		</>
	)
}