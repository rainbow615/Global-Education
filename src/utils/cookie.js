import Cookie from 'js-cookie'

export function getToken() {
  const user = Cookie.get('user')

  try {
    return JSON.parse(user)?.token
  } catch (e) {
    return
  }
}

export function getUser() {
  const user = Cookie.get('user')

  try {
    return JSON.parse(user)
  } catch (e) {
    return {}
  }
}

export function setUser(user, rememberMe) {
  if (user) {
    const expires = rememberMe ? 30 : 1
    Cookie.set('user', JSON.stringify(user), { expires })
  }
}

export function removeUser() {
  if (getUser()) {
    Cookie.remove('user')
  }
}
