// ============================================================
// ARKZEN GENERATED — Route Registry (React+Vite)
// Scoped to: rubik-solver (exported standalone)
// ============================================================
import React from 'react'
import { lazy, ComponentType } from 'react'

export interface ArkzenRoute {
  path:      string
  name:      string
  tatemono:  string
  component: ComponentType
  auth:      boolean
}

const ArkzenPage_RubikSolver_Index = lazy(() => import('@/pages/index'))

export const ARKZEN_ERROR_BOUNDARIES: Record<string, React.ComponentType<{ children: React.ReactNode }>> = {}

export const ARKZEN_ROUTES: ArkzenRoute[] = [
  { path: '/', name: 'index', tatemono: 'rubik-solver', component: ArkzenPage_RubikSolver_Index, auth: false },
]
