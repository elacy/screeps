import {RoleBase} from "roles/roleBase"

export class HarvesterRole extends RoleBase<CreepMemory>{
    onRun(creep: Creep, memory: CreepMemory) {
        if(creep.carry.energy < creep.carryCapacity){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0]);
            }
        }
        else {
            var spawn = creep.room.find(FIND_MY_SPAWNS)[0]

            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(spawn);
            }
        }
    };

    name: string = 'harvester';

    bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
}
