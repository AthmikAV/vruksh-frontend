export const protectedNavigate = (navigate, user, path) => {
  if (!user) {
    navigate('/login', { state: { from: path } });
  } else {
    navigate(path);
  }
};