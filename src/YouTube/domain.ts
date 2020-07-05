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
          item:
            | ViewerEngagementRendererItem
            | liveChatTextMessageRendererItem
            | PaidMessageRendererItem
            | MembershipRendererItem
            | PlaceholderRendererItem;
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
    authorPhoto: AuthorPhoto;
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
export type PaidMessageRendererItem = {
  liveChatPaidMessageRenderer: {
    id: string; // e.g. "ChwKGkNLUE8wSUgtay1FQ0ZSVTFLZ29kalM4T3N3";
    timestampUsec: string; // e.g. "1553197098810701";
    authorName: {
      simpleText: string; // e.g. "微糖";
    };
    authorPhoto: AuthorPhoto;
    purchaseAmountText: {
      simpleText: string; // "￥1,000";
    };
    message?: {
      runs: (runText | runEmoji)[];
    };
    headerBackgroundColor: number; // e.g. 4294947584;
    headerTextColor: number; // e.g. 3741319168;
    bodyBackgroundColor: number; // e.g. 4294953512;
    bodyTextColor: number; // e.g. 3741319168;
    authorExternalChannelId: string; // "UCCe7Y7CDRagNeDq7Knf6yLw";
    authorNameTextColor: number; // e.g. 2315255808;
    contextMenuEndpoint: {
      commandMetadata: {
        webCommandMetadata: {
          ignoreNavigation: boolean;
        };
      };
      liveChatItemContextMenuEndpoint: {
        params: string; // e.g. "Q2g0S0hBb2FRMHRRVHpCSlNDMXJMVVZEUmxKVk1VdG5iMlJxVXpoUGMzY1FBQm80R2cwS0MwdDVhSE5zV21WTmVuRTRLaWNLR0ZWRE0wVm9jM1ZMWkVWclNUazVWRmRhZDFwblYzVjBaeElMUzNsb2MyeGFaVTE2Y1RnZ0FTZ0VNaG9LR0ZWRFEyVTNXVGREUkZKaFowNWxSSEUzUzI1bU5ubE1kdyUzRCUzRA==";
      };
    };
    timestampColor: number; // e.g. 2147483648;
    contextMenuAccessibility: {
      accessibilityData: {
        label: string; // e.g. "コメントの操作";
      };
    };
    timestampText: {
      simpleText: string; // e.g. "1:59:54";
    };
  };
};

//
export type PaidStickerRendererItem = {
  liveChatPaidStickerRenderer: {
    id: string; // e.g. "ChwKGkNLN1FxWVdYc09ZQ0ZWSlJoUW9kYkdVQ1dn";
    contextMenuEndpoint: {
      commandMetadata: {
        webCommandMetadata: {
          ignoreNavigation: boolean;
        };
      };
      liveChatItemContextMenuEndpoint: {
        params: string; // e.g. "Q2g0S0hBb2FRMHMzVVhGWlYxaHpUMWxEUmxaS1VtaFJiMlJpUjFWRFYyY1FBQm80R2cwS0MwZDBaMk4zV2tweVZsWlpLaWNLR0ZWRE0wVm9jM1ZMWkVWclNUazVWRmRhZDFwblYzVjBaeElMUjNSblkzZGFTbkpXVmxrZ0FTZ0VNaG9LR0ZWRFFqbHhPVGxHZFY5eldqQk5lRXczZW1FNWFVaHFVUSUzRCUzRA==";
      };
    };
    contextMenuAccessibility: {
      accessibilityData: {
        label: string; // e.g. "コメントの操作";
      };
    };
    timestampUsec: string; // e.g. "1576156123164645";
    authorPhoto: AuthorPhoto;
    authorName: {
      simpleText: string; // e.g. "mh sn";
    };
    authorExternalChannelId: string; // e.g. "UCB9q99Fu_sZ0MxL7za9iHjQ";
    timestampText: {
      simpleText: string; // e.g. "3:09:11";
    };
    sticker: {
      thumbnails: {
        url: string; // e.g. "//lh3.googleusercontent.com/rUbx-Dfxq-jxzhmpjgx8UzYxIlZ03ri3DIrK9yI1LlG5ICd3dboM2B0jByVWg0ln38ZoneBBj7ChcVJntjs=s88-rwa";
        width: number; // e.g. 88;
        height: number; // e.g. 88;
      }[]; // 2 items, 88x88 & 176x176
      accessibility: {
        accessibilityData: {
          label: string; // "「GG」と言って称賛するようにうなづきながら拍手をするカバのキャラクター";
        };
      };
    };
    moneyChipBackgroundColor: number; // e.g. 4280150454;
    moneyChipTextColor: number; // e.g. 4278190080;
    purchaseAmountText: {
      simpleText: string; // "￥500";
    };
    stickerDisplayWidth: number; // e.g. 88;
    stickerDisplayHeight: number; // e.g. 88;
    backgroundColor: number; // e.g. 4278239141;
    authorNameTextColor: number; // e.g. 2315255808;
  };
};

//
export type PlaceholderRendererItem = {
  liveChatPlaceholderItemRenderer: {
    id: string; // e.g. "CkUKGkNNeTJvTUdDZ09ZQ0ZXdjB3UW9kNHpNUEZREidDTXJGXzd1Q2dPWUNGUmhPV0FvZFlNNE5HUTE1NzQ1MDEzMTkzMjk%3D",
    timestampUsec: string; // e.g. "1574501324692300"
  };
};

export type MembershipRendererItem = {
  liveChatMembershipItemRenderer: {
    id: string; // e.g. "ChwKGkNPdXItTHYyMWVjQ0ZZbDFtQW9kbjhNQVVB";
    timestampUsec: string; // e.g. "1581851076335083";
    authorExternalChannelId: string; // e.g. "UCF_751r_ENb54A-y8QMgqtA";
    headerSubtext: {
      runs: {
        text: string; // e.g. "新規メンバー";
      }[]; // 1 item
    };
    authorName: {
      simpleText: string; // e.g. "ハチ";
    };
    authorPhoto: AuthorPhoto;
    authorBadges: {
      liveChatAuthorBadgeRenderer: liveChatAuthorBadgeRendererMember;
    }[];
    contextMenuEndpoint: {
      commandMetadata: {
        webCommandMetadata: {
          ignoreNavigation: boolean;
        };
      };
      liveChatItemContextMenuEndpoint: {
        params: string; // e.g. "Q2g0S0hBb2FRMDkxY2kxTWRqSXhaV05EUmxsc01XMUJiMlJ1T0UxQlZVRVFBQm80R2cwS0MyZG9WV05XY0hSM04xbFZLaWNLR0ZWRE0wVm9jM1ZMWkVWclNUazVWRmRhZDFwblYzVjBaeElMWjJoVlkxWndkSGMzV1ZVZ0FTZ0VNaG9LR0ZWRFJsODNOVEZ5WDBWT1lqVTBRUzE1T0ZGTlozRjBRUSUzRCUzRA==";
      };
    };
    contextMenuAccessibility: {
      accessibilityData: {
        label: string; // e.g. "コメントの操作";
      };
    };
  };
};

//
type AuthorPhoto = {
  thumbnails: {
    url: string; // e.g. "https://yt3.ggpht.com/-3k7QNEiQCWQ/AAAAAAAAAAI/AAAAAAAAAAA/46KJsoSwmog/s32-c-k-no-mo-rj-c0xffffff/photo.jpg";
    width: number; // e.g. 32
    height: number; // 3.g. 32
  }[]; // 2 items (32x32 & 64x64 images) @2020-07-03
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
