<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'
	import focusableElements from '$lib/utils/focusableElements'

	const dispatch = createEventDispatcher()

	export let openModal: boolean

	let parentNode: HTMLElement
	let firstFocus: HTMLElement
	let lastFocus: HTMLElement

	const closeModal = () => {
		openModal = false
		dispatch('close')
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Tab') {
			const focus = document.activeElement

			if (focus === firstFocus && e.shiftKey) {
				e.preventDefault()
				lastFocus.focus()
			} else if (focus === lastFocus && !e.shiftKey) {
				e.preventDefault()
				firstFocus.focus()
			}
		} else if (e.key === 'Escape') {
			closeModal()
		}
	}

	const handleClick = (e: Event) => {
		const target = e.target as HTMLElement

		if (target === parentNode) closeModal()
	}

	const onMount = () => {
		const focusableElementsInNode = parentNode.querySelectorAll(focusableElements)

		firstFocus = focusableElementsInNode[0] as HTMLElement

		lastFocus = focusableElementsInNode[focusableElementsInNode.length - 1] as HTMLElement

		firstFocus?.focus()
	}

	$: parentNode && onMount()
</script>

{#if openModal}
	<div
		class="modal"
		role="dialog"
		aria-modal="true"
		bind:this={parentNode}
		transition:fade={{ duration: 200 }}
		on:keydown={handleKeyDown}
		on:click={handleClick}
	>
		<slot />
	</div>
{/if}

<style>
	.modal {
		display: grid;
		place-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99999;
	}
</style>
