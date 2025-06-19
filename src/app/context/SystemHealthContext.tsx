import React, { createContext, useContext } from 'react';
import type { SystemHealthState } from '../types/systemHealthState';

export const SystemHealthContext = createContext<{
    systemState: SystemHealthState;
    setSystemState: React.Dispatch<React.SetStateAction<SystemHealthState>>
} | undefined>(undefined);

export function useSystemHealthState() {
    const ctx = useContext(SystemHealthContext);
    if (!ctx) throw new Error('useSystemHealthState must be used within SystemHealthStateProvider');
    return ctx;
}
