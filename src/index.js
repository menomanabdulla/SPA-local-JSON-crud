
let container =  document.createElement('div');
container.className = 'container py-5';
const URL = 'http://localhost:3000/contacts';
let top = `
    <h1 class="display-3 my-5">Ajax Crude</h1>
    <div class="row">
        <div class="col">
            <input type="text" placeholder="Enter Name" id="nameField" class="form-controll">
        </div>
        <div class="col">
            <input type="text" placeholder="Enter Phone" id="phoneField" class="form-controll">
        </div>
        <div class="col">
            <input type="text" placeholder="Enter Email" id="emailField" class="form-controll">
        </div>
        <div class="col">
            <button id="saveData" class="btn btn-primary">Save Button</button>
        </div>
    </div>
    <hr class="my-5">
    <h4>All Contacts</h4>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody id="tbody">
        </tbody>
    </table>
`;

window.onload = ()=>{
    const tbody = document.querySelector('#tbody');
    axios(URL)
        .then(res => {
            res.data.forEach(contact => {
                creatTR(tbody,contact)
            });
        })
        .catch(err => console.log(err))
    let saveData = document.querySelector('#saveData');
    saveData.addEventListener('click',createContact);
}
container.innerHTML = top;
document.querySelector('#root').appendChild(container);

function creatTR(tbody,contact){
    let tr = document.createElement('tr');

    let tdName = document.createElement('td');
    tdName.innerHTML = contact.name;
    tr.appendChild(tdName);

    let tdPhone = document.createElement('td');
    tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A';
    tr.appendChild(tdPhone);

    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = contact.email ? contact.email : 'N/A';
    tr.appendChild(tdEmail);

    let tdAction = document.createElement('td');

    let editButton = document.createElement('button');
    editButton.className='btn btn-warning';
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click',function(){
        axios.get(`${URL}/${contact.id}`)
        .then(res =>{
            editContact(res.data);
            //console.log(res.data);
        })
        .catch(err=>console.log(err))

    })
    tdAction.appendChild(editButton);
    let deleteButton = document.createElement('button');
    deleteButton.className='btn btn-danger';
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click',function(){
        axios.delete(`${URL}/${contact.id}`)
            .then(res =>{
                tbody.removeChild(tr)
            })
            .catch(err=>console.log(err))
    })
    tdAction.appendChild(deleteButton);

    tr.appendChild(tdAction);
    tbody.appendChild(tr);
}
function createContact(){
    let name = document.querySelector('#nameField');
    let phone = document.querySelector('#phoneField');
    let email = document.querySelector('#emailField');

    let contact = {
        name: name.value,
        phone: phone.value,
        email: email.value
    }
    axios.post(URL,contact)
        .then(res =>{
            console.log(contact);
            creatTR(document.querySelector('#tbody'),contact);
            name.value = '';
            phone.value = '';
            email.value = '';
        })
        .catch(err => console.log(err))
}
function editContact(contact){
        let mBody  = document.createElement('div');
        let colDiv1 = document.createElement('div');
        let colDiv2 = document.createElement('div');
        let colDiv3 = document.createElement('div');
        let colDiv4 = document.createElement('div');
        let rowDiv = document.createElement('div');
        colDiv1.className='col'
        colDiv2.className='col'
        colDiv3.className='col'
        colDiv4.className='col'
        rowDiv.className='row'
        mBody.className = 'modal-body'
        let mBodyInner = document.createElement('div');
        mBodyInner.className = 'modal-body-inner'
       
        let nameEditInput = document.createElement('input');
        nameEditInput.id = 'nameEditInput'
        nameEditInput.type = 'text'
        nameEditInput.value = contact.name
        
        colDiv1.appendChild(nameEditInput)
        rowDiv.appendChild(colDiv1)


        let phoneEditInput = document.createElement('input');
        phoneEditInput.id = 'phoneEditInput'
        phoneEditInput.type = 'text'
        phoneEditInput.value = contact.phone
        
        colDiv2.appendChild(phoneEditInput)
        rowDiv.appendChild(colDiv2)

        let emailEditInput = document.createElement('input');
        emailEditInput.id = 'emailEditInput'
        emailEditInput.type = 'email'
        emailEditInput.value = contact.email
        
        colDiv3.appendChild(emailEditInput)
        rowDiv.appendChild(colDiv3)

        let editSubmitBtn = document.createElement('button');
        editSubmitBtn.className = 'btn btn-primary'
        editSubmitBtn.id = 'editSubmitBtn'
        editSubmitBtn.innerHTML = 'Save'
        colDiv4.appendChild(editSubmitBtn)
        rowDiv.appendChild(colDiv4)

       

        mBodyInner.appendChild(rowDiv);
        mBody.appendChild(mBodyInner);
        container.appendChild(mBody);
       // container.appendChild(model);
        //container.innerHTML = model;


        let name = document.querySelector('#nameEditInput');
        let phone = document.querySelector('#phoneEditInput');
        let email = document.querySelector('#emailEditInput');
    
        let newContact = {
            name: name.value,
            phone: phone.value,
            email: email.value
        }

        editSubmitBtn.addEventListener('click',function(){
            axios.put(`${URL}/${contact.id}`)
                .then(res =>{
                    res.forEach((a) => {
                        console.log(a);
                    })
                })
                .catch(err=>console.log(err))
        })

}