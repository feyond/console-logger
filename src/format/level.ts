import format, { Format } from "./format";
import { colors } from "../levels";

export interface LevelFormat {
	(): Format<void>;
}

const level: LevelFormat = format((info) => {
	return { value: `${info.level}`, style: colors[info.level].capitalize.toString() };
});

export default level;
