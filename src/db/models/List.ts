/* eslint-disable @typescript-eslint/no-shadow */
import { children, json, text, writer } from "@nozbe/watermelondb/decorators";
import type { Associations } from "@nozbe/watermelondb/Model";
import Model from "@nozbe/watermelondb/Model";
import type Query from "@nozbe/watermelondb/Query";

import { Columns, Tables } from "./schema";
import type Task from "./Task";
import { uid } from "../utils/uid";
import type { Subtask } from "./Task";

import type { listThemeType } from "@/theme/listThemes";

interface AddTask {
  name: string;
  description: string;
  reminder?: Date;
  //   reminderRepeat: repeatType;
  subtasks: string[];
}

interface IEditList {
  name?: string;
  theme?: listThemeType;
}

const Column = Columns.list;
export default class List extends Model {
  public static table = Tables.List;
  public static associations: Associations = {
    task: {
      type: "has_many",
      foreignKey: Columns.task.listID
    }
  };
  @text(Column.name) name!: string;
  @children("task") tasks!: Query<Task>;
  @json(Column.theme, (json) => json) theme!: listThemeType;

  @writer async addTask(t: AddTask) {
    await this.database.get<Task>(Tables.Task).create((task) => {
      const id = uid();
      if (t.reminder) {
        task.reminder = new Date(t.reminder);
        // task.repeat = t.reminderRepeat;
        // scheduleNotification({
        //   name: t.name,
        //   id,
        //   date: t.reminder,
        //   description: t.description,
        //   repeat: t.reminderRepeat
        // });
      } else {
        task.reminder = null;
        // task.repeat = null;
      }
      task.list.set(this);
      task.description = t.description;
      task.name = t.name;
      task.isCompleted = false;
      const subtasks: Subtask = {};
      t.subtasks.map((i) => {
        const id = uid(10);
        subtasks[id] = {
          isCompleted: false,
          name: i
        };
        task.subtasks = subtasks;
      });
      task.id = id;
    });
  }
  @writer async markAsDeleted() {
    const tasks = await this.tasks.fetch();
    const deleted = tasks.map((task) => {
      //   task.cancelNotification();
      return task.prepareMarkAsDeleted();
    });
    await this.database.batch(...deleted, super.prepareMarkAsDeleted());
  }

  @writer async editList({ name, theme }: IEditList) {
    this.update((r) => {
      if (name) {
        r.name = name;
      }
      if (theme) {
        r.theme = theme;
      }
    });
  }
}
