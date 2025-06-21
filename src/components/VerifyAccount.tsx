import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LoadingSpinner from "./LoadingSpinner";

export interface ResetPasswordProps {
  apiHost: string;
  setLoading(value: boolean): void;
  validateToken(): void;
}

const VerifyAccount: React.FC<ResetPasswordProps> = ({
  apiHost,
  validateToken,
}) => {
  const router = useRouter();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  useEffect(() => {
    const token = urlParams.get("token");

    const verify = async (verificationToken: string | null) => {
      try {
        const response = await fetch(`${apiHost}auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verificationToken }),
          credentials: "include",
        });

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const result = await response.json();

        localStorage.setItem("authToken", result.token);
        localStorage.setItem("refreshToken", result.refreshToken);
        validateToken();
        router.replace("/");
      } catch {
        router.replace("/login");
      }
    };

    if (token) {
      verify(token);
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoadingSpinner />
    </div>
  );
};

export default VerifyAccount;
