function totaPricePrint(countTag, priceTag) {
    let total = numberReplace(priceTag.innerText) * countTag.innerText;
    total = total.toLocaleString('ko-KR');
    return total;
}

function numberReplace(element) {
    let result = Number(element.replace(/,/g, ""));
    return result;
}