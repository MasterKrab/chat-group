<script lang="ts">
	import chat from '$lib/stores/chat'
	import getInitials from '$lib/utils/getInitials'
</script>

<li>
	<section class="message">
		<h3 class="message__title">
			This is the beggining of the channel <span class="message__bold">{$chat.name}</span>, be the
			first to say something!
		</h3>
		<p class="message__name">
			<span class="message__inititals" aria-hidden="true">{getInitials($chat.name)}</span>
			{$chat.name}
		</p>
	</section>
</li>

<style lang="scss">
	.message {
		&__title {
			font-size: 1.125rem;
			font-weight: normal;
		}

		&__bold {
			font-weight: bold;
		}

		&__name {
			display: flex;
			align-items: center;
			gap: 1rem;
			text-transform: uppercase;
		}

		&__inititals {
			display: inline-grid;
			place-items: center;
			background-color: var(--secondary-color);
			width: 3.5rem;
			height: 3.5rem;
			font-size: 1.5rem;
			border-radius: 0.5rem;
		}
	}
</style>
