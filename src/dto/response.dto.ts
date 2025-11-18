export interface ResponseDTO {
    status?: number;
    statusText?: string;
    headers?: Record<string, string>
    data?: never;
    raw?: string;
    durationMs?: number;
    error?: string;
}