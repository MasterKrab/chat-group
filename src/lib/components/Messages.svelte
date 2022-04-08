<script lang="ts">
	import { afterUpdate } from 'svelte'
	import chat from '$lib/stores/chat'
	import scrollToBottom from '$lib/utils/scrollToBottom'
	import WelcomeMessage from '$lib/components/WelcomeMessage.svelte'
	import getAreDifferentDays from '$lib/utils/getAreDifferentDays'
	import DaySeparator from '$lib/components/DaySeparator.svelte'
	import Message from '$lib/components/Message.svelte'
	let list: HTMLUListElement
	afterUpdate(() => scrollToBottom(list))
</script>

<ul bind:this={list} class="messages" tabindex={0}>
	{#each $chat.messages as message, index}
		{#if index === 0 || getAreDifferentDays($chat.messages[index - 1].created_at, message.created_at)}
			<DaySeparator date={message.created_at} />
		{/if}

		<Message {...message} />
	{:else}
		{#if !$chat.isLoading && $chat.name}
			<WelcomeMessage />
		{/if}
	{/each}
</ul>

<style lang="scss">
	.messages {
		display: flex;
		flex-direction: column;
		gap: 2.375rem;
		margin-bottom: 1rem;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 0.5rem;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--quaternary-color);
		}
	}
</style>
