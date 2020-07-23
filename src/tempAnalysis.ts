import fs from "fs";
import { Commenter } from "./analysis/domain";

const r = fs.readdirSync("./output");

const filesUniqueUser = r.filter((name) => /uniqueUser_/.test(name));

const videosWithCommenters = filesUniqueUser
  .map((name) => fs.readFileSync(`./output/${name}`), { encoding: "utf-8" })
  // @ts-ignore
  .map((content) => JSON.parse(content) as Commenter[]);

const uniqueCommentersChannelWise = new Map<string, Commenter>();

// extract unique commenters by iterative Map.set()
videosWithCommenters.forEach((commentersInaVideo) =>
  commentersInaVideo.forEach((commenter) =>
    uniqueCommentersChannelWise.set(commenter.identity.id, {
      identity: { ...commenter.identity },
      count: 0,
    })
  )
);

// console.log(Array.from(uniqueCommentersChannelWise.entries()).length);

// commenter.count update
//// count
const allCommentersOverlaped = videosWithCommenters.reduce(
  (total, video) => total.concat(video),
  []
);
uniqueCommentersChannelWise.forEach((uniqueCommenter) => {
  uniqueCommenter.count = allCommentersOverlaped
    .filter(
      (commenter) => commenter.identity.id === uniqueCommenter.identity.id
    )
    .reduce((total, inaVideo) => total + inaVideo.count, 0);
  uniqueCommentersChannelWise.set(uniqueCommenter.identity.id, uniqueCommenter);
});

const result = Array.from(uniqueCommentersChannelWise.values()).sort(
  (commenterA, commenterB) => commenterB.count - commenterA.count
);
// result.forEach((commenter) =>
//   console.log(`${commenter.identity.name}, #${commenter.count}`)
// );

// [n]<=x<[n+1]
// console.log(r);
// 1024 (2^10) 32(2^5)

const expScale: number[] = [];
for (let i = 0; i <= 15; i++) {
  expScale.push(2 ** i);
}
const stat = expScale.map((start, scaleIndex) => {
  const commentersInRange = Array.from(
    uniqueCommentersChannelWise.values()
  ).filter(
    (commenter) =>
      start <= commenter.count && commenter.count < expScale[scaleIndex + 1]
  );
  return {
    range: `${start} <= n < ${expScale[scaleIndex + 1]}`,
    numberCommenter: commentersInRange.length,
    numberComment: commentersInRange.reduce((total, c) => total + c.count, 0),
    names: commentersInRange.map((c) => c.identity.name),
  };
});

const nComment = stat.reduce((total, range) => total + range.numberComment, 0);
const nUser = Array.from(uniqueCommentersChannelWise.values()).length;

console.log(`total comments: #${nComment}`);
console.log(`unique users: #${nUser}`);
stat.forEach((range) =>
  console.log(
    `${range.range}: ${range.numberCommenter} peoples, ${range.numberComment} comments`
  )
);

/*
total comments: #449539
unique users:   #  8070
    1 <= n <     2:   2713 peoples,  2713 comments
    2 <= n <     4:   1633 peoples,  3856 comments
    4 <= n <     8:   1114 peoples,  5762 comments
    8 <= n <    16:    829 peoples,  9073 comments
   16 <= n <    32:    619 peoples, 13698 comments
   32 <= n <    64:    432 peoples, 19457 comments

   64 <= n <   128:    297 peoples, 27228 comments
  128 <= n <   256:    187 peoples, 33710 comments
  256 <= n <   512:    114 peoples, 40731 comments
  512 <= n <  1024:     48 peoples, 34137 comments
 1024 <= n <  2048:     43 peoples, 61646 comments
 2048 <= n <  4096:     24 peoples, 67379 comments
 4096 <= n <  8192:     12 peoples, 67625 comments
 8192 <= n < 16384:      4 peoples, 40398 comments
16384 <= n < 32768:      1 peoples, 22126 comments
32768 <= n <      :      0 peoples,     0 comments
*/

/*
unique 8000人のうちの 39人（0.5%）で約半数のコメント。
                    246人（3.0%）で   75%のコメント。
*/
