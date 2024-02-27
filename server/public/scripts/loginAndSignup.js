const signUpForm = document.getElementById('signup-form')
const loginForm = document.getElementById('login-form')

function getJSONfromForm(target){
    const formData = new FormData(target)
    const object = {};
    formData.forEach((value, key) => object[key] = value);
    return JSON.stringify(object);
}

signUpForm?.addEventListener('submit',async e => {
    e.preventDefault()
    
    const res = await fetch('/api/signup',{
        method:"POST",
        body:getJSONfromForm(e.target),
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(res.status === 201){
        const id = await res.text()
        location.replace(`/home.html?id=${id}`)
    }
    else{
        alert("Error! " + res.status)
    }
})

loginForm?.addEventListener('submit',async e => {
    e.preventDefault()
    
    const res = await fetch('/api/login',{
        method:"POST",
        body:getJSONfromForm(e.target),
        headers:{
            "Content-Type":"application/json"
        }
    })

    if(res.status === 200){
        const id = await res.text()
        location.replace(`/home.html?id=${id}`)
    }
    else{
        alert("Error! " + res.status)
    }
})