import {
  liveChatAuthorBadgeRendererMember,
  liveChatAuthorBadgeRendererStreamer,
  YTVideoID,
  InitialContinuationID,
  ContinuationID,
} from "./YouTube/domain";

export type Comment = {
  // [todo]: is this comment unique id?
  id: string; // e.g. "CjkKGkNLbmlyZnJNcmVvQ0ZSWlU3UW9kNFJnT3pBEhtDTE9hX3ZUTXJlb0NGYVRFVEFJZFNVb01kUTA%3D"
  author: {
    name: string; // from authorName.simpleText e.g. "Uge Channel / 杏戸ゆげ 【ブイアパ】"
    id: string; // from authorExternalChannelId
  };
  messages: {
    type: "text" | "stamp";
    content: string;
  }[];
  time: {
    absMicros: string; // absolute UNIX timestamp ※microsec...?
    relMills: string; // relative time totoward video start. From videoOffsetTimeMsec
  };
};

export type Author = {
  name: string;
  id: string;
  photos: {
    url: string; // e.g. "https://yt3.ggpht.com/-3k7QNEiQCWQ/AAAAAAAAAAI/AAAAAAAAAAA/46KJsoSwmog/s32-c-k-no-mo-rj-c0xffffff/photo.jpg";
    width: number; // e.g. 32
    height: number; // 3.g. 32
  }[]; // 2 items (32x32 & 64x64 images) @2020-07-03
  badges: (
    | liveChatAuthorBadgeRendererMember
    | liveChatAuthorBadgeRendererStreamer
  )[];
};

export type GetInitialContinuationID = (
  ytVideoID: YTVideoID
) => Promise<InitialContinuationID>;

export type GetChatCommentPartially = (
  contID: ContinuationID
) => Promise<[Comment[], ContinuationID | undefined]>;
