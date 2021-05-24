import React from 'react';
import './App.css';
import Cart from './components/Cart'
import Products from './components/Products'
import styled from 'styled-components'

const Header = styled.header`
box-sizing: border-box;
align-items: center;
display: flex;
justify-content: space-between;
padding: 1em 2em;
width: 100%;
box-shadow: 0 3px 3px 0 rgba(0,0,0,.3);
margin: 0 0 3em 0;
`

function App() {
  return (
    <div className="App">
      <Header>
        <h1>Welcome to our store</h1>
        <Cart />
      </Header>
      <Products />
    </div>
  );
}

export default App;
