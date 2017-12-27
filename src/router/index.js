import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import NotFound from '@/components/app/NotFound'
import Unauthorized from '@/components/app/Unauthorized'

import Authenticate from '@/middlewares/Authenticate'
import Guest from '@/middlewares/Guest'

import CandidateCreate from '@/components/candidate/Create'
import CandidateEdit from '@/components/candidate/Edit'
import CandidateIndex from '@/components/candidate/Index'
import CandidateShow from '@/components/candidate/Show'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Login, beforeEnter: Guest, meta: {permission: 'public'}},
    {path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: Authenticate, meta: {permission: 'public'}},
    {path: '/login', name: 'login', component: Login, beforeEnter: Guest, meta: {permission: 'public'}},
    {path: '/candidates', name: 'candidate.index', component: CandidateIndex, beforeEnter: Authenticate, meta: {permission: 'administrator'}},
    {path: '/candidates/create', name: 'candidate.create', component: CandidateCreate, beforeEnter: Authenticate, meta: {permission: 'administrator'}},
    {path: '/candidates/:id/edit', name: 'candidate.edit', component: CandidateEdit, beforeEnter: Authenticate, meta: {permission: 'administrator'}},
    {path: '/candidates/:id/show', name: 'candidate.show', component: CandidateShow, beforeEnter: Authenticate, meta: {permission: 'administrator|candidate'}},
    { path: '/unauthorized', name: 'unauthorized', component: Unauthorized, meta: {permission: 'public'} },
    { path: '*', component: NotFound }
  ]
})
