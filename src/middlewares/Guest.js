import Access from '@/services/Access'

export default function Guest (to, from, next) {
  if (Access.user() === null) {
    next()
  } else {
    next({
      name: 'dashboard'
    })
  }
}
