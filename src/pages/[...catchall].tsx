import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CatchAllRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}
