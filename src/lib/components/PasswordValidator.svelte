<script lang="ts">
	import { onMount } from 'svelte'
	import { blur, slide } from 'svelte/transition'

	export let password = ''
	export let isSecure = false

	let zxcvbn: any

	let score = 0
	let warning = ''
	let suggestions = []

	onMount(async () => {
		zxcvbn = (await import('zxcvbn')).default
	})

	$: if (zxcvbn) {
		const { score: resultScore, feedback } = zxcvbn(password)

		score = resultScore
		isSecure = resultScore >= 3
		warning = feedback.warning
		suggestions = feedback.suggestions
	}
</script>

<div
	class="progress"
	style="--progress: {(score * 100) / 4}%"
	aria-label="Password security"
	role="progressbar"
	aria-valuenow={score}
	aria-valuemin={0}
	aria-valuemax={4}
/>

{#if warning || suggestions.length}
	<div transition:slide class="validator">
		{#if warning}
			<p role="alert" class="warning">
				<span class="material-icons warning__icon" aria-hidden="true">warning</span>
				{warning}
			</p>
		{/if}

		{#if suggestions.length}
			<ul transition:blur|local class="suggestions">
				{#each suggestions as suggestion}
					<li transition:slide|local role="alert" class="suggestions__item">
						{suggestion}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style lang="scss">
	.validator {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: var(--warning-color);
		margin-top: 0.75rem;
		padding: 0.75rem;
		font-weight: normal;
		border-radius: 0.5rem;
		color: var(--secondary-color-dark);
	}

	.progress {
		position: relative;
		background-color: var(--tertiary-color);
		width: 100%;
		height: 0.75rem;
		margin-top: 0.7rem;
		border-radius: 1rem;
		overflow-x: hidden;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			background-color: var(--danger-color);
			width: var(--progress);
			height: 100%;
			transition: width 0.5s ease-in-out;
		}

		&[aria-valuenow='2']::before {
			background-color: var(--warning-color);
		}

		&[aria-valuenow='3']::before {
			background-color: var(--active-color);
		}

		&[aria-valuenow='4']::before {
			background-color: var(--green-color);
		}
	}

	.warning {
		margin-top: 0;
		margin-bottom: 0;
	}

	.warning {
		font-size: 0.9rem;
		color: var(--danger-color);

		&__icon {
			font-size: 0.75rem;
		}
	}

	.suggestions {
		list-style: disc;

		&__item {
			font-size: 0.85rem;
			margin-left: 1rem;
		}
	}
</style>
