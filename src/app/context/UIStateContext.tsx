import React, { createContext, useContext } from 'react';
import type { UIState } from '../types/uiState';

export const UIStateContext = createContext<{
    uiState: UIState;
    setUIState: React.Dispatch<React.SetStateAction<UIState>>;
} | undefined>(undefined);

export function useUIState() {
    const ctx = useContext(UIStateContext);
    if (!ctx) throw new Error('useUIState must be used within UIStateProvider');
    return ctx;
}
