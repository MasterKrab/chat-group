<script lang="ts">
	import { goto } from '$app/navigation'
	import { setToken } from '$lib/utils/token'
	import axios from 'axios'
	import getIsError from '$lib/utils/getIsError'
	import type Token from '$lib/types/token'
	import Form from '$lib/components/Form.svelte'
	import Alert from '$lib/components/Alert.svelte'
	import FormError from '$lib/components/FormError.svelte'
	import FormLink from '$lib/components/FormLink.svelte'

	let username = ''
	let usernameError = ''

	let password = ''
	let passwordError = ''

	let isLoading = false
	let error = ''

	const handleSubmit = () => {
		usernameError = ''
		passwordError = ''

		if (!username.trim()) usernameError = 'Username is required'
		if (!password.trim()) passwordError = 'Password is required'

		if (usernameError || passwordError) return

		error = ''
		isLoading = true

		axios
			.post<Token>(`${import.meta.env.VITE_API_URL}/login`, {
				username,
				password
			})
			.then(({ data }) => {
				setToken(data.access_token)
				goto('/')
			})
			.catch((responseError: Error) => {
				if (getIsError(responseError)) error = responseError.response.data.detail
			})
			.finally(() => {
				isLoading = false
			})
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<Alert text={error} />

<Form on:submit={handleSubmit} disabled={isLoading}>
	<svelte:fragment slot="title">Welcome back!</svelte:fragment>

	<svelte:fragment slot="body">
		<div>
			<input
				bind:value={username}
				type="text"
				class="input"
				aria-label="Username"
				placeholder="Username"
				autocomplete="current-username"
				aria-required="true"
			/>

			{#if usernameError}
				<FormError>{usernameError}</FormError>
			{/if}
		</div>

		<div>
			<input
				bind:value={password}
				type="password"
				class="input"
				aria-label="Password"
				placeholder="Password"
				autocomplete="current-password"
				aria-required="true"
			/>

			{#if passwordError}
				<FormError>{passwordError}</FormError>
			{/if}
		</div>
	</svelte:fragment>

	<svelte:fragment slot="info"
		>Don't have an account? <FormLink href="/register">Register</FormLink></svelte:fragment
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
