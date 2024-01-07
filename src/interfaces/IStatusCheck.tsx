export default interface IStatusCheck {
  CheckID: number,
  WebsiteID: number,
  Timestamp: Date,
  StatusCode: number,
  ResponseTime: number,
  Status: string,
  Details: string,
}
