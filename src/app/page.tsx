'use client';

import React, { useState } from 'react';
import Preview from '../components/Preview';
import UIControls from '../components/UIControls';
import { RobotStateContext } from "./context/RobotStateContext";
import { UIStateContext } from "./context/UIStateContext";
import { SystemHealthContext, SystemHealthState } from './context/SystemHealthContext';
import { RobotConfigState } from './types/robotConfigState';
import { RobotConfigContext } from './context/RobotConfigContext';
import type { UIState } from './types/uiState';
import type { RobotState } from './types/robotState'

const initialRobotState: RobotState = {
  base: 0,
  lift: 0,
  elbow: 0,
  wrist: 0,
  gripper: 0,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const initialUIState: UIState = {
  base: 0,
  lift: 0,
  elbow: 0,
  wrist: 0,
  gripper: 0,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const initialRobotConfigState: RobotConfigState = {
  baseHeight: 0,
  shoulderLength: 2.872,
  forearmLength: 3.064,
  wristLength: 4.2,
  maxReach: 0,
  minReach: 0,
  // potentially add min and max values for angles
}

const initialSystemState: SystemHealthState = {
  errors: [],
  webSocketConnection: 'waiting'
}

export default function Page() {

  const [robotState, setRobotState] = useState<RobotState>(initialRobotState);
  const [robotConfigState, setRobotConfigState] = useState<RobotConfigState>(initialRobotConfigState);
  const [uiState, setUIState] = useState<UIState>(initialUIState);
  const [systemState, setSystemState] = useState<SystemHealthState>(initialSystemState);

  return (
    <UIStateContext.Provider value={{ uiState, setUIState }}>
      <RobotStateContext.Provider value={{ robotState, setRobotState }}>
        <SystemHealthContext.Provider value={{ systemState, setSystemState }}>
          <RobotConfigContext.Provider value={{ robotConfigState, setRobotConfigState }}>
            <main>
              <div className="wrapper">
                <Preview />
                <UIControls />
              </div>
            </main>
          </RobotConfigContext.Provider>
        </SystemHealthContext.Provider>
      </RobotStateContext.Provider>
    </UIStateContext.Provider>

  );
}
