<script lang="ts">
	import { blur } from 'svelte/transition'
	import chat from '$lib/stores/chat'

	let content = ''
	let contentError = false

	let submit: HTMLButtonElement

	const handleSubmit = () => {
		$chat.sendMessage(content)
		content = ''
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Enter' || e.shiftKey) return

		contentError = !content.trim()

		e.preventDefault()
		submit!.click()
	}
</script>

<form on:submit|preventDefault={handleSubmit} in:blur class="form">
	<textarea
		bind:value={content}
		on:keydown={handleKeyDown}
		class="form__textarea"
		class:form__textarea--error={contentError}
		name="message"
		placeholder="Type a message here"
		spellcheck="true"
		aria-invalid={!!contentError}
		required
	/>
	<button bind:this={submit} class="form__button" disabled={!content.trim() || $chat.isLoading}>
		<span class="material-icons">send</span>
	</button>
</form>

<style lang="scss">
	.form {
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: var(--quaternary-color);
		margin-top: 0.75rem;
		padding: 0.396rem 0.588rem;
		border: 2px solid var(--quaternary-color);
		border-radius: 0.75rem;

		&__textarea {
			background-color: transparent;
			padding: 0.5rem 0.498rem;
			width: 100%;
			height: 100%;
			color: var(--tertiary-color);
			border: none;
			border-bottom: 2px solid transparent;
			resize: none;
			overflow-y: hidden;

			&--error {
				border-color: var(--danger-color);
			}
		}

		&__button {
			display: grid;
			place-items: center;
			background-color: var(--active-color);
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 0.5rem;
			transition: opacity 0.2s ease-in-out;

			&:disabled {
				opacity: 0.75;
				cursor: not-allowed;
			}
		}
	}
</style>
