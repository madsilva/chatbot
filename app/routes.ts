import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/protected", 'routes/protected.tsx'),
  route("/api/auth/*", "routes/api.auth.ts"),
  route("contacts/:contactId", "routes/contact.tsx"),
] satisfies RouteConfig;
