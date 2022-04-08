<script lang="ts">
	export let query: string

	let input: HTMLInputElement

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== '/' || document.activeElement === input) return

		e.preventDefault()
		input.focus()
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="search-box">
	<input
		bind:this={input}
		bind:value={query}
		class="search-box__input"
		type="search"
		placeholder="Search"
		aria-label="Search channels"
	/>
</div>

<style lang="scss">
	.search-box {
		position: relative;
		margin-bottom: 2.186rem;

		&::before {
			content: '\e8b6';
			font-family: 'Material Icons';
			font-size: 1.25rem;
			position: absolute;
			top: 50%;
			left: 0.781rem;
			transform: translateY(-50%);
		}

		&__input {
			background-color: var(--quaternary-color);
			width: 100%;
			height: 3rem;
			padding: 1rem 1rem 1rem 2.75rem;
			font-size: 1rem;
			color: var(--tertiary-color);
			border: none;
			border-radius: 0.5rem;
			transition: font-size 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

			&:placeholder-shown {
				font-size: 0.875rem;
			}

			&:focus {
				box-shadow: 0.1rem 0.1rem 0.5rem 0.05rem rgba(255, 255, 255, 0.375);
			}

			&::-webkit-search-cancel-button {
				position: absolute;
				right: 0;
				z-index: 10000;
				appearance: none;
				width: 0.75rem;
				height: 0.75rem;
				background-color: var(--tertiary-color);
				clip-path: polygon(
					20% 4%,
					5% 14%,
					35% 46%,
					1% 76%,
					16% 91%,
					50% 60%,
					81% 91%,
					96% 81%,
					61% 48%,
					90% 13%,
					76% 3%,
					49% 35%
				);
				margin-right: 1rem;
				cursor: pointer;
			}
		}
	}
</style>
