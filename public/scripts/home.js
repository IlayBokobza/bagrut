
async function fetchData(){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const title = document.getElementById('title')
    const subheading = document.getElementById('subheading')

    if(!id){
        alert("missing id, please login")
        return;
    }

    const res = await fetch(`/api/user?id=${id}`)
    
    if(res.status !== 200){
        alert(`Error! - ${res.status}`)
        location.replace('/index.html')
        return;
    }

    const user = await res.json()

    title.textContent = `Hello, ${user.name}`
    subheading.textContent = `Your email is ${user.email}`
}

fetchData()