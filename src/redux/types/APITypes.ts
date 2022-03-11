export enum APIStatusCode {
	Success = 1,
	Error = 0,
}

export interface APIResponse<D = {}, SC = APIStatusCode> {
	data: D
	status: SC
}
