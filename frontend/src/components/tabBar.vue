<template>
	<div>
		<link rel="stylesheet" href="../static/tabBar/css/tabbar.css">
		<div class="tabBar-bar center">
			<div class="tabBar-tabs action_border">
				<div class="tab1-activities tab fade" v-if="activities"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Activities</button>
					<div v-if="currentTab=='activities'" class="tab-highlight backgroudcolor1"></div>
				</div>
				<div class="tab2-info tab fade" v-if="info"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Info</button>
					<div v-if="currentTab=='info'" class="tab-highlight backgroudcolor1"></div>
				</div>
				<div class="tab3-promotions tab fade" v-if="promotions"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Promotions</button>
					<div v-if="currentTab=='promotions'" class="tab-highlight backgroudcolor1"></div>
				</div>
				<div class="tab4-payments tab fade" v-if="payments"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Payments</button>
					<div v-if="currentTab=='payments'" class="tab-highlight backgroudcolor1"></div>
				</div>
				<div class="tab5-reservations tab fade" v-if="reservations"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Reservations</button>
					<div v-if="currentTab=='reservations'" class="tab-highlight backgroudcolor1"></div>
				</div>
				<div class="tab6-reservations tab fade" v-if="operators"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Operators</button>
					<div v-if="currentTab=='operators'" class="tab-highlight backgroudcolor1"></div>
				</div>
			</div>
		</div>
		<div v-if="user.username==loggedInUser" class="form-open center">
			<button v-on:click="ParentFormType('activityForm')" v-if="currentTab=='activities'" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Activity</button>
			<button v-on:click="ParentFormType('operatorForm')" v-if="currentTab=='operators'" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Operator</button>
		</div>
		<div v-if="!forbidden" class="content center">
			<div v-if="currentTab=='activities'" class="activities row container">
				<div v-for="activity in activities" class="card-tab col-lg-4">
					<ActivityCard :activity='activity' :parentOpenForm='ParentFormType' :removeActivity="removeActivity" :startP="startP" :endP="endP"></ActivityCard>
				</div>
			</div>
			<div v-if="currentTab=='promotions'" class="promotions  row container">
				<div v-for="promotion in promotions" class="card-tab col-lg-4">
					<promotionCard :parentOpenForm='ParentFormType' :business='info' :promotion='promotion' :removePromotion="removePromotion" :startP="startP" :endP="endP"></promotionCard>
				</div>
			</div>
			<div v-if="currentTab=='info'" class="info">
				<userInfo v-bind:info="info" v-bind:openForm="ParentFormType" :sameUser="user.username==loggedInUser"></userInfo>
			</div>
			<div v-if="currentTab=='payments'" class="promotions row container">
				<div v-for="payment in payments" class="card-tab col-lg-3">
					
					<paymentCard :payment="payment"></paymentCard>

				</div>
			</div>
			<div v-if="currentTab=='reservations'" class="promotions row container">
				<div v-for="reservation in reservations" class="card-tab col-lg-4">

					<ReservationCard :openForm='ParentFormType' :reservation="reservation"  :startP="startP" :endP="endP"></ReservationCard>

				</div>
			</div>
			<div v-if="currentTab=='operators'" class="promotions">
				<div v-for="operator in operators" class="card-tab">
					{{operator}}
				</div>
			</div>
		</div>
		<div v-else class="content center actionfont">
			Forbidden To View Page Data
		</div>
	</div>
</template>

<script>
	import HomePage from './HomePage'
	import userInfo from './userInfo'
	import ActivityCard from './activityCard'
	import ReservationCard from './reservationDetailedView'
	import promotionCard from './promotionCard'
	import paymentCard from './paymentCard'


	export default {
		props: ["activities", "info", "promotions", "payments", "reservations", "user", "operators", "forbidden",
			"ParentFormType", "reservationPaymentObject", "removePromotion", "removeActivity","startP","endP"
		],
		name: 'tabBar',
		data() {
			return {
				currentTab: "info",
				loggedInUser: undefined,
			}
		},
		methods: {
			changeCurrentTab: function (e) {
				var innerText = e.srcElement.textContent;
				this.currentTab = innerText.toLowerCase()
			},
			formType: function () {
				this.ParentFormType()
			}
		},
		components: {
			HomePage: HomePage,
			userInfo: userInfo,
			ActivityCard: ActivityCard,
			ReservationCard: ReservationCard,
			promotionCard: promotionCard,
			paymentCard: paymentCard

		},
		created: function () {
			if (localStorage.user) {
				this.loggedInUser = localStorage.user
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.fade
	{
			opacity:1.0;
	}
	.fade:hover
	{
			opacity:0.7;
	}

</style>