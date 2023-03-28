import { useLocation } from 'react-router-dom'

export const isActiveLink = (to: string) => useLocation().pathname === to
