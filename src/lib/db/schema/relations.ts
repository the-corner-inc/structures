import { defineRelations } from "drizzle-orm";

import * as schema from "./index.ts";

export const relations = defineRelations(schema, () => ({}));
