<script lang="ts">
	import { onMount } from 'svelte'
	import chat from '$lib/stores/chat'
	import LeftBar from '$lib/components/LeftBar.svelte'
	import Chat from '$lib/components/Chat.svelte'

	let menuOpen = false

	onMount(chat.connect)
</script>

<LeftBar bind:menuOpen />
<Chat bind:menuOpen />

<svelte:head>
	<title>Chat group</title>

	<style lang="scss">
		.main {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 100vh;

			@media screen and (min-width: 768px) {
				grid-template-columns: 324px 1fr;
			}
		}
	</style>
</svelte:head>
