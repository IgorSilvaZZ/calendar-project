import { randomUUID } from "node:crypto";

import { TypeEvent } from "./event.value.object";

interface EventProps {
  title: string;
  description: string;
  type: TypeEvent;
  date?: Date;
  startHour?: string;
  endHour?: string;
  color?: string;
}

export class Event {
  private _id: string;
  private props: EventProps;

  constructor(props: EventProps, id?: string) {
    this._id = id ? id : randomUUID();
    this.props = {
      ...props,
      date: props.date ?? new Date(),
      startHour: props.startHour ?? "",
      endHour: props.endHour ?? "",
      color: props.color ?? "",
    };
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get type(): string {
    return this.props.type.name;
  }

  public get date(): Date {
    return this.props.date ?? new Date();
  }

  public get startHour(): string {
    return this.props.startHour ?? "";
  }

  public get endHour(): string {
    return this.props.endHour ?? "";
  }

  public get color(): string {
    return this.props.color ?? "";
  }

  public static create(props: EventProps, id?: string) {
    return new Event(props, id);
  }
}
