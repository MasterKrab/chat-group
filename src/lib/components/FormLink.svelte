<script lang="ts">
	export let href: string
</script>

<a class="link" {href}>
	<slot />
</a>

<style lang="scss">
	.link {
		color: var(--active-color);
	}
</style>
