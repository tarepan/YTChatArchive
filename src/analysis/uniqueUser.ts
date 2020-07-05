const fs = require("fs");
const ndjson = require("ndjson");

import { Comment } from "../domain";

export function statUniqueUsers(commentPath: string): void {
  const comments: Comment[] = [];

  fs.createReadStream(commentPath)
    .pipe(ndjson.parse())
    .on("data", (obj: Comment[]) => {
      comments.push(...obj);
    })
    .on("end", () => {
      // name
      const commenterNames = comments.map((v) => v.author.name);
      const uniqueCommenterNames = new Set<string>();
      commenterNames.forEach((name) => uniqueCommenterNames.add(name));
      const numberUniqueCommenters = Array.from(uniqueCommenterNames.values())
        .length;
      // id
      const commentersID = comments.map((v) => v.author.id);
      const uniqueCommenterIDs = new Set<string>();
      commentersID.forEach((id) => uniqueCommenterIDs.add(id));
      // uniqueCommenters2.forEach(c => console.log(c));

      const userFreq = Array.from(uniqueCommenterNames.values()).map(
        (name) =>
          [name, commenterNames.filter((cName) => cName === name).length] as [
            string,
            number
          ]
      );
      userFreq.sort(([nameA, freqA], [nameB, freqB]) => freqA - freqB);
      // .forEach(([name, freq]) => console.log(`${name}: ${freq}`));

      // output
      console.log(
        `${commentPath} #comment: ${commenterNames.length} #Commenters: ${numberUniqueCommenters}`
      );
    });
}

if (require.main === module) {
  const streamerName = "Uge";
  const videoID = "7ggdJdegn-Q";
  statUniqueUsers(`./output/${streamerName}_${videoID}.ndjson`);
}
