export type YTVideoID = string; // e.g. Yh88B1zLl5c
export type ContinuationID = string; // e.g. op2w0wRaGlBDamdhRFFvTFdXZzRPRUl4ZWt4c05XTXFKd29ZVlVNelJXaHpkVXRrUld0Sk9UbFVWMXAzV21kWGRYUm5FZ3RaYURnNFFqRjZUR3cxWXlBQkABcgIIBHgB
export type InitialContinuationID = string;

/**
 * Response "continuation" from YouTube
 */
export type YTArchiveInitialData = {
  contents: {
    twoColumnWatchNextResults: {
      conversationBar: {
        liveChatRenderer: {
          continuations: [
            {
              reloadContinuationData: {
                continuation: string; // continuation ID e.g. "op2w0wRaGlBDamdhRFFvTFdXZzRPRUl4ZWt4c05XTXFKd29ZVlVNelJXaHpkVXRrUld0Sk9UbFVWMXAzV21kWGRYUm5FZ3RaYURnNFFqRjZUR3cxWXlBQkABcgIIBHgB";
                clickTrackingParams: string; //"CDMQxqYCIhMIi7G6yM2v6gIVzioqCh0HcAL5";
              };
            }
          ];
        };
      };
    };
  };
  responseContext: unknown; // trackingID etc;
};

/**
 * Response "continuation" from YouTube
 */
export type YTContinuationInitialData = {
  continuationContents: {
    liveChatContinuation: {
      actions: YouTubeliveChatAction[];
      continuations: [
        {
          liveChatReplayContinuationData: {
            timeUntilLastMessageMsec: number;
            continuation: string;
          };
        },
        {
          playerSeekContinuationData: {
            continuation: string;
          };
        }
      ];
    };
  };
  responseContext: unknown; // trackingID etc;
};

/**
 * live chat action
 */
export type YouTubeliveChatAction = {
  replayChatItemAction: {
    actions: [
      {
        addChatItemAction: {
          item: ViewerEngagementRendererItem | liveChatTextMessageRendererItem;
          clientId: string;
        };
      }
    ];
    videoOffsetTimeMsec: string; // relative time [msec] toward video start? e.g. "20943";
  };
};

export type ViewerEngagementRendererItem = {
  liveChatViewerEngagementMessageRenderer: {
    id: string;
    timestampUsec: string; // e.g. "1593714877597954"
    icon: {
      iconType: string; // e.g. "YOUTUBE_ROUND"
    };
    message: {
      runs: [
        {
          text: string; // e.g. "チャットのリプレイがオンになっています。ライブ配信時に表示されたメッセージは、ここに表示されます。"
        }
      ];
    };
  };
};

export type liveChatTextMessageRendererItem = {
  liveChatTextMessageRenderer: {
    message: {
      runs: (runText | runEmoji)[];
    };
    authorName: {
      simpleText: string; // e.g. "Uge Channel / 杏戸ゆげ 【ブイアパ】"
    };
    authorPhoto: {
      thumbnails: {
        url: string; // e.g. "https://yt3.ggpht.com/-3k7QNEiQCWQ/AAAAAAAAAAI/AAAAAAAAAAA/46KJsoSwmog/s32-c-k-no-mo-rj-c0xffffff/photo.jpg";
        width: number; // e.g. 32
        height: number; // 3.g. 32
      }[]; // 2 items (32x32 & 64x64 images) @2020-07-03
    };
    contextMenuEndpoint: {
      clickTrackingParams: string;
      commandMetadata: {
        webCommandMetadata: { ignoreNavigation: boolean };
      };
      liveChatItemContextMenuEndpoint: {
        params: string;
      };
    };
    id: string; // e.g. "CjkKGkNLbmlyZnJNcmVvQ0ZSWlU3UW9kNFJnT3pBEhtDTE9hX3ZUTXJlb0NGYVRFVEFJZFNVb01kUTA%3D"
    timestampUsec: string; // microsec UNIX timestamp...?
    authorBadges: (
      | liveChatAuthorBadgeRendererMember
      | liveChatAuthorBadgeRendererStreamer
    )[];
    authorExternalChannelId: string; // YouTube channel ID of commenter;
    contextMenuAccessibility: {
      accessibilityData: {
        label: string; // e.g. "コメントの操作"
      };
    };
    timestampText: {
      simpleText: string; // e.g. "0:20"
    };
  };
};

//
export type runText = { text: string };
//
export type runEmoji = {
  emoji: {
    emojiId: string; // "UC3EhsuKdEkI99TWZwZgWutg/0YHNXJzMBciG8gSy1LbABw";
    shortcuts: string[]; //e.g. [":ugeKonyu:"]
    searchTerms: string[]; // e.g. ["ugeKonyu", "konyu"]
    image: {
      thumbnails: {
        url: string; // e.g. "https://yt3.ggpht.com/jo0-RbXCpN3Co4bDKbnXPzxWOYbF7eZwCD22-eh8vyXq4HanJUdiIVFgb8jFzD020dJOK06uqA=w24-h24-c-k-nd";
        width: number; // e.g. 24;
        height: number; // e.g. 24;
      }[]; // 2 items (different size)
      accessibility: {
        accessibilityData: {
          label: string; // e.g. ":ugeKonyu:"
        };
      };
    };
    isCustomEmoji: true;
  };
};

// Membership badge
export type liveChatAuthorBadgeRendererMember = {
  customThumbnail: {
    thumbnails: {
      url: string; // badge image url. e.g. "https://yt3.ggpht.com/P1X1S_3TOEAGeQLO1w0Dq0nBmp7XEh6OKLiOT9uHyqGxkD6QG78aJS8U79S1aNX6IDOk19BwmsI=s16-c-k"
    }[]; // In default, contain 2 different size badge image
  };
  tooltip: string; // e.g. "メンバー（6 か月）"
  accessibility: {
    accessibilityData: {
      label: string; // "メンバー（6 か月）"
    };
  };
};

export type liveChatAuthorBadgeRendererStreamer = {
  icon: {
    iconType: string; // e.g. "OWNER"
  };
  tooltip: string; // e.g. "所有者"
  accessibility: {
    accessibilityData: {
      label: string; // e.g. "所有者";
    };
  };
};
