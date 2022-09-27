# Cloudflare Queues Demo

This is a demo of [Cloudflare Queues](https://blog.cloudflare.com/introducing-cloudflare-queues) which can run on your local machine.

Cloudflare Queues allows you to send and receive messages with guaranteed delivery. It integrates with [Cloudflare Workers](https://developers.cloudflare.com/workers) and offers at-least once delivery, message batching, and does not charge for egress bandwidth.

## Get started

First, install the dependencies using `npm`. This includes a custom release of [`wrangler`](https://github.com/cloudflare/wrangler2) which contains the preview for Queues. Then, run the `start` command which will spin up a development server on `localhost:8787`.

```bash
npm install
npm run start
```

You can send requests to the server which will forward them to a Queue.

```
curl http://localhost:8787/hello-world
curl http://localhost:8787/ -d "this is a message"
```

If you want to test a batch of messages, you can also run the `load` command:

```
npm run load
```

## Learn more

- [Cloudflare Queues blog post](https://blog.cloudflare.com/introducing-cloudflare-queues)
- [Cloudflare Queues documentation](https://developers.cloudflare.com/queues)
- [Sign up for the Private Beta](https://cloudflare.com/lp/queues)
  - So you can deploy to Cloudflare's network, instead of just your local machine!
