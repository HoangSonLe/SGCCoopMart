import {createDate} from './FunctionByMySelf'
export function findProductItemInLocal(comboInform) {
    let cartLocal = JSON.parse(localStorage.getItem('cart'));
    let cart = (cartLocal !== null) ? cartLocal : { productListInCart: [], totalPrice: 0, totalProduct: 0 };
    let item = cart.productListInCart.find(e => {
        return e.comboInform.combo.Id == comboInform.combo.Id;
    });
    return item;
}
export function addProductInCart(comboInform, quantity) {
    let cartProduct = {
        comboInform: comboInform,
        quantity: quantity,
        storeId: null,
        dateDelivery: new Date(Date.now()),
        note: null
    }
    console.log("func",cartProduct.dateDelivery)

    let cartLocal = JSON.parse(localStorage.getItem('cart'));
    let cart = (cartLocal !== null) ? cartLocal : { productListInCart: [], totalPrice: 0, totalProduct: 0 };
    let e = cart.productListInCart.find(e => {
        return e.comboInform.combo.Id == comboInform.combo.Id;
    });

    (e !== undefined) ? e.quantity += quantity : cart.productListInCart.push(cartProduct);

    cart.totalPrice += quantity * comboInform.combo.TotalPrice;
    cart.totalProduct += quantity;

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
}
export function changeQuantityProductInCart(comboInform, quantity) {
    let cartLocal = JSON.parse(localStorage.getItem('cart'));
    let cart = (cartLocal !== null) ? cartLocal : {};

    if (Object.keys(cart).length !== 0) {
        //tìm vị trí của comboInform
        let index = cart.productListInCart.findIndex(e => {
            return e.comboInform.combo.Id == comboInform.combo.Id;
        });
        //gán comboInform
        let p = (index !== -1) ? cart.productListInCart[index] : null;

        if (p !== null) {
            (p.quantity + quantity > 0) ? p.quantity += quantity : cart.productListInCart.splice(index, 1);
        }

        cart.totalPrice += quantity * comboInform.combo.TotalPrice;
        cart.totalProduct += quantity;
        if (cart.totalProduct == 0) {
            localStorage.removeItem("cart");
            cart = { productListInCart: [], totalPrice: 0, totalProduct: 0 };
        }
        else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    return cart;
}
export function changeInformProductItem(data) {
    let cartLocal = JSON.parse(localStorage.getItem('cart'));
    let cart = (cartLocal !== null) ? cartLocal : {};

    if (Object.keys(cart).length !== 0) {
        //tìm vị trí của comboInform
        let index = cart.productListInCart.findIndex(e => {
            return e.comboInform.combo.Id == data.comboInform.combo.Id;
        });
        //gán comboInform
        let p = (index !== -1) ? cart.productListInCart[index] : null;

        if (p !== null) {
            p.note = data.note;
            p.dateDelivery = data.dateDelivery;
            p.storeId = data.storeId
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}

export function groupComboByStoreID(cartInform,customerInform,receiverInform,){
    let cartLocal = JSON.parse(localStorage.getItem('cart'));

    let cart = (cartLocal !== null) ? cartLocal : { productListInCart: [], totalPrice: 0, totalProduct: 0 };

    let dataReturn={
        customerInform:customerInform,
        receiverInform:receiverInform,
        cartGroup:null,
        totalPrice:cart.totalPrice
    }

    let res=cart.productListInCart.reduce(function(result, current) {
        if(result.length <= 0 ) {
          result.push([current]);
          }
        else {
        let item = result.find(e=>{
            return checkSame(current,e)!== undefined;
          });

          (item!== undefined) ? item.push(current) : result.push([current]);
        }
        return result;
        
    }, []);
    console.log("cartGroup",res);

    dataReturn.cartGroup= res;
    console.log("dataCartGroup",dataReturn)
    return dataReturn;
}
function checkSame(comboInform,list){
    let res= list.find(e=>{
        let dateA= new Date(e.dateDelivery)
        let dateCurrent= new Date(comboInform.dateDelivery)
      return (e.storeId == comboInform.storeId && createDate(dateA) == createDate(dateCurrent));
    })
    return res;
  }
  