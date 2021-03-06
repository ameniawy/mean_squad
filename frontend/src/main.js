// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import NavBar from './components/NavBar'
import router from './router'
import vueResource from 'vue-resource'
import VueSweetAlert from 'vue-sweetalert'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.use(VueYouTubeEmbed)
Vue.use(vueResource);
Vue.use(VueSweetAlert);

Vue.config.productionTip = false
Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCSb0024ZA1zQorALVJkTNHZ5Gn4B43j64',
        // libraries: 'places', //// If you need to use place input
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    template: '<navBar></navBar>',
    components: { NavBar }
})