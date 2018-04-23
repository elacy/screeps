import {RoleBase} from "roles/roleBase"

export class UpgraderRole extends RoleBase<UpgraderMemory>{
    onRun(creep: Creep, creepMemory: UpgraderMemory) {
        if(creepMemory.isUpgrading && creep.carry.energy == 0) {
            creepMemory.isUpgrading = false;
            creep.say('🔄 harvest');
        }

	    if(!creepMemory.isUpgrading && creep.carry.energy == creep.carryCapacity) {
	        creepMemory.isUpgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creepMemory.isUpgrading && creep.room.controller) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    };

    name: string = 'upgrader';

    bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
}
