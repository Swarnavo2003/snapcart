"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <h1>Welcome To Snapcart</h1>
    </div>
  );
}
