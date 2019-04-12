export class SearchItem {
	constructor(
		public keyword : string,
		public category: number,
		public condition1: boolean,
		public condition2: boolean,
		public condition3: boolean,
		public shipping1: boolean,
		public shipping2: boolean,
		public distance: number,
		public distance_option: string,
		public zip_code: string
		){}
}
