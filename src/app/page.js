"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent the default behavior (video pause/stop)
        router.push("/memory"); // Redirect to the `/memory` URL
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="w-screen h-screen bg-black">
      <main className="w-screen h-screen flex items-center justify-center">
        <iframe
          src="https://www.youtube.com/embed/JKzpwTs0w1o?autoplay=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </main>

      <h1 className="fixed bottom-10 left-1/2 -translate-x-1/2 text-3xl text-white mix-blend-exclusion">
        To Skip Press SPACE
      </h1>
    </div>
  );
}
