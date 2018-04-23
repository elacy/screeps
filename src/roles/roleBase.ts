import {Role} from "roles/role"

export abstract class RoleBase<TMemory extends CreepMemory> implements Role{
    abstract name: string;

    run(creep: Creep): void {
        this.onRun(creep, creep.memory as TMemory);
    };

    spawnNew(spawn:StructureSpawn, currentCount: number): ScreepsReturnCode | string{
        if(currentCount > 3){
            return "";
        }

        var result = spawn.createCreep(this.bodyParts, this.name + Game.time.toString(), {
            role: this.name
        });

        if(result == OK){
            console.log(`Spawning a ${this.name} at ${Game.time}`);
        }

        return result;
    }

    protected abstract onRun(creep: Creep, memory: TMemory): void;

    protected abstract bodyParts: BodyPartConstant[];
}
