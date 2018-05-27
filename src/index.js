
let container =  document.createElement('div');
container.className = 'container py-5';

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
            <button class="btn btn-primary">Save Button</button>
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
            <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                    <button class="btn btn-warning">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
`;

window.onload = ()=>{
    const URL = 'http://localhost:3000/contacts';
    const tbody = document.querySelector('#tbody');
    axios(URL)
        .then(res => {
            res.data.forEach(contact => {
                creatTR(tbody,contact)
            });
        })
        .catch(err => console.log(err))

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
        console.log(`Name = ${contact.name}`);
    })
    tdAction.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.className='btn btn-danger';
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click',function(){
        console.log(`Email = ${contact.email}`);
    })
    tdAction.appendChild(deleteButton);

    tr.appendChild(tdAction);

    tbody.appendChild(tr);
}