export class ReviewAggregateEvent {
  placeId!: number;

  constructor(event: ReviewAggregateEvent) {
    Object.assign(this, event);
  }
}
