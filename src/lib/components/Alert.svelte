<script lang="ts">
	export let text: string
</script>

{#if text}
	{#key text}
		<p class="alert" role="alert">
			<span class="material-icons">error</span>
			{text}
		</p>
	{/key}
{/if}

<style lang="scss">
	@keyframes show {
		0% {
			transform: translateX(150%);
		}
		20% {
			transform: translateX(0);
		}
		80% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(150%);
		}
	}

	.alert {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100000000;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		margin: 1rem;
		background-color: var(--danger-color);
		color: var(--tertiary-color);
		border-radius: 0.5rem;
		animation: show 3s ease forwards;
	}
</style>
