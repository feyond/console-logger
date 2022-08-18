const colors = {
	white: "white",
	black: "black",
	silver: "silver",
	gray: "gray",
	red: "#E86C5D",
	green: "#74ED7B",
	blue: "#3F6FFB",
	gold: "gold",
	yellow: "yellow",
	pink: "pink",
	cyan: "cyan",
};
const lib = {
	big: "font-size: 2em",
	bold: "font-weight: bold",
	italic: "font-style: italic",
	underline: "text-decoration: underline",
	capitalize: "text-transform: capitalize",
	shadow: "text-shadow: -1px 1px rgba(0,0,0,.5)",
};

const _styles: Record<string, string> = { ...lib };
for (const key in colors) {
	const bgKey = "bg" + key.replace(/\b\w/g, (c) => c.toUpperCase());
	_styles[key] = `color:${Reflect.get(colors, key)}`;
	_styles[bgKey] = `background:${Reflect.get(colors, key)};`;
}
type UppercaseHeadLetter<T> = T extends `${infer FirstLetter}${infer _Rest}` ? `${Uppercase<FirstLetter>}${_Rest}` : T;
type StyleKey = keyof typeof colors | keyof typeof lib | `${"bg"}${UppercaseHeadLetter<keyof typeof colors>}`;
const baseStyles = "border-radius:3px; padding: 0 3px;";

class ConsoleStyle {
	style: string = baseStyles;

	clear() {
		this.style = baseStyles;
		return this;
	}

	addStyle(value: string) {
		this.style = this.style + ";" + value;
		return this;
	}

	toString() {
		const rnt = this.style;
		this.clear();
		return rnt;
	}
}

type StyleMethod<T extends string> = {
	[K in T]: StyleMethod<T> & ConsoleStyle;
};

export type Style = StyleMethod<StyleKey> & ConsoleStyle;

const styles = () => {
	const __styles = new ConsoleStyle();
	const instance = new Proxy(__styles, {
		get: (target, prop) => {
			return prop in target ? Reflect.get(target, prop) : __styles;
		},
	}) as Style;

	const define = (name: string, value: string) => {
		Reflect.defineProperty(instance, name, {
			get() {
				__styles.addStyle(value);
				return instance;
			},
		});
	};

	for (const key in _styles) {
		define(key, Reflect.get(_styles, key));
	}
	return instance;
};

export default styles;
