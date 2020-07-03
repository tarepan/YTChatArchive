const fetch = require("node-fetch");
const himalaya = require("himalaya");

import { GetInitialContinuationID } from "../domain";
import { YTArchiveInitialData } from "../YouTube/domain";

/**
 * Get YouTube Live Archive comment initial Continuation ID (comment-start contID)
 * @param videoID - YouTube VideoID e.g. 'Yh88B1zLl5c' for https://www.youtube.com/watch?v=Yh88B1zLl5c
 */
export const getInitialContinuationID: GetInitialContinuationID = async (
  videoID
) => {
  // fetch
  const res = await fetch(`https://www.youtube.com/watch?v=${videoID}`, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
    },
  });
  const html = await res.text();

  // parse
  const contJS = himalaya
    .parse(html)
    .find((o) => o.tagName === "html")
    .children.find((o) => o.tagName === "body")
    .children.filter((o) => o.tagName === "script")[1].children[0].content;
  //// html script evaluation for parse
  const window: { ytInitialData: any } = { ytInitialData: undefined };
  eval(contJS);
  const ytInitialData = window.ytInitialData as YTArchiveInitialData;

  // continuation ID extraction
  const initialContID =
    ytInitialData.contents.twoColumnWatchNextResults.conversationBar
      .liveChatRenderer.continuations[0].reloadContinuationData.continuation;
  return initialContID;
};

if (require.main === module) {
  // https://www.youtube.com/watch?v=Yh88B1zLl5c
  getInitialContinuationID("Yh88B1zLl5c").then((contID) => {
    console.log(contID);
  });
}
