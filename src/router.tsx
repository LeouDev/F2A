import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from './components/layout/Layout'
import { NotFoundContent, PageLoader, RouteError } from './components/layout/RouteStates'
import Home from './pages/Home'

// Every page except Home is code-split and loaded on navigation.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    HydrateFallback: PageLoader,
    errorElement: <RouteError />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { index: true, Component: Home },
          { path: 'cars', lazy: page(() => import('./pages/Cars')) },
          { path: 'cars/:id', lazy: page(() => import('./pages/CarDetail')) },
          { path: 'sell-your-car', lazy: page(() => import('./pages/SellYourCar')) },
          { path: 'trade', lazy: page(() => import('./pages/Trade')) },
          { path: 'consign', lazy: page(() => import('./pages/Consign')) },
          { path: 'financing', lazy: page(() => import('./pages/Financing')) },
          { path: 'about', lazy: page(() => import('./pages/About')) },
          { path: 'vlogs', lazy: page(() => import('./pages/Vlogs')) },
          { path: 'contact', lazy: page(() => import('./pages/Contact')) },
          { path: 'privacy', lazy: page(() => import('./pages/Privacy')) },
          { path: 'terms', lazy: page(() => import('./pages/Terms')) },
          { path: '*', Component: NotFoundContent },
        ],
      },
    ],
  },
])
