import React, { useEffect, useState } from "react"
import { useMutation, useQueryClient } from 'react-query'
import { editPost } from '../api'
import { Modal } from '../components/Modal'


export const EditPost = ({ post, show, onModalHidden }) => {
	const [showModal, setShowModal] = useState(false)
	const [postId, setPostId] = useState(post? post.id: -1)
	const [postBody, setPostBody] = useState(post? post.body: "")
	const queryClient = useQueryClient()
	const savePost = useMutation(editPost, {
		onSuccess: () => {
			queryClient.invalidateQueries({ predicate: query => query.queryKey[0] === "list" || query.queryKey[0] === "profile"})
			setShowModal(false)
		}
	})

	const handleBodyChange = (e) => {
		setPostBody(e.target.value)
	}

	useEffect(() => {setShowModal(show)}, [show])
	useEffect(() => {
		if (post) {
			setPostId(post.id)
			setPostBody(post.body)
		}
	}, [post])

	return (
		<Modal title="Edit Post" show={showModal} onModalHidden={onModalHidden} footer={() => (
			<>
				<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
				<button type="button" className="btn btn-primary" onClick={() => savePost.mutate({ postId: postId, postBody: postBody })}>Save changes</button>
			</>
		)}>
			<textarea className="form-control" name="newBody" id="newBody" cols="30" rows="10" value={postBody} onChange={handleBodyChange}></textarea>
		</Modal>
	)

}