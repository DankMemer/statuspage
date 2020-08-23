<script>
    import Range from './Range.svelte';
    import Shard from './Shard.svelte';

    export let id;
    export let shards;
</script>

<div class="cluster">
    <div class="cluster-id">
        <div>
            Cluster {id} (SR: <Range start={shards[0].id} end={shards[shards.length - 1].id} />)
        </div>
    </div>
    <div class="shards">
        {#each shards as shard}
            <Shard id={shard.id} status={shard.status} margin={true} />
        {/each}
    </div>
</div>

<style type="text/scss">
    .cluster {
        .cluster-id {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
        }
        .shards {
            padding: 5px;
            display: flex;
            flex-flow: row wrap;
        }
    }
</style>
