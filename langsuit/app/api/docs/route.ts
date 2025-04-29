import { createSwaggerSpec } from "next-swagger-doc";

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Langsuit API Documentation",
        version: "1.0.0",
        description: "API endpoints for Langsuit language learning platform",
      },
      tags: [
        {
          name: "Health",
          description: "API health check endpoint",
        },
      ],
      servers: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
  });

  return Response.json(spec);
}
