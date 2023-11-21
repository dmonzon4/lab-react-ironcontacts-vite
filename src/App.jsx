import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";

export default function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));
  const [otherContacts, setOtherContacts] = useState(allContacts.slice(5));

  const addRandomContact = () => {
    if (otherContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherContacts.length);
      const randomContact = otherContacts[randomIndex];
      const updateOtherContacts = otherContacts.filter(
        (contact, index) => index !== randomIndex
      );

      setContacts([...contacts, randomContact]);
      setOtherContacts(updateOtherContacts);
    }
  };

  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContacts(sortedContacts);
  };

  const deleteContact = (index) => {
    setContacts((previousContacts) => {
      const updatedContacts = [...previousContacts];
      updatedContacts.splice(index, 1);
      return updatedContacts;
    });
  };

  return (
    <div>
      <h1>IronContacts</h1>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Poupularity</th>
            <th>Won Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar === true && <p>🏆</p>}</td>
              <td>{contact.wonEmmy === true && <p>🌟</p>}</td>
              <td>
                <button onClick={() => deleteContact(index)}>Delete Contact</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
