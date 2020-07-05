const fs = require("fs");

import { getInitialContinuationID } from "./getChat/getInitialContID";
import { getChatCommentPartially } from "./getChat/getContinuousChat";
import { Comment } from "./domain";
import { ContinuationID } from "./YouTube/domain";
import { statUniqueUsers } from "./analysis/uniqueUser";

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
 * Output is full-data `${outPath}.ndjson` & easy-read `${outPath}.txt`
 *
 * @param contID - YouTube Live comment (initial) continuation ID
 * @param outPath - Output path without file extension
 */
export async function getThenSaveComments(
  contID: ContinuationID,
  outPath: string
): Promise<void> {
  // get
  const [comments, nextContID] = await getChatCommentPartially(contID);

  // save
  fs.appendFileSync(`${outPath}.ndjson`, JSON.stringify(comments) + "\n");
  fs.appendFileSync(
    `${outPath}.txt`,
    comments.map(textnize).reduce((total, c) => total + c + "\n", "")
  );

  // Exit | Recursive Acuisition
  if (nextContID) {
    // throttling
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // resursive comment acquisition
    await getThenSaveComments(nextContID, outPath);
  }
}

if (require.main === module) {
  const streamerName = "Uge";
  const videoID = "Yh88B1zLl5c";
  (async () => {
    const initialContID = await getInitialContinuationID(videoID);

    // reset files
    fs.writeFileSync(`./output/${streamerName}_${videoID}.ndjson`, "");
    fs.writeFileSync(`./output/${streamerName}_${videoID}.txt`, "");

    try {
      await getThenSaveComments(
        initialContID,
        `./output/${streamerName}_${videoID}`
      );
    } catch (e) {
      console.error(e);
    }
    statUniqueUsers(`./output/${streamerName}_${videoID}.ndjson`);
  })();
  // coco R5BjQipbOYU  20min # 5854, unique 1583
  // uge  Yh88B1zLl5c 110min # 3236, unique  300
  // uge  TlXLglN0lrQ 200min # 2892, unique  291
  // Uge  _NnrusBfqLU #comment:  1316 #Commenters: 134 note:colab_anoko/170min
  // Uge  7ggdJdegn-Q #comment:  5707 #Commenters: 784
  // Uge  8upZvGF0J88 #comment:  3282 #Commenters: 194
  // Uge  LZlNSQ8CWA4 #comment:  2771 #Commenters: 198
  // Uge  KyhslZeMzq8 #comment:  3910 #Commenters: 267
  // Uge  GtgcwZJrVVY #comment:  4373 #Commenters: 376
  // Uge  3mcb2y1_wRg #comment:  4126 #Commenters: 451
  // Uge  ghUcVptw7YU #comment: 10060 #Commenters: 730
  // Uge  SrrydNPmeQE #comment:  2052 #Commenters: 296
  // peco dkUt0LP2ZOQ  70min #15201, unique 2737
  // mito B-LCI28utWQ 100min #22019, unique 3614
}
