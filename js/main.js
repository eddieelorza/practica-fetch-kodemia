const getUser = async() =>{
    let response = await fetch('https://kodemia-edd-default-rtdb.firebaseio.com/koders/.json');
    let data = await response.json();
    return data;
}

const printUsers = async() =>{
    let peopleList = document.getElementById("people-list")
    peopleList.innerText = ""
    let users = await getUser();
    console.log(users)
    let usersArray = Object.keys(users);
    usersArray.forEach((keys)=>{
        let {name, lastname, email} = users[keys]
       
        //creamos el tr principal 
        let trObject = document.createElement("tr")
        //creamos los td
        let tdName = document.createElement("td")
        let tdLastName = document.createElement("td")
        let tdEmail = document.createElement("td")
        let tdButton = document.createElement("td")
        let btnDelete = document.createElement("button")
        btnDelete.classList.add(..."btn btn-danger delete".split(" "))
        btnDelete.addEventListener("click", () =>{
            deleteKoder(keys)
            
        })
        
        //creamos los textos que llevaria cada td
        let names = document.createTextNode(`${name}`)
        let lastNames = document.createTextNode(` ${lastname}`)
        let emails = document.createTextNode(` ${email}`)
        let deleteText = document.createTextNode(`Eliminar`)
        //dentro de cada td asignamos los textos
        tdName.appendChild(names)
        tdLastName.appendChild(lastNames)
        tdEmail.appendChild(emails)
        btnDelete.appendChild(deleteText)
        tdButton.appendChild(btnDelete)
        //
        trObject.append(tdName,tdLastName,tdEmail,tdButton)
        //
        peopleList.appendChild(trObject) 

        
    })
} 


const deleteKoder = async (koderKey) => {
    let response = await fetch(
      `https://kodemia-edd-default-rtdb.firebaseio.com/koders/${koderKey}/.json`,
      {
        method: "DELETE",
      }
    );
    let data = await response.json();
    printUsers()
    return data;
    
  };

  const createKoder = async (koderObject) => {
    let response = await fetch(
      "https://kodemia-edd-default-rtdb.firebaseio.com/koders/.json",
      {
        method: "POST",
        body: JSON.stringify(koderObject),
      }
    );
    let data = await response.json();
    console.log(data);
    printUsers();

    return data;
  };

    const updateKoder = async (koderKey, koderObject) => {
    let response = await fetch(
        `https://kodemia-edd-default-rtdb.firebaseio.com/koders/${koderKey}/.json`,
        {
        method: "PATCH",
        body: JSON.stringify(koderObject),
        }
    );
    let data = await response.json();
    return data;
    };

   

const createFromForm = () => {
    let inputPeople = document.querySelectorAll('#list-input .input-element')
    let objectPeople = {}
    inputPeople.forEach((item) =>{
        let text = item.name;
        let value = item.value;
        objectPeople[text] = value
      
    
    })
    createKoder(objectPeople)
    
}
document.getElementById("add-button").addEventListener("click", createFromForm)












printUsers();