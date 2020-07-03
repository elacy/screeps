// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
}

interface Memory {
  state: any;
  orders: string[];
  requests: string[];
  goals: string[];
  version: string;
  repositories: { [id: string]: { [id: string]: any } };
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
