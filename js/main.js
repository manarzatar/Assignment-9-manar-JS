
let nameInput = document.getElementById('nameInput');
let urlInput = document.getElementById('urlInput');
let submitBtn = document.getElementById('submitBtn');



//validation

function validateForm() {
  let name = nameInput.value.trim();
  let url = urlInput.value.trim();

  
  nameInput.classList.remove("is-invalid");
  urlInput.classList.remove("is-invalid");

  let isValid = true;

  
  if (name.length < 3) {
    nameInput.classList.add("is-invalid");
    isValid = false;
  }

  
  let urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\/\S*)?$/;
  if (!urlPattern.test(url)) {
    urlInput.classList.add("is-invalid");
    isValid = false;
  }

  if (!isValid) {
    showError(); 
    return false;
  }

  return true;
}

function showError() {
  Swal.fire({
    icon: "error",
    title: "Site Name or Url is not valid, Please follow the rules below :",
    html: `
      <ul style="text-align: left;">
        <li><i class="fa-solid fa-arrow-right"></i> Site name must contain at least 3 characters</li>
        <li><i class="fa-solid fa-arrow-right"></i> Site URL must be a valid one</li>
      </ul>
    `
  });
}



//localstorage 

let dataPro = [];

if(localStorage.getItem('product') != null){
    dataPro = JSON.parse(localStorage.getItem('product'));
} 

submitBtn.onclick = function(){
  if (!validateForm()){
    return;
  }
    let newPro = {
        nameInput: nameInput.value,
        urlInput: urlInput.value
    };
    
    dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
};



//clear inputs

function clearData() {
    nameInput.value = '';
    urlInput.value = '';
}

//read 

function showData(){
  let table = ''
  for ( let i=0; i < dataPro.length ; i ++){
    let url = dataPro[i].urlInput.trim();

    if (!/^https?:\/\//i.test(url)){
      url = 'https://' + url ;
    }
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].nameInput}</td>
            <td><a href="${url}" target="_blank"  id="Visit"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button  onclick="deleteData(${i})"   id="Delete"><i class="fa-solid fa-trash"></i>Delete</button></td>
        </tr>
    `;
  }

  document.getElementById('tbody').innerHTML = table;

};
showData()


//delete

function deleteData(i){
  dataPro.splice(i,1);
  localStorage.setItem('product' , JSON.stringify(dataPro));
  showData();
}



// mode button code 


   const themeToggle = document.getElementById('theme-toggle');
   const body = document.body;

   themeToggle.addEventListener('click', () => {
       body.classList.toggle('dark-mode'); 
   });