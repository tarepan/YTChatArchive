const fetch = require("node-fetch");
const himalaya = require("himalaya");

import { YTContinuationInitialData } from "../YouTube/domain";
import { GetChatCommentPartially, Comment } from "../domain";
import { messageRenderer2comment } from "../YouTube/MessageRenderer2comment";
import { engagementRenderer2comment } from "../YouTube/EngagementRenderer2comment";

/**
 * Get YouTube Live Archive chat comments corresponding specified comment continuation ID
 * @param contID - YouTube Live Archive comment Continuation iD
 */
export const getChatCommentPartially: GetChatCommentPartially = async (
  contID
) => {
  // fetch
  const res = await fetch(
    `https://www.youtube.com/live_chat_replay?continuation=${contID}`,
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
      },
    }
  );
  const html = await res.text();

  // parse: html to object
  const ytInitialData = parseInitialData(html);

  // extraction: next continuation ID
  const nextContID =
    ytInitialData.continuationContents.liveChatContinuation.continuations[0]
      .liveChatReplayContinuationData.continuation;

  // extraction: comments
  const comments = ytInitialData.continuationContents.liveChatContinuation.actions.map(
    (action) => {
      const relMills = action?.replayChatItemAction?.videoOffsetTimeMsec;
      const item =
        action?.replayChatItemAction?.actions[0]?.addChatItemAction?.item;
      //                                        .liveChatMembershipItemRenderer
      //                                        .addLiveChatTickerItemAction
      if (relMills !== undefined && item !== undefined) {
        if ("liveChatViewerEngagementMessageRenderer" in item) {
          return engagementRenderer2comment(item, relMills);
        } else if ("liveChatTextMessageRenderer" in item) {
          return messageRenderer2comment(item, relMills);
        } else {
          // other render action
          console.error("yet-implemented render action");
          console.error(JSON.stringify(item, undefined, 2));
          return undefined;
        }
      } else {
        // other action
        console.error("yet-implemented action");
        console.error(JSON.stringify(item, undefined, 2));
        return undefined;
      }
    }
  );
  const commentsNonNullable = comments.filter(
    (c) => c !== undefined
  ) as Comment[];
  return [commentsNonNullable, nextContID];
};

function parseInitialData(html: string) {
  const contJS = himalaya
    .parse(html)
    .find((o) => o.tagName === "html")
    .children.find((o) => o.tagName === "body")
    .children.filter((o) => o.tagName === "script")[5].children[0].content;

  // html script evaluation
  const window: { ytInitialData: any } = { ytInitialData: undefined };
  eval(contJS);
  const ytInitialData = window.ytInitialData as YTContinuationInitialData;
  return ytInitialData;
}

if (require.main === module) {
  // Init
  // getContinuousChat(
  //   "op2w0wRaGlBDamdhRFFvTFdXZzRPRUl4ZWt4c05XTXFKd29ZVlVNelJXaHpkVXRrUld0Sk9UbFVWMXAzV21kWGRYUm5FZ3RaYURnNFFqRjZUR3cxWXlBQkABcgIIBHgB"
  // )
  // Cont
  getChatCommentPartially(
    "op2w0wRpGlBDamdhRFFvTFdXZzRPRUl4ZWt4c05XTXFKd29ZVlVNelJXaHpkVXRrUld0Sk9UbFVWMXAzV21kWGRYUm5FZ3RaYURnNFFqRjZUR3cxWXlBQiiZ08w9MAA4AEAASANSAGAEcgIIBHgA"
  )
    //
    .then(([comments, nextID]) => {
      const commentStgs = comments.map((comment) => {
        const msg = comment.messages.reduce(
          (total, chunk) =>
            total + chunk.type === "text" ? chunk.content : "□",
          ""
        );
        return `${comment.author.name}: ${msg}`;
      });
      commentStgs.forEach((stg) => console.log(stg));
      console.log(nextID);
    });
}
