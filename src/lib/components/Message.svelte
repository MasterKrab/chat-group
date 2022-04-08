<script lang="ts">
	import { blur } from 'svelte/transition'
	import type User from '$lib/types/user'
	import getAvatar from '$lib/utils/getAvatar'
	import TimeAgo from '$lib/components/TimeAgo.svelte'

	export let content: string
	export let created_at: string
	export let user: User
</script>

<li>
	<section in:blur={{ duration: 200 }} class="message">
		<header class="message__header">
			<h3 class="message__username">{user.username}</h3>
			<img
				class="message__avatar"
				src={getAvatar(user.username, user.avatar)}
				alt={user.username}
				loading="lazy"
			/>
			<TimeAgo date={created_at} />
		</header>
		<p class="message__content">{content}</p>
	</section>
</li>

<style lang="scss">
	.message {
		position: relative;
		padding-left: 3.795rem;

		&__header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.875rem;
			color: var(--primary-color-light);
		}

		&__username {
			margin-top: 0;
			margin-bottom: 0;
			font-size: 1.125rem;
		}

		&__avatar {
			position: absolute;
			top: 0;
			left: 0;
			width: 2.625rem;
			height: 2.625rem;
			border-radius: 0.5rem;
		}

		&__content {
			margin-bottom: 0;
		}
	}
</style>
