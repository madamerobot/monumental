import React, { createContext, useContext } from 'react';
import type { RobotConfigState } from '../types/robotConfigState';

export const RobotConfigContext = createContext<{
    robotConfigState: RobotConfigState;
    setRobotConfigState: React.Dispatch<React.SetStateAction<RobotConfigState>>;
} | undefined>(undefined);

export function useRobotState() {
    const ctx = useContext(RobotConfigContext);
    if (!ctx) throw new Error('useRobotConfig must be used within RobotConfigProvider');
    return ctx;
}
