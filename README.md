# @seamless-auth/nextjs

> A drop-in frontend authentication provider for Next.js powered by SeamlessAuth.

SeamlessAuth provides passwordless authentication, WebAuthn support, and Stripe-ready billing with minimal configuration. This package offers a fully featured React context and pre-built hooks for Next.js applications.

---

## 🚀 Quick Start

### 1. Install the Package

```bash
npm install @seamless-auth/nextjs
```

---

### 2. Wrap Your App with the Auth Provider

```tsx
// app/layout.tsx
import { AuthProvider } from "@seamless-auth/nextjs";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

✅ The `AuthProvider` automatically manages user sessions via HTTP-only cookies.

---

### 3. Use the Auth Hook

```tsx
import { useAuth } from "@seamless-auth/nextjs";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in to continue.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## ✅ Features

- 🔒 Secure session handling with HTTP-only cookies.
- 🔑 Built-in user management via React context.
- 🚪 Support for seamless login, logout, registration, and passkey workflows.
- 🖥️ Fully compatible with Next.js 14+ (App Router).
- 🎛️ Automatically connects to `@seamless-auth/server` API routes.

---

## ✅ Provided API via Context

```ts
const { user, isAuthenticated, logout, deleteUser, hasRole, apiHost, token } =
  useAuth();
```

### Available Context Properties

| Property          | Description                          |
| ----------------- | ------------------------------------ |
| `user`            | Current authenticated user object.   |
| `isAuthenticated` | Boolean indicating auth state.       |
| `logout`          | Logs the user out.                   |
| `deleteUser`      | Deletes the user account.            |
| `hasRole`         | Checks if the user has a given role. |
| `apiHost`         | Base URL for your auth server.       |
| `token`           | One-time token for secure requests.  |

---

## ✅ Example: Logout Button

```tsx
import { useAuth } from "@seamless-auth/nextjs";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
```

---

## ✅ Built-In API Routes (via @seamless-auth/server)

This package expects the following API routes to be provided via `@seamless-auth/server`:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/user`
- `PATCH /api/auth/user/update`
- `DELETE /api/auth/user/delete`
- `POST /api/auth/registration/register`
- `POST /api/auth/otp/*`
- `POST /api/auth/webauthn/*`

---

## ✅ Coming Soon

- User profile management components.

---

For server-side setup, see the `@seamless-auth/server` package.

