import React from "react"
import { Switch, Route,Redirect } from "react-router-dom"
import Authpage from "./pages/AuthPage"
import CreatePage from "./pages/CreatePage"
import DetailPage from "./pages/DetailPage"
import LinksPage from "./pages/LinksPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    else {
        return (
            <Switch>
            <Route path="/" exact>
            <Authpage/>
            </Route>
            <Redirect to="/"/>
            </Switch>
        )
    }
}