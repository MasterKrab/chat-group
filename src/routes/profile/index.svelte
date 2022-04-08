<script lang="ts">
	import { blur } from 'svelte/transition'
	import user from '$lib/stores/user'
	import getAvatar from '$lib/utils/getAvatar'
	import axios from 'axios'
	import getRequestConfig from '$lib/utils/getRequestConfig'

	const handleDeleteAccount = () => {
		axios
			.delete<void>(`${import.meta.env.VITE_API_URL}/user`, getRequestConfig())
			.then(user.removeUser)
			.catch(console.error)
	}
</script>

<article in:blur={{ duration: 200 }}>
	<header>
		<h1 class="title">Personal Info</h1>
		<p>Basic info, like your name of photo</p>
	</header>
	<article class="profile">
		<header class="profile__header">
			<div>
				<h2 class="profile__title">Profile</h2>
				<p class="profile__text">Some info may be visible to other people</p>
			</div>

			<div class="profile__actions">
				<button on:click={handleDeleteAccount} class="profile__delete">Delete Account</button>
				<a class="profile__edit" href="/profile/edit">Edit</a>
			</div>
		</header>

		<ul class="list">
			<li class="list__item">
				<p class="list__key">Photo</p>
				<img
					class="list__value-image"
					src={getAvatar($user.data.username, $user.data.avatar)}
					alt={$user.data.username}
				/>
			</li>
			<li class="list__item">
				<p class="list__key">Username</p>
				<p class="list__value">{$user.data.username}</p>
			</li>
			<li class="list__item">
				<p class="list__key">Password</p>
				<p class="list__value">************</p>
			</li>
		</ul>
	</article>
</article>

<style lang="scss">
	.title {
		margin-top: 0;
	}

	.profile__header,
	.list__item {
		padding: 1rem 2rem;

		@media screen and (min-width: 768px) {
			padding: 1.77rem 3.081rem;
		}
	}

	.profile {
		border: 1px solid var(--quaternary-color);
		border-radius: 0.5rem;

		&__header {
			display: grid;
			grid-template-columns: 1fr;
			gap: 0.5rem;

			@media screen and (min-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		&__actions {
			display: flex;
			align-items: center;
			gap: 1rem;

			@media screen and (min-width: 768px) {
				justify-content: flex-end;
			}
		}

		&__title {
			margin-top: 0;
			margin-bottom: 0.25rem;
		}

		&__text {
			font-size: 0.813rem;
			color: var(--quartenary-color-light);
		}

		&__edit,
		&__delete {
			display: grid;
			place-items: center;
			width: 5.959rem;
			height: 2.375rem;
			border: 1px solid var(--tertiary-color);
			border-radius: 0.5rem;

			@media (hover: hover) {
				transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out,
					color 0.2s ease-in-out;

				&:hover {
					background-color: var(--tertiary-color);
					border-color: var(--primary-color);
					color: var(--primary-color);
				}
			}
		}

		&__delete {
			width: auto;
			padding-left: 1.5rem;
			padding-right: 1.5rem;
			border-color: var(--danger-color);
			color: var(--danger-color);

			@media (hover: hover) {
				&:hover {
					background-color: var(--danger-color);
					color: var(--tertiary-color);
				}
			}
		}
	}

	.list {
		&__item {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
			border-top: 1px solid var(--quaternary-color);

			@media screen and (min-width: 768px) {
				grid-template-columns: 17.517rem 1fr;
			}
		}

		&__key,
		&__value {
			margin-top: 0;
			margin-bottom: 0rem;
		}

		&__key {
			display: flex;
			align-items: center;
			font-size: 0.813rem;
			text-transform: uppercase;
			color: var(--primary-color-light);
		}

		&__value {
			font-size: 1.125rem;

			&-image {
				width: 4.5rem;
				height: 4.5rem;
				border-radius: 0.5rem;
			}
		}
	}
</style>
