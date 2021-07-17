import React, { useState, useContext, useEffect } from "react"
import { useQuery } from 'react-query'
import { fetchPosts } from "../api.js"

export const Pagination = ({ children, list_url }) => {
	const [currentPage, setCurrentPage] = useState(list_url)
	const { data } = useQuery(["list", currentPage], fetchPosts)

	const navigatePosts = (direction) => {
		if (!data) return
		let paginationParams = {next: data.next, back: data.previous}
		let target = paginationParams[direction]
		if (target) {
			setCurrentPage(target)
		}
	}

	return (
		<>
			{data && children(data.results)}
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item"><button className="page-link" onClick={() => navigatePosts("back")}>Previous</button></li>
					<li className="page-item"><button className="page-link" onClick={() => navigatePosts("next")}>Next</button></li>
				</ul>
			</nav>
		</>
	)
}