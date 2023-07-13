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
// Queue.setUrl("http://188.166.177.35:8888/v1");
// Queue.setUrl('https://api.figarocoffeegroup.com/v1');
// Queue.setUrl('https://api.test.figarocoffeegroup.com/v1');
// Queue.setUrl('https://api.mercantiletravel.com/v1');
// Queue.setApplicationId('DHQK1WV3bj');// cavite
// Queue.setApplicationId('6560588f36297abd70cb7433774d5e09');

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
