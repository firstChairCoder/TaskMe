import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import Database from "@nozbe/watermelondb/Database";

import List from "./models/List";
import schema from "./models/schema";
import Task from "./models/Task";

const adapter = new SQLiteAdapter({
  schema,
  dbName: "taskkitt",
  jsi: false,
  onSetUpError: (err) => console.log(err)
});

export const database = new Database({
  adapter,
  modelClasses: [List, Task]
});
