<script lang="ts">
	import { blur } from 'svelte/transition'
	import user from '$lib/stores/user'
	import UserTooltip from '$lib/components/UserTooltip.svelte'
	import getAvatar from '$lib/utils/getAvatar'
</script>

<section class="user" aria-label="User">
	{#if $user.data}
		<img
			in:blur
			class="user__avatar"
			src={getAvatar($user.data.username, $user.data.avatar)}
			alt={$user.data.username}
		/>
		<p in:blur class="user__username" class:user__username--big={$user.data.username.length > 13}>
			{$user.data.username}
		</p>
		<UserTooltip />
	{:else if !$user.isLoading}
		<a in:blur class="login" href="/register">
			<span class="material-icons login__icon" aria-hidden="true">account_circle</span>
			Create an account
		</a>
	{/if}
</section>

<style lang="scss">
	.user {
		position: relative;
		display: flex;
		justify-items: space-evenly;
		align-items: center;
		background-color: var(--secondary-color-dark);
		height: 4.714rem;
		padding: 0.938rem 1.739rem;

		&__avatar {
			width: 2.625rem;
			height: 2.625rem;
			border-radius: 0.5rem;
		}

		&__username {
			font-size: 1.125rem;
			font-weight: 700;
			margin-left: 1.75rem;
			color: var(--quartenary-color-light);

			&--big {
				margin-left: 1.25rem;
			}
		}
	}

	.login {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.125rem;
		margin-left: auto;
		margin-right: auto;
		text-transform: uppercase;

		&__icon {
			font-size: 1.75rem;
		}
	}
</style>
