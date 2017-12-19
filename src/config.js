export const getHeader = function () {
  const authUser = JSON.parse(window.localStorage.getItem('authUser'))
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + authUser.token.access
  }

  return headers
}
