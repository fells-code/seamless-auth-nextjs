import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type User = {
  id: string;
  email: string;
  phone: string;
  roles?: string[];
};

export interface AuthContextType {
  user: User | null;
  logout: () => void;
  deleteUser: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user", { credentials: "include" });
      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch {
      console.error("Error during logout");
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        throw new Error("Could not delete user.");
      }
    } catch (error) {
      console.error("Something went wrong deleting user:", error);
      throw new Error("Could not delete user.");
    }
  };

  const hasRole = (role: string) => user?.roles?.includes(role);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        deleteUser,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
