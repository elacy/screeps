export interface Role {
    name: string;
    run(creep: Creep): void;
    spawnNew(spawn:StructureSpawn, currentCount: number): ScreepsReturnCode | string;
}
