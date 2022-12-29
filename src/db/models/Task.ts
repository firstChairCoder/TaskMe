import type { TableName } from "@nozbe/watermelondb";
import { Model } from "@nozbe/watermelondb";
import { associations } from "@nozbe/watermelondb/Model";
import {
  field,
  json,
  relation,
  text,
  writer
} from "@nozbe/watermelondb/decorators";
import date from "@nozbe/watermelondb/decorators/date";
import type Relation from "@nozbe/watermelondb/Relation";

import { Columns, Tables } from "./schema";
import type List from "./List";

import { storage } from "@/components/AppProviders";

const Column = Columns.task;

export interface Subtask {
  name: string;
  isCompleted: boolean;
}
interface SubtaskObject {
  [x: string]: Subtask;
}
interface IEditTask {
  name?: string;
  description?: string;
  reminder?: Date | null;
  // repeat?: RepeatType
}

const sanitize = (subtasks: any): SubtaskObject => {
  if (typeof subtasks !== "object") {
    return {};
  }
  return subtasks;
};

export default class Task extends Model {
  public static table: TableName<Task> = Tables.Task;
  public static associations = associations([
    Tables.List,
    { type: "belongs_to", key: Column.listID }
  ]);

  @text(Column.name) name!: string;
  @field(Column.isCompleted) isCompleted!: boolean;
  @text(Column.description) description!: string;
  @json(Column.subtasks, sanitize) subtasks!: SubtaskObject;
  @date(Column.reminder) reminder!: Date | null;
  //   @text(Column.repeat) repeat!: repeatType;
  @relation(Tables.List, Column.listID) list!: Relation<List>;

  @writer async markAsDeleted() {
    // to update the list number
    this.list.fetch().then((list) => {
      list?.update(() => {});
    });
    // await this.cancelNotification();
    await super.markAsDeleted();
  }
  //   async cancelNotification() {
  //     await cancelScheduledNotificationAsync(this.id);
  //   }

  @writer async updateSubtasks(newSubtasks: SubtaskObject) {
    await this.update((r) => {
      r.subtasks = newSubtasks;
    });
  }
  @writer async changeList(listID: string) {
    const list = await this.database.get<List>(Tables.List).find(listID);
    this.update(() => {
      this.list.set(list);
    });
  }

  @writer async setIsCompleted(t = false) {
    await this.update((r) => {
      r.isCompleted = t;
    });

    const shouldCancelNotification = storage.getBoolean(
      "send-notification-even-when-completed"
    );
    // if (shouldCancelNotification) {
    //   this.cancelNotification();
    // }

    this.list.fetch().then((list) => {
      list?.update(() => {});
    });
  }
  @writer async toggleTask() {
    this.update((r) => {
      r.isCompleted = !r.isCompleted;
    });
    this.list.fetch().then((list) => {
      list?.update(() => {});
    });
  }
  @writer async editTask({ name, description, reminder }: IEditTask) {
    this.update((r) => {
      if (name) {
        r.name = name;
      }
      if (typeof description !== "undefined") {
        r.description = description;
      }
      //   if (typeof repeat !== "undefined") {
      //     r.repeat = repeat;
      //   }
      if (typeof reminder !== "undefined") {
        if (reminder) {
          //   r.cancelNotification();
          //   scheduleNotification({
          //     name: r.name,
          //     id: r.id,
          //     date: reminder,
          //     description: r.description,
          //     repeat: r.repeat
          //   });
          r.reminder = new Date(reminder);
        } else {
          r.reminder = null;
        }
      }
    });
  }
}
