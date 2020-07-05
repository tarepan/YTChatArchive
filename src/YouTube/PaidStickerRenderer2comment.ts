import { PaidStickerRendererItem } from "./domain";
import { Comment } from "../domain";

/**
 * Convert YouTube 'PaidStickerRenderer' item into internal 'Comment'
 * @param item
 * @param relMills - relative time toward video start in millisecond
 */
export const paidStickerRenderer2comment = (
  item: PaidStickerRendererItem,
  relMillis: string
): Comment => {
  const d = item.liveChatPaidStickerRenderer;
  const comment: Comment = {
    id: d.id,
    author: {
      name: d.authorName.simpleText,
      id: d.authorExternalChannelId,
    },
    messages: [
      { type: "stamp", content: d.sticker.thumbnails[0].url },
      { type: "text", content: d.purchaseAmountText.simpleText },
    ],
    time: {
      absMicros: d.timestampUsec,
      relMills: relMillis,
    },
  };
  return comment;
};
