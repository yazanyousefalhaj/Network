import Cookies from 'js-cookie'


export const postRequestOptions = {
  method: "post",
  headers: new Headers({
    'Content-type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
  }),
  credentials: 'include',
}

export const putRequestOptions = {
  method: "put",
  headers: new Headers({
    'Content-type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
  }),
  credentials: 'include',
}

export const fetchPosts = async ({ queryKey }) => {
  const [_key, page] = queryKey
	return fetch(page).then(res => res.json())
}

export const fetchProfile = async ({ queryKey }) => {
  const [_key, id] = queryKey

  return fetch(`/api/users/${id}/`).then(res => res.json())
		setProfileUser(res)
}

export const editPost = async ({ postId, postBody }) => {
	return fetch(
		`/api/posts/${postId}/`, 
		{...putRequestOptions, body: JSON.stringify({body: postBody})}
	)
}

export const follow = async ({ id }) => {
  return fetch("/api/follow/", { ...postRequestOptions, body: JSON.stringify({ "user_id": id }) })
}