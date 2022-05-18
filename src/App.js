import './App.css';
import {AboutUs} from './Modules/AboutUs';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Employee} from './Modules/Edit/Employee';
import {CompanyInfo} from './Modules/Edit/CompanyInfo';
import {Charity} from './Modules/Charity';
import {EditBanner} from './Modules/Edit/EditBanner';
import {Store} from './Modules/Edit/EditStore';
import {EditOptions} from './Modules/Edit/EditOptions';
import {EditFaq} from './Modules/Edit/EditFaq';
import {Navigation} from './Navigation';
import {Home} from './Modules/Home';
import {Auction} from './Modules/Listings/Auction';
import {Listing} from './Modules/Listings/Listing';
import {Products} from './Modules/Listings/Products';
import {AddAuction} from './Modules/AddListing/AddAuction';
import {AddProduct} from './Modules/AddListing/AddProduct';
import {Cart} from './Modules/CheckOut/Cart';
import {Success} from './Modules/CheckOut/Success';
import {Login} from './Modules/AddListing/Login';
import {ForgotPassword} from './Modules/AddListing/ForgotPassword';
import {Signup} from './Modules/AddListing/Signup';
import {FAQ} from './Modules/FAQ';
import {Profile} from './Modules/Profile/Profile';
import {EditProfile} from './Modules/Profile/AddProfile';



function App() {

  return (
    <BrowserRouter>
        <div className="App container">
          {/* Navigation Bar DO NOT TOUCH any of the codes here*/}
          {/* Also it is recommended not to rename folder as well*/}
          {/* You can add lines but not remove any current codes you see*/}
          <Navigation />

          {/* This is to link one module to another module, ensure to import the modules else it will not work*/}
          <Routes>
            <Route path='/Modules/AddListing/Login' element={<Login/>}/>
            <Route path='/Modules/AddListing/Signup' element={<Signup/>}/>
            <Route path='/Modules/Home' element={<Home/>}/>
            <Route path='/Modules/AboutUs' element={<AboutUs />} />
            <Route path='/Modules/Charity' element={<Charity />} />
            <Route path='/Modules/Listings/Auction' element={<Auction />} />
            <Route path='/Modules/Listings/Listing' element={<Listing />} />
            <Route path='/Modules/Listings/Products' element={<Products />} />
            <Route path='/Modules/FAQ' element={<FAQ />} />
            <Route path='/Modules/AddListing/AddAuction' element={<AddAuction />} />
            <Route path='/Modules/AddListing/AddProduct' element={<AddProduct />} />
            <Route path='/Modules/AddListing/ForgotPassword' element={<ForgotPassword />} />
            <Route path='/Modules/Edit/Employee' element={<Employee />} />
            <Route path='/Modules/Edit/CompanyInfo' element={<CompanyInfo />} />
            <Route path='/Modules/Edit/EditBanner' element={<EditBanner />} />
            <Route path='/Modules/Edit/EditStore' element={<Store />} />
            <Route path='/Modules/Edit/EditFaq' element={<EditFaq />} />
            <Route path='/Modules/Edit/EditOptions' element={<EditOptions />} />
            <Route path='/Modules/CheckOut/Cart' element={<Cart/>}/>
            <Route path='/Modules/CheckOut/Success' element={<Success/>}/>
            <Route path='/Modules/Profile/Profile' element={<Profile/>}/>
            <Route path='/Modules/Profile/AddProfile' element={<EditProfile/>}/>
          </Routes>
          
        </div>
      </BrowserRouter>
  );
}

export default App;
