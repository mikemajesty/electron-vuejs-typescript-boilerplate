export class EventUtils implements EventType {
  procuct = { create: "createProduct" };
}

export interface EventType {
  procuct: { create: string };
}
