import React, {useState, useContext, useEffect} from "react"
import {authContext} from '../authContext.jsx'


export const Pagination = ({ListComponent, list_url}) => {

	const [list, setList] = useState([])
	const [currentPage, setCurrentPage] = useState(list_url)
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

	const navigatePosts = (direction) => {
		let target = paginationParams[direction]
		if (target) {
			setCurrentPage(target)
		}
	}

	return (
		<>
			<ListComponent list={list} />
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item"><button className="page-link" onClick={() => navigatePosts("back")}>Previous</button></li>
					<li className="page-item"><button className="page-link" onClick={() => navigatePosts("next")}>Next</button></li>
				</ul>
			</nav>
		</>
	)
}