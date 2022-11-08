import {createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext()

export const AuthProvider =({children}) => {
    const tokensLocalStorage = JSON.parse(localStorage.getItem("tokens"))
    const onLoadTokens = tokensLocalStorage ? tokensLocalStorage : null
    const decodedToken = tokensLocalStorage ? jwt_decode(tokensLocalStorage.access): null
    const [user, setUser] = useState(() => decodedToken);
    const [tokens, setTokens] = useState(() => onLoadTokens);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateTask, setUpdateTask] = useState(null)
    const [taskId, setTaskId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
   

    const registerUser = async (e) => {
        e.preventDefault()

        const username = e.target.username.value 
        const email = e.target.email.value
        const password1 = e.target.password1.value
        const password2 = e.target.password2.value

        if (username && email && password1 && password2){
            if(password1 === password2){
                setIsLoading(true)
                const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(
                        {
                          "username":username,
                          "email":email,
                          "password":password1  
                            
                        })
                    })
                const data = await response.json()

                response ? setIsLoading(false) : setIsLoading(true)
                
                
                //console.log(data)
                if(response.status === 201){
                    
                    navigate("/login")
                }else if(response.status === 400){
                  
                    if(data.username){
                        alert(data.username[0])
                    }else if(data.email){
                        alert(data.email[0])
                    }else{
                        alert("error occured please check your inputs")
                    }
                }else{
                    
                    alert("error occured")
                }
                
                
            }else{
                alert("passwords entered do not match")
            }

        }else{
            alert("please enter all fields")
        }

        // console.log(username, email, password1, password2)
    }


    const loginUser = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        const data = await response.json()
        response ? setIsLoading(false) : setIsLoading(true)
        if (response.status === 200) {
            setTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("tokens", JSON.stringify(data))
            navigate("/home")
            
            
        }else if(response.status === 401) {
            const errorMessage = "Invalid Credetials"
            setError(errorMessage);
            alert(error)
        }else {
            const errorMessage = "Something went Wrong"
            setError(errorMessage);
            alert(error)
           
        }
    }

    const logoutUser = () => {
        setTokens(null);
        setUser(null)
        localStorage.removeItem("tokens")
        
    }

    const updateUser = async () => {
        console.log("updated token")
        try{
            const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({'refresh': tokens.refresh})
            })
            const data = await response.json()
            if(response.status === 200) {
                setTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem("tokens",JSON.stringify(data));
            }else{
                logoutUser()
            }
        }catch(e){
            console.log(e.message)
        }

    }

    useEffect(() =>{
    const fourMinutes = 1000 * 60 * 4
       const interval = setInterval(() => {
            if(tokens){
                updateUser();
            }
            if(loading){
                updateUser()
            }
        }, fourMinutes)

        return () => clearInterval(interval);
    },[tokens, loading])


    const handleUpdateTodo = async (id) => {
        const response = await fetch(`http://127.0.0.1:8000/api/todo-detail/${id}`, {
          method:"GET",
          headers: {
            "Authorization": "Bearer " + String(tokens.access)
          }
    
        })
        const data = await response.json()
        if (response.status === 200){
            setUpdateTask(data.task)
            setTaskId(data.id)
            navigate("update-todo")
            console.log(data.task)
        }
    }

    if(loading) {
        setLoading(false)
    }

  
    const contextData  ={
        loginUser,user, tokens, logoutUser, registerUser, handleUpdateTodo, updateTask,setUpdateTask,
        taskId, setTaskId, isLoading
    }
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
};

export default AuthContext