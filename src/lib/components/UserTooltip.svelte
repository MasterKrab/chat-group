<script lang="ts">
	import { scale } from 'svelte/transition'
	import { removeToken } from '$lib/utils/token'
	import createHandleFocusLeaveElement from '$lib/utils/createHandleFocusLeaveElement'

	let openTooltip = false

	const handleToggle = () => (openTooltip = !openTooltip)
</script>

<button on:click={handleToggle} class="button" aria-checked={openTooltip} aria-label="User actions">
	<span class="material-icons">expand_more</span>
</button>

{#if openTooltip}
	<section
		on:focusout={createHandleFocusLeaveElement(handleToggle)}
		transition:scale|local
		class="tooltip"
		aria-label="User actions"
	>
		<button class="tooltip__button tooltip__button--logout" on:click={removeToken}>
			<span class="material-icons tooltip__icon" aria-hidden="true">exit_to_app</span>
			Logout
		</button>
		<a class="tooltip__button " href="/profile">
			<span class="material-icons tooltip__icon" aria-hidden="true">account_circle</span>
			My profile
		</a>
	</section>
{/if}

<style lang="scss">
	.button {
		padding: 0;
		margin-left: auto;
	}

	.tooltip {
		display: flex;
		flex-direction: column-reverse;
		position: absolute;
		bottom: 3.5rem;
		right: 1.196rem;
		background-color: var(--primary-color);
		padding: 0.941rem 0.75rem;
		border: 1px solid var(--quaternary-color);
		border-radius: 0.5rem;
		transform-origin: right bottom;

		&__button {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			background-color: var(--quaternary-color);
			padding: 0.703rem 1rem;
			width: 10.258rem;
			font-size: 0.75rem;
			border-radius: 0.5rem;

			&--logout {
				background-color: transparent;
				margin-top: 1rem;
				padding-top: 1rem;
				color: var(--danger-color);
				border-top: 1px solid var(--quaternary-color);
			}
		}

		&__icon {
			font-size: 1.25rem;
		}
	}
</style>
