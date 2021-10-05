//! I know that saving the token in localStorage isn't a great idea,
//! but I'm doing this just for demonstration purposes.

export function saveToken(token: string) {
  localStorage.setItem('jwt', token);
}

export function getToken() {
  return localStorage.getItem('jwt');
}
