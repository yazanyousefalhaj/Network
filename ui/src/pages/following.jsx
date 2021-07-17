import React from "react"
import { PostList } from '../components/PostsList'
import { Pagination } from '../components/Pagination'


export const FollowingPage = () => {
	return (
		<Pagination list_url="/api/following/">
			{(list) => (<PostList list={list} />)}
		</Pagination>
	)
}