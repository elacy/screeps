import {Role} from "roles/role"

export class RoomManager{
    private creepRoles: {[id: string]: Role; } = {};
    private roomName: string;

    constructor(roomName: string, ...creepRoles: Role[]){
        this.roomName = roomName;

        for(var roleIndex in creepRoles){
            var role = creepRoles[roleIndex];
            this.creepRoles[role.name] = role;
        }
    }

    run(){
        var roleCounts = this.runCreepRoleLogic();
        this.spawnNewCreeps(roleCounts);

        if(Game.time % 10 == 1){
            this.cleanUpCreeps();
            this.logStats(roleCounts);
        }
    }

    private get room():Room{
        return Game.rooms[this.roomName];
    }

    private get firstSpawn():StructureSpawn{
        return this.room.find(FIND_MY_SPAWNS)[0];
    }

    private spawnNewCreeps(roleCounts: {[id:string]: number;}){
        if(!this.firstSpawn || this.firstSpawn.spawning){
            return;
        }

        for(var roleName in this.creepRoles){
            var result = this.creepRoles[roleName].spawnNew(this.firstSpawn, roleCounts[roleName]);

            if(result != ""){
                break;
            }
        }
    }

    private runCreepRoleLogic(): {[id:string]: number;}{
        var roleCounts: {[id: string]: number; } = {};

        for(var creepName in Game.creeps){
            var creep = Game.creeps[creepName];
            this.creepRoles[creep.memory.role].run(creep);

            if(!roleCounts[creep.memory.role]){
                roleCounts[creep.memory.role] = 1;
            }
            else{
                roleCounts[creep.memory.role]++;
            }
        }

        return roleCounts;
    }

    private logStats(roleCounts: {[id:string]: number;}){
        var details = '-------\r\nGame Time: ' + Game.time.toString();

        for(var roleCount in roleCounts){
            details += `\r\n${roleCount}: ${roleCounts[roleCount]}`;
        }

        console.log(details);
    }

    private cleanUpCreeps(){
        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }
}
