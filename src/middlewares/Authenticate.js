import Access from '@/services/Access'

export default function Authenticate (to, from, next) {
  if (Access.check()) {
    next()
  } else {
    next({ name: 'login', query: { redirect: to.fullPath } })
  }
}
