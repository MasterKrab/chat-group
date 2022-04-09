<script lang="ts">
	import { onMount } from 'svelte'
	import chat from '$lib/stores/chat'
	import user from '$lib/stores/user'
	import { scale } from 'svelte/transition'
	import Members from '$lib/components/Members.svelte'
	import Channels from '$lib/components/Channels.svelte'
	import AddChannel from '$lib/components/AddChannel.svelte'
	import createHandleFocusLeaveElement from '$lib/utils/createHandleFocusLeaveElement'
	import User from '$lib/components/User.svelte'

	export let menuOpen: boolean
	export let showChannel = false

	let parentNode: HTMLElement

	const closeMenu = () => (menuOpen = false)

	const handleCloseChannel = () => (showChannel = false)

	const handleJoinChannel = () => {
		menuOpen = false
		showChannel = true
	}

	const handleClick = (e: Event) => {
		e.target === parentNode && closeMenu()
	}
</script>

<svelte:window on:join-channel={handleJoinChannel} />

<section
	bind:this={parentNode}
	on:click={handleClick}
	class="section"
	class:section--active={menuOpen}
	id="left-bar"
>
	<div class="section__content">
		<div class="top">
			{#if showChannel}
				<button on:click={handleCloseChannel} class="top__button">
					<span class="material-icons top__arrow-back" aria-hidden="true">arrow_back_ios</span> All channels
				</button>
			{:else}
				<h1 class="top__title">Channels</h1>

				{#if $user.data}
					<AddChannel />
				{/if}
			{/if}
		</div>

		<div class="body">
			{#if showChannel}
				<header class="header">
					<h1 class="title">{$chat.name}</h1>
					<p>{$chat.description || 'No description'}</p>
				</header>

				<Members />
			{:else}
				<Channels />
			{/if}
		</div>

		{#if menuOpen}
			<button on:click={closeMenu} in:scale={{ delay: 400 }} out:scale class="close-button">
				<span class="material-icons">close</span>
			</button>
		{/if}

		<User />
	</div>
</section>

<style lang="scss">
	button,
	h1,
	p {
		font-size: 1.125rem;
		line-height: 1.533rem;
		letter-spacing: -3.5%;
	}

	.section {
		@media screen and (max-width: 768px) {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 100;
			width: 85%;
			height: 100vh;
			transform: translateX(-100%);
			transition: transform 0.5s ease-in-out;

			&--active {
				transform: translateX(0);
			}
		}

		&__content {
			position: relative;
			background-color: var(--secondary-color);

			@media screen and (max-width: 768px) {
				max-width: 22.625rem;
			}
		}
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.078rem 1.188rem;
		height: 3.718rem;
		box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);

		&__button {
			display: flex;
			align-items: center;
			font-weight: bold;
			font-size: 1.125rem;
		}

		&__arrow-back {
			font-size: 1.25rem;
			margin-right: 1rem;
		}

		&__title {
			font-size: 1.125rem;
		}
	}

	.body {
		height: calc(100vh - 8.432rem);
		padding: 1.585rem 2.062rem;
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

	.title {
		text-transform: uppercase;
	}

	.close-button {
		display: grid;
		place-items: center;
		position: absolute;
		top: 0.671rem;
		right: -0.411rem;
		background-color: var(--secondary-color);
		width: 2.375rem;
		height: 2.375rem;
		border-radius: 0.75rem;
		transform: translateX(100%);

		@media screen and (min-width: 768px) {
			display: none;
		}
	}
</style>
