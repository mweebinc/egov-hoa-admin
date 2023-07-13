import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppProvider from "./AppProvider";
import SignInPage from "./pages/signin/SignInPage";
import MainPage from "./pages/main/MainPage";
import SignUpPage from "./pages/signup/SignUpPage";
import AccessDeniedPage from "./pages/denied";
import Queue from "nq";
import RedirectPage from "./pages/RedirectPage";
import TestPage from "./pages/TestPage";
import TenantPage from "./pages/TenantPage";

Queue.setUrl('https://api.innque.com/v1');
Queue.setApplicationId("82fj5Z5NXY");
function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<TestPage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signin/:masterKey" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/redirect/:id" element={<RedirectPage/>}/>
                    <Route path="/app" element={<TenantPage/>}/>
                    <Route path="/*" element={<MainPage/>}/>
                    <Route path={"/denied"} element={<AccessDeniedPage/>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
