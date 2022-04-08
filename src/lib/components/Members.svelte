<script lang="ts">
	import { slide } from 'svelte/transition'
	import LoadingItem from '$lib/components/LoadingItem.svelte'
	import getAvatar from '$lib/utils/getAvatar'
	import axios from 'axios'

	const promise = axios.get(`${import.meta.env.VITE_API_URL}/users`)
</script>

<section class="section">
	<h2 class="title">Members</h2>

	<ul class="members">
		{#await promise}
			<LoadingItem />
		{:then { data }}
			{#each data as member}
				<li in:slide class="member">
					<img
						class="member__avatar"
						src={getAvatar(member.username, member.avatar)}
						alt={member.username}
						loading="lazy"
					/>
					<p class="member__username">{member.username}</p>
				</li>
			{/each}
		{/await}
	</ul>
</section>

<style lang="scss">
	.section {
		padding-top: 1.714rem;
	}

	.title {
		margin-top: 0;
		margin-bottom: 0;
		font-size: 1.125rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.members {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-top: 1.561rem;
	}

	.member {
		display: flex;
		align-items: center;
		gap: 1.75rem;

		&__avatar {
			width: 2.625rem;
			height: 2.625rem;
			border-radius: 0.5rem;
		}

		&__username {
			margin-top: 0;
			margin-bottom: 0;
			font-size: 1.125rem;
			font-weight: 700;
			color: var(--primary-color-light);
		}
	}
</style>
