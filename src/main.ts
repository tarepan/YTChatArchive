const fs = require("fs");

import { getInitialContinuationID } from "./getChat/getInitialContID";
import { getChatCommentPartially } from "./getChat/getContinuousChat";
import { Comment } from "./domain";
import { ContinuationID } from "./YouTube/domain";

const textnize = (comment: Comment) => {
  const msg = comment.messages.reduce(
    (total, chunk) => (total + chunk.type === "text" ? chunk.content : "□"),
    ""
  );
  return `${comment.author.name}: ${msg}`;
};

/**
 * Get comments in YouTube Live archive
 * Comments from continuation ID are acquired recursively,
 * so using initial continuationID enable full comment aquisition.
 * Output is full-data ndjson & easy-read txt
 *
 * @param contID - YouTube Live comment (initial) continuation ID
 */
export async function getThenSaveComments(
  contID: ContinuationID,
  outDir: string
): Promise<void> {
  // get
  const [comments, nextContID] = await getChatCommentPartially(contID);

  // save
  fs.appendFileSync(`${outDir}/o.ndjson`, JSON.stringify(comments) + "\n");
  fs.appendFileSync(
    `${outDir}/o.txt`,
    comments.map(textnize).reduce((total, c) => total + c + "\n", "")
  );

  // Exit | Recursive Acuisition
  if (nextContID) {
    // throttling
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // resursive comment acquisition
    await getThenSaveComments(nextContID, outDir);
  }
}

if (require.main === module) {
  const videoID = "Yh88B1zLl5c";
  (async () => {
    const initialContID = await getInitialContinuationID(videoID);
    console.log(initialContID);
    await getThenSaveComments(initialContID, ".");
  })();
}
