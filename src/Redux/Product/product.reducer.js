import {SET_PRODUCTS} from "../types";


const initialState = {
	// products: [
	// 	{
	// 		id: 1,
	// 		name: 'Phone L1',
	// 		price: 220,
	// 		image: 'https://asset.mediaw.it/wcsstore/MMCatalogAssetStore/asset/images/10/29/102910_5.jpg'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Phone L2',
	// 		price: 330,
	// 		image: 'https://www.three.co.uk/static/images/device_pages/MobileVersion/Samsung/Galaxy_S10_Plus/Prism_White/carousel/4.jpg'
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Phone L3',
	// 		price: 380,
	// 		image: 'https://www.three.co.uk/static/images/device_pages/MobileVersion/Samsung/Galaxy_S10_Plus/Prism_White/carousel/4.jpg'
	// 	}
	// ],
	products: [],
	err: null,
	isLoader: false
};

const reducer = (state = initialState, action) => {
	switch(action.type){
		case SET_PRODUCTS.REQUEST:
			console.log('action>>>', action)
			return {
				...state,
				isLoader: true
			}
			break
		case SET_PRODUCTS.SUCCESS:
			console.log('action>>>', action)
			return {
				...state,
				products: action.products
			}
			break
		default:
			return state
			break

	}
}

export default reducer;