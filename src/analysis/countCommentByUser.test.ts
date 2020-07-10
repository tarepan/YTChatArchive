import { countCommentByUsers } from "./countCommentByUser";

describe("countCommentByUsers", () => {
  const comments = [
    {
      id: "comment_1_1",
      author: { name: "author_1", id: "1" },
      messages: [],
      time: { absMicros: "1", relMills: "0" },
    },
    {
      id: "comment_1_2",
      author: { name: "author_1", id: "1" },
      messages: [],
      time: { absMicros: "1", relMills: "0" },
    },
    {
      id: "comment_2_1",
      author: { name: "author_2", id: "2" },
      messages: [],
      time: { absMicros: "1", relMills: "0" },
    },
    {
      id: "comment_3_1",
      author: { name: "author_3", id: "3" },
      messages: [],
      time: { absMicros: "1", relMills: "0" },
    },
  ];

  it("should distinguish users", () => {
    expect(countCommentByUsers(comments).length).toBe(3);
  });

  it("should count comment number by users", () => {
    expect(countCommentByUsers(comments)[0].count).toBe(2);
    expect(countCommentByUsers(comments)[1].count).toBe(1);
    expect(countCommentByUsers(comments)[2].count).toBe(1);
  });
});
