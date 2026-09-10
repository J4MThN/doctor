import { jwtDecode } from "jwt-decode";
import { Role } from "../constants";
 

interface JwtPayload {
  sub?: string;
  mobile?: string;
  role?: string;

  exp?: number;
  iat?: number;
  jti?: string;

  [key: string]: unknown;
}

const normalizeRole = (role?: string): Role | null => {
  if (!role) return null;

  switch (role.toUpperCase()) {
    case "USER":
      return Role.USER;

    case "ADMIN":
      return Role.ADMIN;

    default:
      return null;
  }
};

export interface DecodedAccessToken {
  id: number;
  mobile: string;
  role: Role;

  exp?: number;
  iat?: number;
  jti?: string;
}

export const decodeAccessToken = (
  token: string
): DecodedAccessToken | null => {
  try {
    const payload = jwtDecode<JwtPayload>(token);

    if (!payload.sub) {
      return null;
    }

    const id = Number(payload.sub);

    if (!Number.isFinite(id)) {
      return null;
    }

    const roleClaim =
      payload.role ??
      (payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] as string | undefined);

    const role = normalizeRole(roleClaim);

    if (!role) {
      return null;
    }

    return {
      id,
      mobile: payload.mobile ?? "",
      role,
      exp: payload.exp,
      iat: payload.iat,
      jti: payload.jti,
    };
  } catch {
    return null;
  }
};