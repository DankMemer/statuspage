import { writable } from 'svelte/store';
import { io } from 'socket.io-client';
export const shards = writable([]);

const client = io(process.env.APP_API_URL);

fetch(`${process.env.APP_API_URL}/shards`)
    .then(r => r.json())
    .then(data => {
        shards.update(() => data);
    });

client.on('shardStatus', ({ id, state }) => {
    shards.update(shards => shards.map(shard =>
        shard.id === id
            ? { id, state }
            : shard
    ));
});