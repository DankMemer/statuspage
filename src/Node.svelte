<script>
    import Cluster from './Cluster.svelte';
    import Range from './Range.svelte';

    export let name;
    export let id;
    export let clusters;
</script>

<div class="node">
    <div class="node-header">
        <div class="title-text">
            Node {id.toString().padStart(2, '0')}: {name}
        </div>
        <div class="sub-text">
            {clusters.length}/{clusters.length} clusters healthy<br />
            CR: <Range start={clusters[0].id} end={clusters[clusters.length - 1].id} /> |
            SR: <Range start={clusters[0].shards[0].id} end={clusters[clusters.length - 1].shards[clusters[clusters.length - 1].shards.length - 1].id} />
        </div>
    </div>
    <div class="node-clusters">
        {#each clusters as cluster}
            <Cluster {...cluster} />
        {/each}
    </div>
</div>

<style type="text/scss">
    .node {
        border-radius: 2px;
        color: white;
        background: #1a1c1f;
        margin-bottom: 50px;

        .node-header {
            border-radius: 2px 2px 0px 0px;
            background: #101113;
            padding: 30px;
            .title-text {
                font-size: 3rem;
                font-weight: 550;
            }
            .sub-text {
                color: #8f8f8f;
                font-size: 1.2em;
                padding: 4px;
            }
        }
    }
</style>
