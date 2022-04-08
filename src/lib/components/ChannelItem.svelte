<script lang="ts">
	import { slide } from 'svelte/transition'
	import chat from '$lib/stores/chat'
	import getInitials from '$lib/utils/getInitials'

	export let id: string
	export let name: string
	export let description: string | null = null

	const handleClick = () => {
		chat.changeChannel(id)
	}
</script>

<li in:slide|local out:slide|local on:click={handleClick} class="channel">
	<button class="channel__button">
		<span class="channel__initials" aria-hidden="true">{getInitials(name)}</span>
		{name.length > 16 ? `${name.slice(0, 13)}...` : name}
	</button>
	{#if description}
		<div class="channel__description">
			<p class="channel__description-text">{description}</p>
		</div>
	{/if}
</li>

<style lang="scss">
	.channel {
		font-size: 0.85rem;
		cursor: pointer;

		@media screen and (min-width: 350px) {
			font-size: 1.125rem;
		}

		&__button {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			padding: 0;
			text-transform: uppercase;
		}

		&__initials {
			display: inline-grid;
			place-items: center;
			background-color: var(--primary-color);
			width: 2.625rem;
			height: 2.625rem;
			font-weight: 600;
			border-radius: 0.5rem;
			text-transform: uppercase;
		}

		&__description {
			max-height: 0;
			margin-left: 0.5rem;
			transition: max-height 0.75s;
			overflow-y: hidden;

			&-text {
				margin-top: 0;
				margin-bottom: 0;
				padding: 0.5rem 0.25rem;
				font-size: 0.9rem;
				border-bottom: 0.25rem solid var(--primary-color);
			}
		}

		@media (hover: hover) {
			&:hover .channel__description {
				max-height: 5rem;
			}
		}
	}
</style>
