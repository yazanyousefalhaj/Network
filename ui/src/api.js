import Cookies from 'js-cookie'


export let postRequestOptions = {
  method: "post",
  headers: new Headers({
    'Content-type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
  }),
  credentials: 'include',
}