<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import SearchBox from '$lib/components/SearchBox.svelte'
	import channels from '$lib/stores/channels'
	import ChannelItem from '$lib/components/ChannelItem.svelte'
	import LoadingItem from '$lib/components/LoadingItem.svelte'
	import filterChannels from '$lib/utils/filterChannels'

	let query = ''

	onMount(channels.connect)

	onDestroy(channels.disconnect)
</script>

<SearchBox bind:query />

<ul class="channels" aria-live="polite">
	{#if $channels.isLoading}
		<LoadingItem />
	{:else}
		{#each query.trim() ? filterChannels($channels.items, query) : $channels.items as channel}
			<ChannelItem {...channel} />
		{:else}
			<li>There is no channels</li>
		{/each}
	{/if}
</ul>

<style lang="scss">
	.channels {
		display: flex;
		flex-direction: column;
		gap: 1.351rem;
		height: calc(100% - 6.186rem);
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 0.5rem;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--quaternary-color);
		}
	}
</style>
