# 🤖 Monumental - Robotic Arm Simulation

A real-time 3D robotic arm simulation and control interface built with Next.js, React Three Fiber, and WebSocket communication.

## 🎯 Project Overview

Monumental is an interactive web application that simulates a 4-degree-of-freedom robotic arm with real-time 3D visualization and intuitive control interfaces. The project demonstrates advanced robotics concepts including inverse kinematics, motion trajectory planning, and real-time state management.

> **Note**: This is the frontend application for the Monumental robotic arm simulation. The backend API is maintained as a separate project at [monumental-api](https://github.com/madamerobot/monumental-api). Please install and run separately.

### ✨ Key Features

- **Real-time 3D Visualization**: Interactive 3D robotic arm model using React Three Fiber
- **Intuitive Controls**: Dial and slider inputs for precise joint control
- **Coordinate-based Positioning**: Direct XYZ coordinate input for end-effector positioning
- **WebSocket Communication**: Real-time bidirectional communication with robot simulation backend
- **Motion Trajectory Planning**: Smooth interpolation between joint positions
- **System Health Monitoring**: Real-time error reporting and connection status

## 🏗️ Architecture

### Frontend (Next.js 15 + React 19)
- **3D Visualization**: React Three Fiber with Drei components
- **State Management**: React Context API for robot state, UI state, and system health
- **Real-time Communication**: WebSocket hooks for backend communication
- **Type Safety**: Full TypeScript implementation with strict typing

### Backend [monumental-api](https://github.com/madamerobot/monumental-api)
- **Motion Planning**: Inverse kinematics and trajectory generation
- **Real-time Updates**: WebSocket server for live state synchronization
- **Robot Simulation**: Mathematical modeling of robotic arm kinematics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monumental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
      NEXT_PUBLIC_WS_URL=ws://localhost:3001
      NEXT_PUBLIC_SOCKET_PORT=3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### Joint Control
- **Base Rotation**: Use the dial to rotate the base of the robotic arm
- **Elbow Rotation**: Control the elbow joint angle
- **Wrist Rotation**: Adjust the wrist joint orientation
- **Lift Height**: Control vertical positioning [not functional]
- **Gripper Opening**: Adjust the gripper aperture [not functional]

### Coordinate Control
- **XYZ Positioning**: Input specific coordinates to position the end-effector
- **Real-time Updates**: See the arm move smoothly to target positions
- **Inverse Kinematics**: Automatic joint angle calculation for desired positions

### System Monitoring
- **Connection Status**: Real-time WebSocket connection monitoring
- **Error Reporting**: Live error messages and system health updates
- **Status Terminal**: Visual feedback for all system operations

## 🛠️ Development

### Project Structure
```
monumental/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Preview/          # 3D visualization components
│   │   │   └── UIControls/       # Control interface components
│   │   ├── context/              # React Context providers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── types/                # TypeScript type definitions
│   │   └── page.tsx              # Main application page
│   └── ...
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **3D Graphics**: React Three Fiber, @react-three/drei
- **Styling**: Tailwind CSS, CSS Modules
- **Real-time**: WebSocket API
- **Backend**: Node.js, WebSocket server (separate project)
- **Development**: ESLint, TypeScript

## 🔧 Configuration

### Robot Parameters
The robotic arm configuration can be adjusted in the `RobotConfigContext`:

```typescript
const robotConfig = {
  baseHeight: 0,
  shoulderLength: 2.872,
  forearmLength: 3.064,
  wristLength: 4.2,
  maxReach: 0,
  minReach: 0
}
```

### WebSocket Configuration
- **Default URL**: `ws://localhost:3001`
- **Port**: Configurable via `NEXT_PUBLIC_SOCKET_PORT`
- **Message Types**: `updateJoint`, `updatePose`, `updateGripper`, `updateLift`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Three Fiber** for 3D graphics capabilities
- **Next.js** for the robust React framework
- **WebSocket API** for real-time communication
