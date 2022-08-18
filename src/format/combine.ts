import { Format, TransformFunction } from "./format";
export interface CombineFormat {
	(...formats: Format[]): Format<Format[]>;
}
export const STYLE_PREFIX = "%c";
const combine: CombineFormat = (...formats: Format[]) => {
	return new (class extends Format {
		transform: TransformFunction<Format[]> = (entry) => {
			const messages: string[] = [];
			const styles: string[] = [];
			let params: any[] = [];
			for (const fmt of formats) {
				const output = fmt.transform(entry, fmt.options);
				if (typeof output === "string") {
					//TODO 判断是否包含%c, 包含几个, styles.push("") 或者 escape
					messages.push(output);
				} else if (Array.isArray(output)) {
					params = [...output];
				} else {
					//TODO 判断是否包含多个%c
					output.style && !output.value.startsWith(STYLE_PREFIX) ? messages.push(STYLE_PREFIX + output.value) : messages.push(output.value);
					output.style && styles.push(output.style);
				}
			}

			return [messages.join(" "), ...styles, ...params];
		};
	})();
};

export default combine;
