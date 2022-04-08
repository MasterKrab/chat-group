<script lang="ts">
	export let date: string
</script>

<li class="day-separator">
	<span class="day-separator__date">
		{new Date(date).toLocaleDateString('en', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})}
	</span>
</li>

<style lang="scss">
	.day-separator {
		position: relative;
		font-size: 0.75rem;
		font-weight: 600;
		text-align: center;
		color: var(--primary-color-light);

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			background-color: var(--primary-color-light);
			width: 100%;
			height: 1px;
			transform: translateY(-50%);
			z-index: 1;
		}

		&__date {
			position: relative;
			background-color: var(--primary-color);
			padding-left: 1.398rem;
			padding-right: 1.398rem;
			z-index: 10;
		}
	}
</style>
