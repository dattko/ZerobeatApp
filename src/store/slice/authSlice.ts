import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  login as loginApi, 
  getAccessToken as fetchAccessToken, 
  logout as logoutApi, 
  checkPremiumStatus,
  refreshTokens,
} from '@/auth/api/authApi';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  isPremium: boolean | null;
  userProfile: UserProfile | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  isPremium: null,
  userProfile: null,
};

export const login = createAsyncThunk<boolean, void, { rejectValue: string }>(
  'auth/login',
  async (_, { rejectWithValue }) => {
    try {
      const result = await loginApi();
      return !!result?.accessToken;
    } catch (error) {
      return rejectWithValue('로그인 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (error) {
      return rejectWithValue('로그아웃 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  }
);

export const initAuth = createAsyncThunk<boolean, void, { rejectValue: string }>(
  'auth/initAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await fetchAccessToken();
      return !!token;
    } catch (error) {
      return rejectWithValue('인증 초기화 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  }
);

export const checkPremium = createAsyncThunk<boolean, void, { rejectValue: string }>(
  'auth/checkPremium',
  async (_, { rejectWithValue }) => {
    try {
      const token = await fetchAccessToken();
      if (token) {
        return await checkPremiumStatus(token);
      }
      return false;
    } catch (error) {
      return rejectWithValue('프리미엄 상태 확인 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  }
);

export const refreshToken = createAsyncThunk<boolean, void, { rejectValue: string }>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const newToken = await refreshTokens();
      return !!newToken;
    } catch (error) {
      return rejectWithValue('토큰 갱신 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '로그인 실패';
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
        state.isPremium = null;
        state.userProfile = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '로그아웃 실패';
        state.isLoggedIn = false;
        state.isPremium = null;
        state.userProfile = null;
      })
      .addCase(initAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.error = null;
      })
      .addCase(initAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '인증 초기화 실패';
      })
      .addCase(checkPremium.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkPremium.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isPremium = action.payload;
        state.error = null;
      })
      .addCase(checkPremium.rejected, (state, action) => {
        state.isLoading = false;
        state.isPremium = null;
        state.error = action.payload || '프리미엄 상태 확인 실패';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '토큰 갱신 실패';
        state.isLoggedIn = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
