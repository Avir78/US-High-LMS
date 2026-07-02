import { create } from 'zustand';
import { Simulation } from '@/types';

interface SimulationState {
  simulations: Simulation[];
  activeSimulation: Simulation | null;
  setSimulations: (simulations: Simulation[]) => void;
  setActiveSimulation: (simulation: Simulation | null) => void;
  addSimulation: (simulation: Simulation) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  simulations: [],
  activeSimulation: null,
  setSimulations: (simulations) => set({ simulations }),
  setActiveSimulation: (simulation) => set({ activeSimulation: simulation }),
  addSimulation: (simulation) =>
    set((state) => ({
      simulations: [simulation, ...state.simulations],
    })),
}));
