<script>
    import Shard from './Shard.svelte';
    import { fade } from 'svelte/transition';
    const SHARD_STATUSES = {
        READY: 'This shard is fully operational.',
        UNINITIALIZED: 'This shard hasn\'t attempted to connect yet, because it\'s cluster is waiting for another cluster to start first.',
        CONNECTING: 'This shard is about to connect to the gateway.',
        CONNECTED: 'This shard is connected to the gateway, but it hasn\'t identified nor resumed yet.',
        RESUMING: 'This shard is resuming a previous session.',
        GUILD_CREATE: 'This shard has successfully identified and has now started receiving guilds.',
        DISCONNECTED: 'This shard was previously connected, but it\'s now disconnected (invalid session, missing heartbeat) ',
    };

    let currentTitle = 'Legend';
    let selectedStatus = 'Click on a state in the legend below to get a detailed description.';

    function setTitle(title) {
        currentTitle = null;
        setTimeout(() => { currentTitle = title; }, 125);
    }
    function setSelectedStatus(status) {
        if (status) {
            setTitle(status);
            selectedStatus = SHARD_STATUSES[status];
        } else {
            setTitle('Legend');
            selectedStatus = null;
        }
    }
</script>

<div class="sidebar">
    {#if currentTitle}
        <div class="sidebar-title" transition:fade={{ duration: 125 }}>
            {currentTitle}
        </div>
    {/if}

    <div class="shard-examples">
        <div class="shard-example dummy">
            <div class="shard-status">
                {#if currentTitle}
                    <div transition:fade={{ duration: 125 }}>
                        {selectedStatus}
                    </div>
                {/if}
            </div>
            <div class="shard">
                <Shard id="" status="" margin={false} />
            </div>
        </div>

        {#each Object.keys(SHARD_STATUSES) as shardStatus}
            <div class="shard-example" on:click={() => setSelectedStatus(shardStatus)}>
                <div class="shard-status">
                    <div>
                        {shardStatus}
                    </div>
                </div>
                <div class="shard">
                    <Shard id="" status={shardStatus} margin={false} />
                </div>
            </div>
        {/each}
    </div>
</div>

<style type="text/scss">
    .sidebar {
        background: #1a1c1f;
        border-radius: 2px;
        width: 82.5%;

        &-title {
            color: #fff;
            padding: 30px 0;
            font-size: 2vw;
            font-weight: 550;
            text-align: center;
            background: #101113;
        }

        .shard-examples {
            color: #fff;
            font-size: 1.4vw;
            font-weight: 450;

            .shard-example {
                cursor: pointer;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                text-align: center;

                .shard-status {
                    flex: 1 0;
                }

                .shard {
                    flex: 0 0 26%;
                    margin-right: 8px;
                }

                &.dummy {
                    cursor: unset;
                    position: relative;
                    padding-bottom: 30px;
                    background: #101113;

                    .shard-status {
                        position: absolute;
                        font-weight: 400;
                        font-size: 1vw;
                        width: 100%;
                        height: 100%;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 10px;
                    }
                }
            }
        }
    }
</style>
