<script lang="ts">
	import { blur } from 'svelte/transition'
	import user from '$lib/stores/user'
	import type User from '$lib/types/user'
	import getAvatar from '$lib/utils/getAvatar'
	import Alert from '$lib/components/Alert.svelte'
	import PasswordValidator from '$lib/components/PasswordValidator.svelte'
	import axios from 'axios'
	import getIsError from '$lib/utils/getIsError'
	import getRequestConfig from '$lib/utils/getRequestConfig'
	import toFormData from '$lib/utils/toFormData'

	let username = ''
	let currentPassword = ''
	let currentPasswordError = ''
	let password = ''
	let isPasswordSecure = false

	let error = ''

	let files: FileList

	let avatar: File | null

	$: if (files) avatar = files[0]

	interface Data {
		username?: string
		current_password?: string
		password?: string
		avatar?: Blob
	}

	const handleSubmit = () => {
		if (password) {
			if (!isPasswordSecure) return (error = 'Password is not secure enough')
			if (!currentPassword.trim())
				return (currentPasswordError = 'Current password is required to change password')
		}

		if (!username.trim() && !password.trim() && !avatar) return (error = 'Please make some changes')

		error = ''
		currentPasswordError = ''

		const data: Data = {
			username,
			current_password: currentPassword,
			password
		}

		if (avatar) data.avatar = new Blob([avatar], { type: avatar.type })

		axios
			.put<User>(`${import.meta.env.VITE_API_URL}/user`, toFormData(data), getRequestConfig())
			.then(({ data }) => {
				username = ''
				currentPassword = ''
				password = ''
				avatar = null
				user.updateUser(data)
			})
			.catch((responseError: Error) => {
				if (getIsError(responseError)) error = responseError.response.data.detail
			})
	}
</script>

<Alert text={error} />

<a in:blur={{ duration: 200 }} class="link" href="/profile">
	<span class="material-icons"> chevron_left </span>
	Back
</a>

<form in:blur={{ duration: 200 }} on:submit|preventDefault={handleSubmit} class="form">
	<div>
		<h1 class="title">Change info</h1>
		<p class="form__text">Changes will be reflected to every services</p>
	</div>

	<input
		bind:files
		class="visually-hidden"
		type="file"
		name="avatar"
		id="avatar"
		accept=".jpg, .jpeg, .png, .webp, .gif"
	/>

	<label class="avatar" for="avatar">
		<div class="avatar__image-container" class:avatar__image-container--selected={!!avatar}>
			<img
				class="avatar__image"
				src={avatar
					? URL.createObjectURL(avatar)
					: getAvatar($user.data.username, $user.data.avatar)}
				alt={$user.data.username}
			/>
		</div>

		<span class="avatar__text">Change photo</span>
	</label>

	<div>
		<label class="form__label" for="username">Username</label>
		<input
			bind:value={username}
			class="form__input"
			type="text"
			name="username"
			id="username"
			autocomplete="username"
			placeholder="Enter your username..."
			maxlength={15}
		/>
	</div>

	<div>
		<label class="form__label" for="current-password">Current Password</label>
		<input
			bind:value={currentPassword}
			class="form__input"
			type="password"
			name="current-password"
			id="current-password"
			autocomplete="current-password"
			placeholder="Enter your current password..."
		/>

		{#if currentPasswordError}
			<p class="form__error" role="alert">{currentPasswordError}</p>
		{/if}
	</div>

	<div>
		<label class="form__label" for="password">Password</label>
		<input
			bind:value={password}
			class="form__input"
			type="password"
			name="password"
			id="password"
			autocomplete="new-password"
			placeholder="Enter your new password..."
		/>

		{#if password}
			<PasswordValidator {password} bind:isSecure={isPasswordSecure} />
		{/if}
	</div>

	<button class="form__submit" type="submit">Save</button>
</form>

<style lang="scss">
	.link {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 1.125rem;
		color: var(--active-color);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
		padding: 1rem 2rem;
		border: 1px solid var(--quaternary-color);
		border-radius: 0.5rem;

		@media screen and (min-width: 500px) {
			padding: 1.929rem 3.04rem;
		}

		&__text {
			color: var(--quartenary-color-light);
		}

		&__label {
			font-size: 1.125rem;
		}

		&__input {
			display: block;
			background-color: transparent;
			width: 100%;
			height: 3.25rem;
			padding: 1rem;
			margin-top: 0.5rem;
			color: var(--tertiary-color);
			border: 2px solid var(--quartenary-color-light);
			border-radius: 0.5rem;
		}

		&__error {
			margin-top: 0.5rem;
			margin-bottom: 0;
			color: var(--danger-color);
		}

		&__submit {
			background-color: var(--active-color);
			width: 5.125rem;
			height: 2.375rem;
			border-radius: 0.5rem;
		}
	}

	.title {
		font-size: 1.5rem;
	}

	.avatar {
		display: flex;
		align-items: center;
		gap: 1.719rem;
		margin-bottom: 0.543rem;
		cursor: pointer;

		@media screen and (max-width: 500px) {
			flex-direction: column;
			justify-content: center;
		}

		&__image {
			width: 4.5rem;
			height: 4.5rem;
			border-radius: 0.5rem;

			&-container {
				position: relative;

				&::before {
					content: '\e412';
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					font-family: 'Material Icons';
					font-size: 1.75rem;
					transition: opacity 0.2s ease-in-out;
				}

				&--selected::before {
					opacity: 0;
				}
			}
		}

		&__text {
			text-transform: uppercase;
			color: var(--quartenary-color-light);
		}
	}
</style>
