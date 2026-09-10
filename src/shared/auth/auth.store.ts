import { AuthState } from "@/src/core/types/auth.types";
import { decodeAccessToken } from "@/src/core/utils/jwt.util";
import { create } from "zustand";
 

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  user: null,

  profile: null,

  isInitialized: false,

  setAuth: (accessToken) => {
    const decoded = decodeAccessToken(accessToken);

    if (!decoded) {
      set({
        accessToken: null,
        user: null,
      });

      return;
    }

    set({
      accessToken,

      user: {
        id: decoded.id,
        mobile: decoded.mobile,
        role: decoded.role,
      },
    });
  },

  setAccessToken: (accessToken) => {
    if (!accessToken) {
      set({
        accessToken: null,
        user: null,
      });

      return;
    }

    const decoded = decodeAccessToken(accessToken);

    if (!decoded) {
      set({
        accessToken: null,
        user: null,
      });

      return;
    }

    set({
      accessToken,

      user: {
        id: decoded.id,
        mobile: decoded.mobile,
        role: decoded.role,
      },
    });
  },

  setProfile: (profile) => {
    set({
      profile,
    });
  },

  setInitialized: (value) => {
    set({
      isInitialized: value,
    });
  },

  clearAuth: () => {
    set({
      accessToken: null,
      user: null,
      profile: null,
    });
  },
}));
