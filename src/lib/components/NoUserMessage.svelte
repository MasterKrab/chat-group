<script lang="ts">
	import { blur } from 'svelte/transition'
</script>

<a in:blur href="/login" class="link">
	<span class="material-icons" aria-hidden="true">info</span>
	You must login to send messages.
</a>

<style lang="scss">
	.link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background-color: var(--quaternary-color);
		font-size: 1.125rem;
		margin-top: 1.25rem;
		padding: 1.6rem 1rem;
		border-radius: 0.5rem;
	}
</style>
