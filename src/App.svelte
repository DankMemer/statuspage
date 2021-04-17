<script>
	import Shard from './Shard.svelte';
	import { shards } from './store.js';
</script>

<main>
	<div class="shards child">
		{#each $shards as shard}
			<Shard id={shard.id} status={shard.state} />
		{/each}
	</div>
</main>

<style type="text/scss">
	main {
		width: 100vw;
		height: 100vh;

		.shards {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
		}
	}
</style>
