import React, { useState, useContext, useEffect } from "react"
import { PostList } from '../components/PostsList.jsx'
import { Pagination } from '../components/Pagination.jsx'


export const FollowingPage = () => {
	return (
		<Pagination list_url="/api/following/">
			{(list) => (<PostList list={list} />)}
		</Pagination>
	)
}