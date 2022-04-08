<script lang="ts">
	import chat from '$lib/stores/chat'
	import user from '$lib/stores/user'
	import Messages from '$lib/components/Messages.svelte'
	import MessageForm from '$lib/components/MessageForm.svelte'
	import NoUserMessage from '$lib/components/NoUserMessage.svelte'

	export let menuOpen = false

	const handleOpenMenu = () => (menuOpen = true)
</script>

<section class="section">
	<header class="header">
		<button on:click={handleOpenMenu} class="button-open-menu" aria-label="Open menu">
			<span class="material-icons">menu</span>
		</button>
		<h2 class="header__title">{$chat.name || 'Loading...'}</h2>
	</header>
	<div class="body">
		<Messages />

		{#if $chat.sendMessage}
			{#if $user.data}
				<MessageForm />
			{:else if !$user.isLoading}
				<NoUserMessage />
			{/if}
		{/if}
	</div>
</section>

<style lang="scss">
	.section {
		background-color: var(--primary-color);
	}

	.body,
	.header {
		padding: 1.078rem 1.188rem;

		@media screen and (min-width: 768px) {
			padding: 1.258rem 2rem;
		}

		@media screen and (min-width: 1200px) {
			padding-left: 4.875rem;
			padding-right: 4.875rem;
		}
	}

	.header {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 3.718rem;
		box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);

		&__title {
			margin-top: 0;
			margin-bottom: 0;
			text-transform: uppercase;
			font-size: 1.125rem;
		}
	}

	.button-open-menu {
		display: grid;
		place-items: center;

		@media screen and (min-width: 768px) {
			display: none;
		}
	}

	.body {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: calc(100vh - var(--vertical-separation)) 4rem;
		--vertical-separation: 9.874rem;
		min-height: calc(100vh - 3.718rem);

		@media screen and (min-width: 768px) {
			--vertical-separation: 10.234rem;
		}
	}
</style>
