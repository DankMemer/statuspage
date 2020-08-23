import { writable } from 'svelte/store';
import { urlencoded } from 'body-parser';
export const nodes = writable([]);
export const shards = new Map();
export const selectedShard = writable(null);

fetch('/shards')
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

const socketURL = new URL('/socket', location.href);
socketURL.protocol = socketURL.protocol
    .replace('http', 'ws')
    .replace('https', 'wss');

const socket = new WebSocket(socketURL.href);
socket.onmessage = (event) => {
    const [ shardID, status ] = event.data.split(':');
    shards.get(Number(shardID)).status = status;
    nodes.update(n => n);
};
