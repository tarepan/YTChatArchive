import fs from "fs";
import { getAllComments } from "./main";
import { statUniqueUsers } from "./analysis/uniqueUser";

export type YTVideo = {
  channelID: string;
  videoID: string;
  title: string;
  publishedDate: string;
};

async function* getCommentsInChannelGenerator() {
  const pathVideoList = `./UgeVideoList.json`;
  const videos: YTVideo[] = JSON.parse(fs.readFileSync(pathVideoList, "utf-8"));
  for (const video of videos) {
    yield await getAllComments(video.videoID, "Uge")
      .then(() => ["Uge", video.videoID] as [string, string])
      .catch(() => [undefined, video.videoID] as [undefined, string]);
  }
}

(async () => {
  for await (const [streamerName, videoID] of getCommentsInChannelGenerator()) {
    if (streamerName) {
      statUniqueUsers(
        `./output/${streamerName}_${videoID}.ndjson`,
        streamerName,
        videoID
      );
    } else {
      console.log(`no getAllComments: ${videoID}`);
    }
  }
})();
