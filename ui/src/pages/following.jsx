import React, { useState, useContext, useEffect } from "react"
import { PostList } from '../components/PostsList.jsx'
import { Pagination } from '../components/Pagination.jsx'


export const FollowingPage = () => {
	return (
		<Pagination ListComponent={PostList} list_url="/api/following/"/>
	)
}