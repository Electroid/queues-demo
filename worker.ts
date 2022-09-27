export default {
  // Invoked when the Worker receives a HTTP request.
  async fetch(request: Request, env: Environment): Promise<Response> {
    const url = new URL(request.url);

    // Extract the message from the request body or url path.
    let message = await request.text();
    if (!message) {
      message = url.pathname.substring(1);
    }

    // Send the message to the queue.
    // When the promise resolves, it has been confirmed to disk.
    await env.QUEUE.send(message);

    // Echo back the message.
    return new Response(message + " ");
  },

  // Invoked when the Worker receives a batch of messages.
  async queue(batch: MessageBatch<string>, env: Environment) {
    // Extract the body from each message.
    // Metadata is also available, such as a message id and timestamp.
    const messages: string[] = batch.messages.map((msg) => msg.body);

    await runTask(messages);
  },
};

// Replace this function with your own code!
//
// You can run tasks and batch jobs, such as:
// - Invoking a webhook
// - Storing data in a R2 bucket
// - Sending telemetry data to a provider.
async function runTask(messages: string[]) {
  console.log("Received a batch of", messages.length, "messages:", messages);

  // If the task fails, the batch will be retried.
  // You can configure the max_retries in the `wrangler.toml`.
  await new Promise((resolve) => setTimeout(resolve, 3000, []));
  if (Math.random() < 0.25) {
    throw "Oh no, the task failed!";
  }
}

type Environment = {
  readonly QUEUE: Queue<string>;
};
