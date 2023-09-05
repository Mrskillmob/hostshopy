import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { About } from './Pages/About/About';
import { ErrorPage } from './Pages/ErrorPage/ErrorPage';
import { Main } from './Pages/Main/Main';
import { Shop } from './Pages/Shop/Shop';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { Tos } from './Pages/FooterStuff/Tos';
import { PrivacyP } from './Pages/FooterStuff/PrivacyP';
import { RefundP } from './Pages/FooterStuff/RefundP';
import { Profile } from './Pages/Profile/Profile';
import { Success } from './Pages/Success/Success';
import { AddItems } from './Pages/AddItems/AddItems';
import { Item } from './Pages/Item/Item';
import { Cart } from './Pages/Cart/Cart';
import { useAuth } from './Components/useAuth';
import { Admin } from './Pages/Admin/Admin'
import { Feedback } from './Pages/Feedback/Feedback'

function App() {
  
  const authUser = useAuth();

  const RequireAuth = ({ children }) => {
    return authUser ? children : <Navigate to="/shopy/login" />
  };
  
  return (
    <div className="App">
     
    
     <BrowserRouter>
      <Routes>
          <Route  path="/shopy" element={<Main />} />
          <Route  path="/shopy/about" element={<About />} />
          <Route  path="*" element={<ErrorPage/>} />
          <Route  path='/shopy/login' element={<Login/>} /> 
          <Route  path='/shopy/register' element={<Register/>} />
          <Route  path='/shopy/tos' element={<Tos/>} />
          <Route  path='/shopy/privacypolicy' element={<PrivacyP/>} />
          <Route  path='/shopy/refundpolicy' element={<RefundP/>} />
          <Route  path='/shopy/success' element={<Success/>} />

          {/* All of these below will require use to be logged in otherwise they get redirected to /login*/}
          <Route  path='/shopy/profile' element={<RequireAuth> <Profile/> </RequireAuth>} />
          <Route  path='/shopy/addItem' element={<RequireAuth> <AddItems/> </RequireAuth>} />
          <Route path="/shopy/item/:itemId" element={<RequireAuth> <Item/> </RequireAuth>} />
          <Route path="/shopy/cart" element={<RequireAuth> <Cart/> </RequireAuth>} />
          <Route  path='/shopy/shop' element={<RequireAuth> <Shop/> </RequireAuth>} />
          <Route  path='/shopy/admin' element={<RequireAuth> <Admin/> </RequireAuth>} />
          <Route  path='/shopy/feedback' element={<RequireAuth> <Feedback/> </RequireAuth>} />
          
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
