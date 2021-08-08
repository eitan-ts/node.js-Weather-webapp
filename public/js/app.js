const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



// messageOne.textContent = 'Text'

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = searchElement.value

   messageOne.textContent = ''
   messageTwo.textContent = ''

    fetch('/weather?adress=' + location).then((res) =>{
        res.json().then((data) => {
            if(data.error)
                return messageOne.textContent = data.error
            else
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
        })
    })
})