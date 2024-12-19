import { createClient } from "redis";
const client = createClient();

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");
    while (true) {
      try {
        //keep waiting until something in queue
        const user = await client.brPop("user", 0);
        // @ts-ignore
        await processUser(user.element);
      } catch (error) {
        console.error("Error processing User:", error);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

async function processUser(user: string) {
  const { userId, name, email } = JSON.parse(user);
  console.log(`${userId}, ${name}, ${email}`);

  //do the work
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Finished Processing");
}

startWorker();
