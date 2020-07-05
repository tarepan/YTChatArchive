import { PaidMessageRendererItem } from "./domain";
import { Comment } from "../domain";

/**
 * Convert YouTube 'MessageRenderer' item into internal 'Comment'
 * @param item
 * @param relMills - relative time toward video start in millisecond
 */
export const paidMessageRenderer2comment = (
  item: PaidMessageRendererItem,
  relMillis: string
): Comment => {
  const d = item.liveChatPaidMessageRenderer;
  const msg = d.message ?? { runs: [] };
  const comment: Comment = {
    id: d.id,
    author: {
      name: d.authorName.simpleText,
      id: d.authorExternalChannelId,
    },
    messages: msg.runs
      .map((run) => {
        if ("text" in run) {
          return {
            type: "text",
            content: run.text,
          } as { type: "text"; content: string };
        } else {
          return {
            type: "stamp",
            content: run.emoji.image.thumbnails[0].url,
          } as { type: "stamp"; content: string };
        }
      })
      .concat({
        type: "text",
        content: ` ${d.purchaseAmountText.simpleText}`,
      } as { type: "text"; content: string }),
    time: {
      absMicros: d.timestampUsec,
      relMills: relMillis,
    },
  };
  return comment;
};
