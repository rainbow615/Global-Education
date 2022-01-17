import Cookie from 'js-cookie'

export function getToken() {
  return Cookie.get('token')
}

export function setToken(token, rememberMe) {
  if (token) {
    const expires = rememberMe ? 30 : 1
    Cookie.set('token', token, { expires })
  }
}

export function removeToken() {
  if (getToken()) {
    Cookie.remove('token')
  }
}
