import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route('/chat', 'routes/chat.tsx'),
  route("/api/auth/*", "routes/api.auth.ts"),
  route("/ai", "routes/ai.tsx"),
] satisfies RouteConfig;
