<script lang="ts">
	import chat from '$lib/stores/chat'
	import Portal from 'svelte-portal'
	import Modal from '$lib/components/Modal.svelte'
	import Alert from '$lib/components/Alert.svelte'
	import axios from 'axios'
	import getRequestConfig from '$lib/utils/getRequestConfig'

	let openModal = false

	const handleToggle = () => (openModal = !openModal)

	let error = ''

	let name = ''
	let nameError = ''

	let description = ''

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault()

		error = ''

		nameError = name.trim() ? '' : 'Please provide a name'

		if (nameError) return

		const data = {
			name,
			description
		}

		axios
			.post(`${import.meta.env.VITE_API_URL}/channels`, data, getRequestConfig())
			.then(({ data }) => {
				chat.changeChannel(data.id)
				openModal = false
			})
			.catch(({ response }) => {
				error = response.data.detail
			})
	}
</script>

<button on:click={handleToggle} aria-label="Create channel">
	<span class="material-icons">add</span>
</button>

<Portal target="body">
	<Alert text={error} />

	<Modal bind:openModal>
		<form
			class="form"
			on:submit|preventDefault={handleSubmit}
			aria-labelledby="create-channel-form-label"
		>
			<h2 class="form__title" id="create-channel-form-label">New Channel</h2>

			<button on:click={handleToggle} type="button" class="form__close" aria-label="Close form">
				<span class="material-icons">close</span>
			</button>

			<input
				bind:value={name}
				class="form__input"
				type="text"
				aria-label="Channel Name"
				placeholder="Channel Name"
				name="name"
				aria-required="true"
				aria-invalid={!!nameError}
				maxlength={15}
			/>

			{#if nameError}
				<p class="form__error" role="alert">{nameError}</p>
			{/if}

			<textarea
				bind:value={description}
				class="form__textarea"
				aria-label="Channel Description"
				placeholder="Channel Description"
				name="description"
				maxlength={320}
			/>

			<button class="form__submit">Save</button>
		</form>
	</Modal>
</Portal>

<style lang="scss">
	.form {
		position: relative;
		background-color: var(--secondary-color);
		width: 90%;
		max-width: 41.001rem;
		padding: 2.152rem 2.768rem;
		border-radius: 0.5rem;

		&__title {
			margin-top: 0;
			margin-bottom: 1.648rem;
			font-size: 1.125rem;
			line-height: 1.533rem;
			text-transform: uppercase;
		}

		&__error {
			margin-top: 0.5rem;
			color: var(--danger-color);
		}

		&__input,
		&__textarea {
			background-color: var(--quaternary-color);
			display: block;
			width: 100%;
			padding: 0.719rem 0.978rem;
			color: var(--tertiary-color);
			border: none;
			border-radius: 0.5rem;
		}

		&__textarea {
			resize: none;
			height: 7.222rem;
			margin-top: 1.656rem;

			&::-webkit-scrollbar {
				width: 0.5rem;
			}

			&::-webkit-scrollbar-track {
				background-color: var(--quaternary-color);
			}

			&::-webkit-scrollbar-thumb {
				background-color: var(--primary-color);
			}
		}

		&__submit {
			display: block;
			background-color: var(--active-color);
			width: 6.193rem;
			height: 2.459rem;
			margin-top: 1.346rem;
			margin-left: auto;
			border-radius: 0.5rem;
		}

		&__close {
			position: absolute;
			top: 2.152rem;
			right: 2.768rem;
			padding: 0;
		}
	}
</style>
