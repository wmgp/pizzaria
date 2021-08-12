let modalQtdPizza = 1;
const dcSelector = (el) => document.querySelector(el)
const dcSelectorAll = (el) => document.querySelectorAll(el)

pizzaJson.map((item, index)=>{
    let pizzaItem = dcSelector('.models .pizza-item').cloneNode(true)

    pizzaItem.querySelector('.pizza-item--img img').src = item.img


    pizzaItem.setAttribute('data-key',index)
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click', e =>{
        e.preventDefault()

        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQtdPizza =1

        dcSelector('.pizzaBig img').src = pizzaJson[key].img
        dcSelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        dcSelector('.pizzaInfo--desc').innerHTML= pizzaJson[key].description
        dcSelector('.pizzaInfo--actualPrice').innerHTML =`R$ ${pizzaJson[key].price.toFixed(2)}`
        dcSelector('.pizzaInfo--size.selected').classList.remove('selected')
        dcSelectorAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex ==2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        }) 

        dcSelector('.pizzaInfo--qt');innerHTML= modalQtdPizza

        windowAreaPizza()
    })
    
    dcSelector('.pizza-area').append(pizzaItem)
}) 
//Abaixo de aside
function windowAreaPizza(){
    dcSelector('.pizzaWindowArea').style.opacity =0
    dcSelector('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
    dcSelector('.pizzaWindowArea').style.opacity =1      
    },500);
}
