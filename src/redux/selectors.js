export const isLogIn = (state) => state.auth.isLoggedIn;
export const isLoading = (state) => state.auth.isLoading;
export const selectorLogin = (state) => state.auth.user.login;
export const selectorUserId = (state) => state.auth.user.userId;
export const selectorAvatar = (state) => state.auth.user.imageAvatar;
