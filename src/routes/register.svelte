<script lang="ts">
	import { goto } from '$app/navigation'
	import { setToken } from '$lib/utils/token'
	import axios from 'axios'
	import type Token from '$lib/types/token'
	import Form from '$lib/components/Form.svelte'
	import PasswordField from '$lib/components/PasswordField.svelte'
	import Alert from '$lib/components/Alert.svelte'
	import FormError from '$lib/components/FormError.svelte'
	import FormLink from '$lib/components/FormLink.svelte'

	let username = ''
	let usernameError = ''

	let password = ''
	let isPasswordSecure: boolean

	let isLoading = false
	let error = ''

	const handleSubmit = () => {
		if (!username.trim()) return (usernameError = 'Username is required')

		if (!isPasswordSecure) return (error = 'Password is not secure enough')

		error = ''
		usernameError = ''
		isLoading = true

		axios
			.post<Token>(`${import.meta.env.VITE_API_URL}/register`, {
				username,
				password
			})
			.then(({ data }) => {
				setToken(data.access_token)
				goto('/')
			})
			.catch(({ response }) => {
				error = response.data.detail
			})
			.finally(() => {
				isLoading = false
			})
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<Alert text={error} />

<Form on:submit={handleSubmit} disabled={isLoading}>
	<svelte:fragment slot="title">Join to the chat!</svelte:fragment>

	<svelte:fragment slot="body">
		<div>
			<input
				bind:value={username}
				type="text"
				class="input"
				aria-label="Username"
				placeholder="Username"
				aria-required="true"
				maxlength={15}
			/>

			{#if usernameError}
				<FormError>{usernameError}</FormError>
			{/if}
		</div>

		<PasswordField bind:password bind:isSecure={isPasswordSecure} />
	</svelte:fragment>

	<svelte:fragment slot="info"
		>Already have an account? <FormLink href="/login">Login</FormLink></svelte:fragment
	>
</Form>

<style lang="scss">
	.input {
		background-color: transparent;
		padding: 0.75rem;
		width: 100%;
		color: var(--tertiary-color);
		border: 3px solid var(--tertiary-color);
		border-radius: 0.5rem;

		&::placeholder {
			color: var(--tertiary-color);
		}
	}
</style>
