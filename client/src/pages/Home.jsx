import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [user,setUser] = useState()
    const [text,setText] = useState()
    const [notes,setNotes] = useState([])
    const naviagate = useNavigate()


    useEffect(() => {
        (async function(){
           const res = await fetch('/api/user/me') 

           if(res.status !== 200){
           naviagate('/login')
            return;
           }

           setUser(await res.json())

           //fetch notes
           const nres = await fetch('/api/note')
           
           
           if(nres.status !== 200){
            console.log(await nres.text())
            return;
           }
           
           setNotes(await nres.json())
        })()
    },[])

    async function createNote(){
        if(!text) return;

        const res = await fetch('/api/note',{
            method:"POST",
            body:JSON.stringify({text}),
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(res.status !== 200){
            console.error(await res.text())
            return;
        }

        const _id = await res.text()
        setNotes([...notes,{_id,text}])
        setText("")
    }

    return !user ? <h1>loading</h1> : (
        <main>
            <h1>Hello {user.name}</h1>
            <div>
                <input value={text} onChange={(v) => setText(v.target.value)} type="text" />
                <button onClick={createNote}>Create</button>
            </div>
            <h3>Notes</h3>
            {notes.map(n => (
                <div key={n._id}>
                    {n.text}
                </div>
            ))}
        </main>
    );
}