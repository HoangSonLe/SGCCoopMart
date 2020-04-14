export function formatMoney(price){
    return Number(price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}
export function createDate (date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
export function findNameStore(storeID,storeList){
    let item = storeList.find(e => {
        return e.Id == storeID;
    });
    return item.Name;
}