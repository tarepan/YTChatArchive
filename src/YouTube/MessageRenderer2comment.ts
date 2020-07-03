import { liveChatTextMessageRendererItem } from "./domain";
import { Comment } from "../domain";

/**
 * Convert YouTube 'MessageRenderer' item into internal 'Comment'
 * @param item
 * @param relMills - relative time toward video start in millisecond
 */
export const messageRenderer2comment = (
  item: liveChatTextMessageRendererItem,
  relMillis: string
): Comment => {
  const d = item.liveChatTextMessageRenderer;
  const comment: Comment = {
    id: d.id,
    author: {
      name: d.authorName.simpleText,
      id: d.authorExternalChannelId,
    },
    messages: d.message.runs.map((run) => {
      if ("text" in run) {
        return {
          type: "text",
          content: run.text,
        };
      } else {
        return {
          type: "stamp",
          content: run.emoji.image.thumbnails[0].url,
        };
      }
    }),
    time: {
      absMicros: d.timestampUsec,
      relMills: relMillis,
    },
  };
  return comment;
};
