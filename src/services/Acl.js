'use strict'

import Access from '@/services/Access'

class Acl {

  init (router, fail) {
    this.router = router
    this.fail = fail
  }

  check (permission) {
    if (permission === undefined) {
      return false
    }

    const permissions = (permission.indexOf('|') !== -1) ? permission.split('|') : [permission]
    let result = false

    permissions.forEach(permisison => {
      if (Access.hasRole(permisison)) {
        result = true
      }
    })

    return result
  }

  set router (router) {
    router.beforeEach((to, from, next) => {
      if (to.meta.permission === 'public') {
        return next()
      }

      let fail = to.meta.fail || this.fail || from.fullPath

      if (!this.check(to.meta.permission)) {
        return next(fail)
      }

      return next()
    })
  }
}

let acl = new Acl()

Acl.install = (Vue, {router, fail}) => {
  acl.init(router, fail)
  Vue.prototype.$can = (permission) => acl.check(permission)
}

export default Acl
