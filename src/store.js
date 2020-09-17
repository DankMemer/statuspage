import { writable } from 'svelte/store';
export const nodes = writable([]);
export const shards = new Map();
export const selectedShard = writable(null);

fetch(`${env.APP_API_URL}/shards`)
    .then(r => r.json())
    .then(res => {
        nodes.set(res);
        for (const node of res) {
            for (const cluster of node.clusters) {
                for (const shard of cluster.shards) {
                    shards.set(shard.id, shard);
                }
            }
        }
    });

const socket = new WebSocket(`${env.APP_WS_URL}/socket`);
socket.onmessage = (event) => {
    const [ shardID, status ] = event.data.split(':');
    shards.get(Number(shardID)).status = status;
    nodes.update(n => n);
};
