<template>
  <div>
      <div class="container">


          <hr>

          <reservationCard v-bind:reservation="reservation"></reservationCard>

      </div>

  </div>
</template>
<script>

    var URL = require('./env.js').HostURL;
    import reservationCard from './reservationDetailedView';

    export default {
        name: 'ReservationDetails',
        props: ['startP','endP'],
        components: {
            reservationCard: reservationCard
        },
        data() {
            return {
                reservation: null,
                msg: '',
                errors: null
            }
        },
        created: function() {
            this.startP();
            var context = this;

            this.$http.get(URL + '/activity/reservation/' + this.$route.params.id)
                .then(function (response) {
                    this.endP();
                    if (response.data.errors) {
                        this.errors = response.data.errors;
                    }
                    this.reservation = response.data.data.reservation;

                }, (err) => {
					context.errors = err.body.errors
				});
        }

    }
</script>