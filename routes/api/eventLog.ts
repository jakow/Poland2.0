/**
 * The purpose of the event log is to resolve races between socket.io connections and
 * initial question database fetch. The initial database fetch will be given the latest event log timestamp.
 * Each create/update will be given a timestamp and if the client does not see subsequent timestamp
 * TODO: work in progress
 */
export default class EventLog {
  public readonly events: LoggedEvent[];
  private currentTimestamp: Timestamp;

  public getEventRange(start: Timestamp, end: Timestamp) {
    throw new Error('not implemented');
  }
}

export type Timestamp = number;

export interface LoggedEvent {
  timestamp: number;
  payload: any;
}
