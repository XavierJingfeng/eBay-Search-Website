export class ItemModel {
	constructor(
	public id : number,
	public imageURL : string,
	public title : string,
	public price : string,
	public shippingCost : string,
	public zip : string,
	public seller : string,
	
	public ebayId : string,
	public subtitle : string,
	// shipping Info
	public shippingLocation: string,
	public handlingTime : string,
	public expeditedShipping : string,
	public onedayShipping: string,
	public returnAccepted: string,
	public viewItemURL: string
	){}
	
}
