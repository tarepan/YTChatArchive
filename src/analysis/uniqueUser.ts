import fs from "fs";
import ndjson from "ndjson";

import { Comment } from "../domain";
import { countCommentByUsers } from "./countCommentByUser";

export function statUniqueUsers(commentPath: string): void {
  const comments: Comment[] = [];

  fs.createReadStream(commentPath)
    .pipe(ndjson.parse())
    .on("data", (obj: Comment[]) => {
      comments.push(...obj);
    })
    .on("end", () => {
      const commenters = countCommentByUsers(comments);
      commenters.sort(
        (commenterA, commenterB) => commenterA.count - commenterB.count
      );

      // output
      console.log(
        `${commentPath} #comment: ${comments.length} #Commenters: ${commenters.length}`
      );
      // commenters.forEach((commenter) => console.log(`${commenter.identity.name}: ${commenter.count}`));
    });
}

if (require.main === module) {
  const streamerName = "Uge";
  const videoID = "Yh88B1zLl5c";
  statUniqueUsers(`./output/${streamerName}_${videoID}.ndjson`);
}
