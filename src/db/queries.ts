import type { Clause } from "@nozbe/watermelondb/QueryDescription";
import { Q } from "@nozbe/watermelondb";
import dayjs from "dayjs";

import { Columns, Tables } from "./models/schema";
import { database } from "./index";
import type Task from "./models/Task";

type getTaskByDateProps = {
  from?: number;
  to?: number;
  withNull?: boolean;
};
export function queryTasks(
  { from, to, withNull }: getTaskByDateProps,
  ...extend: Clause[]
) {
  const q: Clause[] = [];

  if (from) {
    if (!to) {
      q[0] = Q.where(Columns.task.reminder, Q.gte(from));
    } else {
      q[0] = Q.where(Columns.task.reminder, Q.between(from, to));
    }
  }
  if (to && !from) {
    q[0] = Q.where(Columns.task.reminder, Q.lte(to));
  }
  if (withNull) {
    if (q[0] && q[0].type === "where") {
      q[0] = Q.or(q[0], Q.where(Columns.task.reminder, Q.eq(null)));
    } else {
      q[0] = Q.where(Columns.task.reminder, Q.eq(null));
    }
  }

  return database
    .get<Task>(Tables.Task)
    .query(...q)
    .extend(...extend);
}

type CustomDateType = {
  from?: number;
  to?: number;
};
interface DateIntervalProps {
  day?: Date | number | string;
  after?: number;
  before?: number;
  daysBefore?: number;
  daysAfter?: number;
}
export function getDateInterval({
  day,
  after,
  before,
  daysAfter,
  daysBefore
}: DateIntervalProps): CustomDateType {
  const t: CustomDateType = {
    from: undefined,
    to: undefined
  };
  if (day) {
    const d = dayjs(day);
    return {
      from: d.startOf("day").valueOf(),
      to: d.endOf("day").valueOf()
    };
  }
  if (after) {
    t.from = dayjs().add(after).valueOf();
  }
  if (before) {
    t.to = dayjs().subtract(before).valueOf();
  }
  if (daysAfter) {
    t.from = dayjs().add(daysAfter, "day").startOf("day").valueOf();
  }
  if (daysBefore) {
    t.to = dayjs().subtract(daysBefore, "day").endOf("day").valueOf();
  }
  return t;
}
