let carrinho =[]
let modalkey=0
let modalQtdPizza = 1;
const dcSelector = (el) => document.querySelector(el)
const dcSelectorAll = (el) => document.querySelectorAll(el)

/*Listagem das pizzas */
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
        modalkey=key

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

// Eventos do Modal

function cancelModal(){
    dcSelector('.pizzaWindowArea').style.opacity=0
    setTimeout(() => {
        dcSelector('.pizzaWindowArea').style.display ='none'
    }, 5000);
      
}

dcSelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((e)=>{
    e.addEventListener('click', cancelModal)

})

// Adicionar e Subtrarir
dcSelector('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQtdPizza++
    dcSelector('.pizzaInfo--qt').innerHTML = modalQtdPizza
})

dcSelector('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    dcSelector('.pizzaInfo--qt').innerHTML = modalQtdPizza
    if(modalQtdPizza >1){
        modalQtdPizza--   
    }

})


//Selecionar gramas
dcSelectorAll('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click', ()=>{
        dcSelector('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

dcSelector('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = dcSelector('.pizzaInfo--size.selected').getAttribute('data-key')

    let indentfier = pizzaJson[modalkey].id +'@'+ size

    let key = carrinho.findIndex((item)=> item.indentfier == indentfier)

    if(key >-1){
        carrinho[key].qt +=modalQtdPizza
    }else{
    carrinho.push({
        indentfier,
        id: pizzaJson[modalkey].id,
        size,
        qt:modalQtdPizza
    })}
    updateCarrinho()
    cancelModal()
    
})

function updateCarrinho(){
    if(carrinho.length >0){
        dcSelector('aside').classList.add('show')
        dcSelector('.cart').innerHTML = ''
        let subtotal = 0
        let desconto = 0
        let total = 0
        for(let i in carrinho){
            let pizzaItem = pizzaJson.find((item) => item.id == carrinho[i].id)
            let cartItem = dcSelector('.models .cart--item').cloneNode(true)
            subtotal = pizzaItem.price * carrinho[i].qt

            let pizzaSizeName
            switch (carrinho[i].size){
                case 0:
                    pizzaSizeName ='P'
                    break;
                case 1:
                    pizzaSizeName ='M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(carrinho[i].qt >1){
                    carrinho[i].qt--
                }else{
                    carrinho.splice(i, 1)
                }
                updateCarrinho()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                carrinho[i].qt++
                updateCarrinho()
            })
            dcSelector('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        dcSelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        dcSelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        dcSelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`


    }else{
        dcSelector('aside').classList.remove('show')
    }
}