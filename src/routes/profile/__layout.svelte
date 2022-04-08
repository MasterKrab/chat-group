<script lang="ts">
	import user from '$lib/stores/user'
	import { goto } from '$app/navigation'
	import ProfileSpinner from '$lib/components/ProfileSpinner.svelte'

	$: if (!$user.isLoading && !$user.data) goto('/login')
</script>

{#if $user.isLoading || !$user.data}
	<ProfileSpinner />
{:else}
	<slot />
{/if}

<svelte:head>
	<title>Profile</title>

	<style>
		.main {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 95%;
			max-width: 52.869rem;
			min-height: 100vh;
			margin-left: auto;
			margin-right: auto;
			padding-top: 2rem;
			padding-bottom: 2rem;
		}
	</style>
</svelte:head>
