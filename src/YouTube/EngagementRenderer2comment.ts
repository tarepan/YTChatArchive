import { Comment } from "../domain";
import { ViewerEngagementRendererItem } from "./domain";

/**
 * Convert YouTube 'EngagementRenderer' item into internal 'Comment'
 * @param item
 * @param relMills - relative time toward video start in millisecond
 */
export const engagementRenderer2comment = (
  item: ViewerEngagementRendererItem,
  relMills: string
): Comment => {
  const d = item.liveChatViewerEngagementMessageRenderer;
  const comment: Comment = {
    id: d.id,
    author: {
      name: "system",
      id: "0",
    },
    messages: d.message.runs.map((run) => ({
      type: "text",
      content: run.text,
    })),
    time: {
      absMicros: d.timestampUsec,
      relMills: relMills,
    },
  };
  return comment;
};
