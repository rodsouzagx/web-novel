import type { SchemaTypeDefinition } from "sanity";
import { chapter } from "./chapter";
import { news } from "./news";
import { character } from "./character";
import { author } from "./author";
import { trivia } from "./trivia";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [chapter, news, character, author, trivia],
};
