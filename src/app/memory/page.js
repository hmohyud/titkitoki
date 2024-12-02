"use client";
import NavBar from "@/components/design/NavBar";
import VideoScroller from "../../components/video/VideoScroller";
import ScoreBox from "@/components/game/ScoreBox";
import GameLogicWrapper from "@/components/game/logic/GameLogicWrapper";
import { GameProvider } from "@/components/game/logic/GameProvider";

export default function Home() {
  return (
    <GameProvider>
      <GameLogicWrapper>
        <div className="w-screen h-screen fixed top-0">
          <div className="w-screen h-screen grid grid-cols-6">
            <div className="h-full col-span-1">
              <NavBar />
            </div>
            <div className="h-full col-span-5"></div>
          </div>
        </div>

        <main className="w-screen h-screen ">
          {/* SocreBoard */}

          <div className="w-screen h-screen grid grid-cols-6">
            <div className="h-full col-span-1"></div>
            <div className="h-full col-span-5">
              <VideoScroller />
            </div>
          </div>
        </main>
      </GameLogicWrapper>
    </GameProvider>
  );
}
