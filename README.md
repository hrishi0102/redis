# Redis Local Setup

---

## Starting Redis Locally

To start Redis locally, use the following Docker command:

```bash
docker run --name my-redis -d -p 6379:6379 redis
```

---

## Connecting to Your Container

Once the container is running, connect to it using:

```bash
docker ps
```

```bash
docker exec -it <container_id> /bin/bash
```

---

## Connecting to the Redis CLI

```bash
redis-cli
```
