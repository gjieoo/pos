'use strict'

let buildItemsCount=(allItems,inputs)=>{

  let cartItems=[];
  for(let input of inputs){
    let splitedInput=input.split('-');
    let barcode=splitedInput[0];
    let count=parseFloat(splitedInput[1] || 1);

    let cartItem=cartItems.find(cartItem=>(cartItem.item.barcode===barcode));

    if(cartItem){
      cartItem.count++;
    }
    else{
      let item=allItems.find(item=>(item.barcode===barcode));
      cartItems.push({item:item,count:count});
    }
  }
  return cartItems;
};

let buildItemsSubtotal=(promotions, cartItems)=>{

  return cartItems.map(cartItem=>{
    let subtotal;
    let promotion=promotions.find(promotion=>(promotion.type==='BUY_TWO_GET_ONE_FREE'));
    if(promotion){
      let count=parseInt(cartItem.count/3);
      subtotal=cartItem.item.price*(cartItem.count-count);
    }
    else{
      subtotal=cartItem.item.price*cartItem.count;
    }
    return {cartItem:cartItem,subtotal:subtotal};
  });

};
