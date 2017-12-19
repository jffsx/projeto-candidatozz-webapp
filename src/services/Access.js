
export default {
  user () {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    return authUser
  },

  check () {
    const authUser = this.user()
    return (authUser && authUser.token.access)
  },

  hasRole (role) {
    const authUser = this.user()
    let result = false

    for (var k in authUser.user.roles.data) {
      if (authUser.user.roles.data[k].code === role || authUser.user.roles.data[k].all === true) {
        result = true
      }
    }

    return result
  }
}
