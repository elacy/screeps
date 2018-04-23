import { ErrorMapper } from "utils/ErrorMapper";
import {HarvesterRole} from "roles/harvester"
import {RoomManager} from "roomManager"
import { UpgraderRole } from "roles/upgrader";
import {BuilderRole} from "roles/builder";

var firstRoomName = Object.keys(Game.rooms)[0];

var roomManager = new RoomManager(firstRoomName, new HarvesterRole(), new BuilderRole(), new UpgraderRole());

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  roomManager.run();
});
