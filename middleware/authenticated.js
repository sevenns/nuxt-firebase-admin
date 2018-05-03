export default function ({ store, redirect, route }) {
  const user = store.getters['user/GET']

  if (user && route.path === '/') {
    redirect('/profile')
  }

  if (!user && isAdminRoute(route)) {
    redirect('/')
  }
}

function isAdminRoute (route) {
  const matched = route.matched.some(record => record.path.includes('/profile'))

  return matched
}