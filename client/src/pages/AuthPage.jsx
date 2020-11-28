import React, { useEffect, useState,useContext } from 'react';
import { useMessage } from '../hooks/message.hook';
import "./../App.css"
import {useHttp} from "./../hooks/http.hook"
import {AuthContext} from './../context/AuthContext'
import './../App.css'



const AuthPage = () => {
    const {loading,error,request,clearError} =useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const [form,setForm]=useState({
     email:'',
     password:''
    })
    useEffect(()=>{
       message(error)
        clearError()
    }, [error,message,clearError])
    
    useEffect( ()=>{
        window.M.updateTextFields()
    })
    
    const changeHandler = event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    
    const registerHandler =async()=>{
        try {
            const data = await request('/api/auth/register','POST',{...form})
            message(data.message)
        } catch (e) {
            
        }
    }
    const loginHandler =async()=>{
        try {
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
        } catch (e) {
            
        }
    }
    
    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h1 className="title">ShortLinkSite</h1>
                <h2 className="author">Табакман И.Д.</h2>
                <h3 className="ikg">ИЭУИС 4-4</h3>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className="input-field ">
                            <input 
                            placeholder="Введите E-mail" 
                            id="Email" 
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}>
                            </input>
                            <label htmlFor="Email">E-mail</label>
                        </div>
                        <div className="input-field ">
                            <input 
                            placeholder="Введите Password" 
                            id="password" 
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={changeHandler}>
                            </input>
                            <label htmlFor="Password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn teal darken-2" onClick={loginHandler} disabled={loading}>Войти</button>
                        <button className="btn teal darken-4" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;