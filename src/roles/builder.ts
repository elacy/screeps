import {RoleBase} from "roles/roleBase"

export class BuilderRole extends RoleBase<BuilderMemory>{
    onRun(creep: Creep, creepMemory: BuilderMemory) {
	    if(creepMemory.isBuilding && creep.carry.energy == 0) {
            creepMemory.isBuilding = false;
            creep.say('🔄 harvest');
        }

	    if(!creepMemory.isBuilding && creep.carry.energy == creep.carryCapacity) {
	        creepMemory.isBuilding = true;
	        creep.say('🚧 build');
	    }

	    if(creepMemory.isBuilding) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	};

    name: string = 'builder';

    bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
}
