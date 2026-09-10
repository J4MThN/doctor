export interface TokenProvider {
  getAccessToken(): string | null;
  setAccessToken(token: string | null): void;
  clearAccessToken(): void;
}

let tokenProvider: TokenProvider | null = null;

export const configureTokenProvider = (
  provider: TokenProvider
): void => {
  tokenProvider = provider;
};

export const getAccessToken = (): string | null => {
  return tokenProvider?.getAccessToken() ?? null;
};

export const setAccessToken = (
  token: string | null
): void => {
  tokenProvider?.setAccessToken(token);
};

export const clearAccessToken = (): void => {
  tokenProvider?.clearAccessToken();
};