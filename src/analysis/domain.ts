import { Comment } from "../domain";

export type Commenter = {
  identity: {
    id: string;
    name: string;
  };
  count: number;
};

export type CountCommentByUsers = (comments: Comment[]) => Commenter[];
