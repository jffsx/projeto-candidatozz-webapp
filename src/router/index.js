import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'

import CandidateCreate from '@/components/candidate/Create'
import CandidateEdit from '@/components/candidate/Edit'
import CandidateIndex from '@/components/candidate/Index'
import CandidateShow from '@/components/candidate/Show'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'dashboard', component: Dashboard},
    {path: '/candidates', name: 'candidate.index', component: CandidateIndex},
    {path: '/candidates/create', name: 'candidate.create', component: CandidateCreate},
    {path: '/candidates/:id/edit', name: 'candidate.edit', component: CandidateEdit},
    {path: '/candidates/:id/show', name: 'candidate.show', component: CandidateShow}
  ]
})
