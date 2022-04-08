<script lang="ts">
	import PasswordValidator from '$lib/components/PasswordValidator.svelte'

	export let password = ''
	export let isSecure = false
</script>

<div class="password">
	<input
		bind:value={password}
		type="password"
		class="password__input"
		aria-label="Password"
		placeholder="Password"
		autocomplete="new-password"
		aria-invalid={!isSecure}
		aria-required="true"
	/>

	<PasswordValidator {password} bind:isSecure />
</div>

<style lang="scss">
	.password {
		display: flex;
		flex-direction: column;
		font-weight: bold;
		color: var(--secondary-color-dark);
		border-radius: 0.5rem;

		&__input {
			background-color: var(--quaternary-color);
			padding: 0.75rem;
			color: var(--tertiary-color);
			border: 3px solid var(--tertiary-color);
			border-radius: 0.5rem;

			&::placeholder {
				color: var(--tertiary-color);
			}
		}
	}
</style>
