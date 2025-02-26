import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { requiresAuth } from './loaders/requiresAuth'
import DefaultLayout from './layouts/Default'
import Home from './pages/Home'
import About from './pages/About'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/movies',
        element: <Movies />,
        loader: requiresAuth,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

// // 내보내기
// export // 이름 내보내기(Named Export)
// export default // 기본 내보내기(Default Export)

export default function Router() {
  return <RouterProvider router={router} />
}

// 2시 3분까지 쉬는 시간입니다.
