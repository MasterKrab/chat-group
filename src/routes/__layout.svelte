<script lang="ts">
	import { onMount } from 'svelte'
	import user from '$lib/stores/user'
	import Fonts from '$lib/components/Fonts.svelte'
	import FloatingFocus from '$lib/components/FloatingFocus.svelte'
	import '$lib/styles/normalize.css'
	import '@fontsource/noto-sans'
	import '$lib/styles/globals.scss'

	onMount(user.connect)
</script>

<Fonts />
<FloatingFocus />

<main class="main">
	<slot />
</main>
