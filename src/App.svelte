<script>
	import ModalLayer from './ModalLayer.svelte';
	import Node from './Node.svelte';
	import Legend from './Legend.svelte';
	import Logs from './Logs.svelte';

	import { nodes } from './store.js';
</script>

<main>
	<div class="logs child">
		<Logs />
	</div>
	<div class="nodes child">
		{#each $nodes as node}
			<Node {...node} id={node.id} />
		{/each}
	</div>
	<div class="legend child">
		<Legend />
	</div>
	<ModalLayer />
</main>

<style type="text/scss">
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		padding-top: 5vh;
		flex-direction: row nowrap;
		
		.logs, .legend, .nodes {
			overflow-y: scroll;
		}

		.logs, .legend {
			flex-basis: 20%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: flex-start;
		}

		.nodes {
			flex-basis: 60%;
		}
	}
</style>
