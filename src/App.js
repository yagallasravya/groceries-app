import "./App.css";
import Footer from './Components/Footer';
import Header from './Components/Header';
import Content from "./Components/Content";
import { useState, useEffect } from "react";
import AddItem from "./Components/AddItem";
import SearchItem from "./Components/SearchItem";
// import axios from "axios";
import apiRequest from "./Components/apiRequest";


//run json server in groceries app/data with cmd npx json-server --w db.json --port 8000

function App() {
  const URL = "http://localhost:8000/items";
  const [items, setItems] = useState([]);
  //the below line is to get the items from the local storage
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem("shoppingList")) || [])
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw Error("didn't get the expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    // storing the data in local storage under shopping list category
    // localStorage.setItem("shoppingList", JSON.stringify(items))

    // fetchItems();
    (async () => await fetchItems())();
  }, []);

  const addItem = async(item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const latestItem = { id: id, checked: false, item: item };
    items.push(latestItem);
    setItems(items);
     // axios.post("http://localhost:8000/items",latestItem)
     const postOptions={
      method:'POST',
      headers:{
        "content-Type":'application/json'
      },
      body:JSON.stringify(latestItem)
     }
     const result= await apiRequest(URL,postOptions)
     if(result) setFetchError(result)
  };
  const handleClick = async(id) => {
    const listitems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listitems);
    console.log(listitems);
    const updatedItem=listitems.filter((item)=>item.id===id);
    console.log(updatedItem);
    const postOptions={
      method:'PATCH',
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({checked:updatedItem[0].checked})
    }
    const reqUrl=`${URL}/${id}`;
    const result= await apiRequest(reqUrl,postOptions)
     if(result) setFetchError(result)
  };
  const handleDelete =async (id) => {
    const listitems = items.filter((item) => item.id !== id);
    setItems(listitems);
    const deleteOptions={method:'DELETE'}
    const reqUrl=`${URL}/${id}`;
    const result= await apiRequest(reqUrl,deleteOptions)
    if(result) setFetchError(result)

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem);

    setNewItem("");
  };
  return (
    <div className="App">
      <Header heading="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />

      <main>
        {fetchError ? (
          <p style={{ color: "red" }}>Error :{fetchError}</p>
        ) : isLoading ? (
          <p>Loading items...</p>
        ) : (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleClick={handleClick}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
