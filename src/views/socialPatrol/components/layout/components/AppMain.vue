<template>
	<section class="app-main socialPatrol" :class="{'full-height': isFullHeight }">
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</section>
</template>

<script>
	export default {
		name: 'AppMain',
		computed: {
			key() {
				return this.$route.path;
			},
			isFullHeight() {
				var arr = [
					'/socialPatrol/patrolVisualization',
					'/socialPatrol/direction/dashboard'
				]
				// console.log('indexof', arr.indexOf(this.$route.path) !== -1)
				return arr.indexOf(this.$route.path) !== -1
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '~@/styles/mixin.scss';
	.app-main {
		width: 100%;
		position: relative;
		background: transparent;
		padding: 0;
		height: calc(100% - 50px);
		overflow: hidden;
		&.full-height {
			height: 100%;
			padding-bottom: 0;
		}
	}
</style>