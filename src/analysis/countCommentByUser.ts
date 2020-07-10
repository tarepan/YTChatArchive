import { CountCommentByUsers, Commenter } from "./domain";

export const countCommentByUsers: CountCommentByUsers = (comments) => {
  const uniqueCommenters = new Map<string, Commenter>();

  // extract unique commenters by iterative Map.set()
  comments.forEach((comment) =>
    uniqueCommenters.set(comment.author.id, {
      identity: {
        id: comment.author.id,
        name: comment.author.name,
      },
      count: 0,
    })
  );

  // commenter.count update
  uniqueCommenters.forEach((commenter) => {
    commenter.count = comments.filter(
      (comment) => comment.author.id === commenter.identity.id
    ).length;
    uniqueCommenters.set(commenter.identity.id, commenter);
  });
  return Array.from(uniqueCommenters.values());
};
