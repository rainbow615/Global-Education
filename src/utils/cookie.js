import Cookie from 'js-cookie'

export function getConfirmLogin() {
  return Cookie.get('isConfirmLogin')
}

export function setConfirmLogin() {
  Cookie.set('isConfirmLogin', 'confirm', { expires: 30 })
}

export function removeConfirmLogin() {
  if (getConfirmLogin()) {
    Cookie.remove('isConfirmLogin')
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
