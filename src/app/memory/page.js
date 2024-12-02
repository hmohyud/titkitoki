import VideoScroller from "../../components/video/VideoScroller";
import ScoreBox from "@/components/game/ScoreBox";
import GameLogicWrapper from "@/components/game/logic/GameLogicWrapper";
import { GameProvider } from "@/components/game/logic/GameProvider";

export default function Home() {
  return (
    <GameProvider>
      <GameLogicWrapper>
        <main className="w-screen h-screen ">
          {/* SocreBoard */}
          <div className="fixed top-0 right-4">
            <ScoreBox initialScore={10000} />
          </div>
          <div className="w-screen h-screen grid grid-cols-6">
            <div className="h-full col-span-1">NAVBAR</div>
            <div className="h-full col-span-5">
              <VideoScroller />
            </div>
          </div>
        </main>
      </GameLogicWrapper>
    </GameProvider>
  );
}
