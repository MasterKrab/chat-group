<script lang="ts">
	import { onMount } from 'svelte'
	import '@q42/floating-focus-a11y/dist/unstyled/index.css'
	import '$lib/styles/floating-focus.scss'

	onMount(async () => {
		const { default: FloatingFocus } = await import('@q42/floating-focus-a11y/dist/unstyled')
		new FloatingFocus()
	})
</script>
