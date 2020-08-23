<script>
    import { selectedShard } from './store.js';

    export let id;
    export let status;
    export let margin;

    function setSelectedShard(id) {
        if (typeof id === 'number') {
            selectedShard.set(id);
        }
    }
</script>

<div
    class="shard"
    data-margin={margin}
    data-status={status}
    on:click={() => setSelectedShard(id)}
>
    <div>{id}</div>
</div>

<style lang="scss">
    $timing: 3s infinite cubic-bezier(.55,.1,.45,.9);

    @keyframes receivingGuilds {
        0% { background: #00CC9933; }
        50% { background: #00CC99EE; }
        100% { background: #00CC9933; }
    }

    @keyframes resuming {
        0% { background: #FEDC5655; }
        50% { background: #FEDC56CC; }
        100% { background: #FEDC5655; }
    }

    @keyframes connecting {
        0% { background: #0080FF33; }
        50% { background: #0080FFEE; }
        100% { background: #0080FF33; }
    }

    .shard {
        flex: 0 0 calc((100%/16) - 10px);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: 1.5rem;
        cursor: pointer;

        &:not([data-margin="false"]) {
            margin: 5px;
        }

        &[data-status="READY"] {
            background: #00cc99;
        }

        &[data-status="UNINITIALIZED"] {
            background: #8f8f8f;
        }

        &[data-status="GUILD_CREATE"] {
            animation: receivingGuilds $timing;
        }

        &[data-status="RESUMING"] {
            animation: resuming $timing;
        }

        &[data-status="READY"] {
            background: #00CC99;
        }

        &[data-status="DISCONNECTED"] {
            background: #C80032;
        }

        &[data-status="CONNECTED"] {
            background: #0080FF;
        }

        &[data-status="CONNECTING"] {
            animation: connecting $timing;
        }

        &::after {
            content: '';
            display: block;
            padding-bottom: 100%;
        }
    }
</style>
