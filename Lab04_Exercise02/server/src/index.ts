import { createServer, type ServerResponse } from "node:http";

const channels = ["nasa", "esports-tribunal", "notNasa"] as const;

type Channel = (typeof channels)[number];

interface ForumMessage {
  id: number;
  author: string;
  text: string;
}

const messages: Record<Channel, ForumMessage[]> = {
  nasa: [
    {
      id: 1,
      author: "NASA Admin",
      text: "Welcome to the NASA discussion channel.",
    },
    {
      id: 2,
      author: "Astronaut",
      text: "The space mission is progressing successfully.",
    },
  ],

  "esports-tribunal": [
    {
      id: 3,
      author: "Tournament Admin",
      text: "Welcome to the Esports Tribunal.",
    },
    {
      id: 4,
      author: "Player",
      text: "The tournament results are under review.",
    },
  ],

  notNasa: [
    {
      id: 5,
      author: "Community Admin",
      text: "This is the Not NASA channel.",
    },
    {
      id: 6,
      author: "Member",
      text: "Let's discuss technology and gaming.",
    },
  ],
};

function sendJSON(
  res: ServerResponse,
  status: number,
  data: unknown
) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });

  res.end(JSON.stringify(data));
}

function isChannel(value: string | null): value is Channel {
  return (
    value !== null &&
    (channels as readonly string[]).includes(value)
  );
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (url.pathname !== "/api/messages") {
    sendJSON(res, 404, {
      error: "Endpoint not found",
    });
    return;
  }

  if (req.method !== "GET") {
    sendJSON(res, 405, {
      error: "Method not allowed",
    });
    return;
  }

  const channel = url.searchParams.get("channel");

  if (!isChannel(channel)) {
    console.error("[API] Invalid channel:", channel);

    sendJSON(res, 400, {
      error: "Invalid channel",
    });

    return;
  }

  // Development-only error simulation.
  if (url.searchParams.get("fail") === "1") {
    console.error("[API] Simulated server error");

    sendJSON(res, 500, {
      error: "Simulated internal server error",
    });

    return;
  }

  console.log(`[API] Fetching messages for ${channel}`);

  // Simulate network latency for cancellation testing.
  setTimeout(() => {
    if (res.destroyed) return;

    sendJSON(res, 200, {
      channel,
      messages: messages[channel],
    });
  }, 1200);
});

server.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});