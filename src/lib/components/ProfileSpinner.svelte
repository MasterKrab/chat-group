<script lang="ts">
	import { blur } from 'svelte/transition'
</script>

<p transition:blur class="text" role="alert">
	<span class="spinner" aria-hidden="true">
		<span class="spinner__square" />
		<span class="spinner__square spinner__square--2" />
		<span class="spinner__square spinner__square--3" />
		<span class="spinner__square spinner__square--4" />
	</span>

	<span class="text__span">Loading...</span>
</p>

<style lang="scss">
	$square-size: 5rem;

	@keyframes scale {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	.text {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		&__span {
			display: block;
			margin-top: 1rem;
			font-size: 1.5rem;
		}
	}

	.spinner {
		display: grid;
		grid-template-columns: repeat(2, $square-size);
		grid-template-rows: repeat(2, $square-size);
		gap: 1rem;

		&__square {
			animation: scale 0.5s infinite;
			background-color: var(--tertiary-color);

			&--2 {
				animation-delay: 0.2s;
			}

			&--3 {
				animation-delay: 0.4s;
			}

			&--4 {
				animation-delay: 0.6s;
			}
		}
	}
</style>
