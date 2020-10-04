<script>
    import { selectedShard, shards } from './store.js';
</script>

<div class="sidebar">
    <div class="sidebar-title">
        Logs
    </div>

    {#if typeof $selectedShard === 'number'}
        {#each shards.get($selectedShard).logs as log}
            <div class="log">
                <span class="time">{log.time}</span>: <span class="status-name" data-status={log.status}>{log.status}</span>
            </div>
        {/each}
    {:else}
        <div class="default-text">
            Click on a shard in the node list to see it's logs.
        </div>
    {/if}
</div>

<style type="text/scss">
    $timing: 3s infinite cubic-bezier(.55,.1,.45,.9);

    .sidebar {
        @keyframes receivingGuilds {
            0% { color: #00CC9977; }
            50% { color: #00CC99FF; }
            100% { color: #00CC9977; }
        }

        @keyframes resuming {
            0% { color: #FEDC5677; }
            50% { color: #FEDC56FF; }
            100% { color: #FEDC5677; }
        }

        @keyframes connecting {
            0% { color: #0080FF77; }
            50% { color: #0080FFFF; }
            100% { color: #0080FF77; }
        }

        background: #1a1c1f;
        border-radius: 2px;
        width: 82.5%;

        &-title {
            color: #fff;
            padding: 30px 0;
            font-size: 2.75rem;
            font-weight: 550;
            text-align: center;
            background: #101113;
        }

        .default-text {
            color: #fff;
            font-size: 1.4rem;
            padding: 5px 10px;
        }

        .log {
            color: white;
            font-size: 0.8vw;
        }

        .time {
            font-family: monospace;
        }

        .status-name {
            color: white;
            background: #1a1c1f !important;

            &[data-status="READY"] {
                color: #00cc99;
            }

            &[data-status="UNINITIALIZED"] {
                color: #8f8f8f;
            }

            &[data-status="GUILD_CREATE"] {
                animation: receivingGuilds $timing;
            }

            &[data-status="RESUMING"] {
                animation: resuming $timing;
            }

            &[data-status="READY"] {
                color: #00CC99;
            }

            &[data-status="DISCONNECTED"] {
                color: #C80032;
            }

            &[data-status="CONNECTED"] {
                color: #0080FF;
            }

            &[data-status="CONNECTING"] {
                animation: connecting $timing;
            }
        }
    }
</style>
