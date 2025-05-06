enum TypeEnum {
  normal = "normal", // Normal
  task = "task", // Tarefa
}

export class TypeEvent {
  constructor(private nameType: string) {
    if (!this.isValid(nameType)) {
      throw new Error("Is Type is invalid value!");
    }
  }

  public get name(): string {
    return this.nameType;
  }

  public isValid(type: string) {
    return Object.values(TypeEnum).includes(type as TypeEnum);
  }
}
