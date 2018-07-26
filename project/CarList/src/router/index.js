import Vue from 'vue'
import Router from 'vue-router'
import Car from '../components/car/carlist'
import Details from '../components/details/details'
import Photos from '../components/photos/photos'
import CarK from '../components/carK/carK'
import Imagess from '../components/imagess/imagess'
import Inquiry from '../components/inquiry/inquiry.vue'
import Banner from '../components/banner/banner.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/car',
      name: 'car',
      component:Car
    },
    {
      path: '/details/:id',
      name: 'details',
      component:Details
    },
    {
      path: '/photos/:id',
      name: 'photos',
      component:Photos
    },{
      path: '/carK/:id',
      name: 'carK',
      component:CarK
    },{
      path: '/imagess/:id',
      name: 'imagess',
      component:Imagess
    },{
      path: '/banner/:id',
      name: 'banner',
      component:Banner
    },{
      path: '/inquiry/:id',
      name: 'inquiry',
      component:Inquiry
    }
  ]
})
