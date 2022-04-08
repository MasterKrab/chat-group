<script lang="ts">
	import { blur } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'

	export let disabled = false

	const dispatch = createEventDispatcher()

	const handleSubmit = () => dispatch('submit')
</script>

<form on:submit|preventDefault={handleSubmit} in:blur={{ duration: 150 }} class="form">
	<h1 class="title">
		<span class="material-icons-outlined title__icon" aria-hidden="true">chat</span>
		<slot name="title" />
	</h1>

	<p class="form__text">Meet a lot of people on multiple channels or create your own channels.</p>

	<div class="form__body">
		<slot name="body" />
	</div>

	<button class="form__submit" {disabled} type="submit">Join</button>

	<p class="form__info">
		<slot name="info" />
	</p>
</form>

<style lang="scss">
	.form {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: var(--quaternary-color);
		padding: 2.5rem 2rem;
		width: 90%;
		max-width: 500px;
		color: var(--tertiary-color);
		border-radius: 1rem;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);

		@media screen and (min-width: 500px) {
			padding: 4rem 3rem;
		}

		&__text {
			margin-bottom: 2rem;
		}

		&__body {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin-top: 0.5rem;
			margin-bottom: 1rem;
		}

		&__submit {
			background-color: var(--active-color);
			padding: 0.5rem 1rem;
			width: 100%;
			border-radius: 0.5rem;
			color: var(--tertiary-color);
		}

		&__info {
			margin-top: 1.5rem;
			text-align: center;
		}
	}

	.title {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 0;
		font-size: 1.35rem;

		&__icon {
			font-size: 2.25rem;
		}
	}
</style>
