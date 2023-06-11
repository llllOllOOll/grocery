const kv = await Deno.openKv();

await kv.set(["posts"], "p2");
const res = await kv.get(["posts"]);

console.log(res);
