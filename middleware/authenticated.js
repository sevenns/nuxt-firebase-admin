export default function ({ store, redirect, route }) {
  const userExist = !!store.state.user.data

  if (userExist && route.path === '/') {
    redirect('/profile')
  }

  if (!userExist && isAdminRoute(route)) {
    redirect('/')
  }
}

function isAdminRoute (route) {
  if (route.matched.some(record => record.path.includes('/profile'))) {
    return true
  }
}