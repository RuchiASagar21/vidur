export default defineNuxtRouteMiddleware(async (to) => {
  const auth = await useAuth();
  const { redirectToLogin } = useSafeRedirectToLogin();
  
  if (!auth.isSignedIn.value) {
    return redirectToLogin(to.fullPath);
  }

  const session = auth.user;
  if (!session.value?.profile.isAdmin) {
    return navigateTo('/');
  }
});
