// types/next-helpers.ts
export type WithParams<T> = { params: Promise<T> }
export type WithSearchParams<T> = { searchParams: Promise<T> }
