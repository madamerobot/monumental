import React, { createContext, useContext } from 'react';
import type { RobotState } from '../types/robotState';

export const RobotStateContext = createContext<{
    robotState: RobotState;
    setRobotState: React.Dispatch<React.SetStateAction<RobotState>>;
} | undefined>(undefined);

export function useRobotState() {
    const ctx = useContext(RobotStateContext);
    if (!ctx) throw new Error('useRobotState must be used within RobotStateProvider');
    return ctx;
}
