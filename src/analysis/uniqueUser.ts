import fs from "fs";
import ndjson from "ndjson";

import { Comment } from "../domain";
import { countCommentByUsers } from "./countCommentByUser";

export function statUniqueUsers(
  commentPath: string,
  streamerName: string,
  videoID: string
): void {
  const comments: Comment[] = [];

  fs.createReadStream(commentPath)
    .pipe(ndjson.parse())
    .on("data", (obj: Comment[]) => {
      comments.push(...obj);
    })
    .on("end", () => {
      const commenters = countCommentByUsers(comments);
      commenters.sort(
        (commenterA, commenterB) => commenterB.count - commenterA.count
      );

      // output
      console.log(
        `${commentPath} #comment: ${comments.length} #Commenters: ${commenters.length}`
      );
      fs.writeFileSync(
        `./output/uniqueUser_${streamerName}_${videoID}.json`,
        JSON.stringify(commenters, undefined, 2)
      );
    });
}

if (require.main === module) {
  const streamerName = "Uge";
  const videoID = "5XmPcdl6biI";
  statUniqueUsers(
    `./output/${streamerName}_${videoID}.ndjson`,
    streamerName,
    videoID
  );
}
