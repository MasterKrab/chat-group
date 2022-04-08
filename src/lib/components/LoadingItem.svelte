<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte'
</script>

<li class="loading">
	<Spinner />
	Loading...
</li>

<style lang="scss">
	.loading {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 0.5rem;
	}
</style>
