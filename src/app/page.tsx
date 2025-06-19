'use client';

import React, { useState } from 'react';
import Preview from '../components/Preview';
import UIControls from '../components/UIControls';
import { RobotStateContext } from "./context/RobotStateContext";
import { UIStateContext } from "./context/UIStateContext";
import type { UIState } from './types/uiState';
import type { RobotState } from './types/robotState'
import { SystemHealthContext, SystemHealthState } from './context/SystemHealthContext';

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

const initialSystemState: SystemHealthState = {
  errors: [],
  webSocketConnection: 'waiting'
}

export default function Page() {

  const [robotState, setRobotState] = useState<RobotState>(initialRobotState);
  const [uiState, setUIState] = useState<UIState>(initialUIState);
  const [systemState, setSystemState] = useState<SystemHealthState>(initialSystemState);

  return (
    <UIStateContext.Provider value={{ uiState, setUIState }}>
      <RobotStateContext.Provider value={{ robotState, setRobotState }}>
        <SystemHealthContext.Provider value={{ systemState, setSystemState }}>
          <main>
            <div className="wrapper">
              <Preview />
              <UIControls />
            </div>
          </main>
        </SystemHealthContext.Provider>
      </RobotStateContext.Provider>
    </UIStateContext.Provider>

  );
}
