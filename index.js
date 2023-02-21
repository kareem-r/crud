let add=document.querySelector(".addbtn")
let close=document.querySelector(".close")
console.log(add)
let form=document.querySelector('.form')
let contactform=document.querySelector('.form .addcontact')
add.addEventListener('click',()=>{
    form.classList.add('overlay');
    contactform.style.display='block';
})
close.addEventListener('click',()=>{
    form.classList.remove('overlay');
    contactform.style.display='none';
})

/*let contactlist=JSON.parse(localStorage.getItem('contact') || []);*/
let savedata=window.localStorage.getItem('contact');
let contactlist= JSON.parse(savedata || "[]");
/*let contactlist=(savedata === "null") ? [] : JSON.parse(savedata) ;*/

let namee=document.getElementById('contact_form_name');
let phone=document.getElementById('contact_form_phone');
let email=document.getElementById('contact_form_email');
let address=document.getElementById('contact_form_home');
let lastid=contactlist.length; 
let newcontact=()=>{
    contactlist.push({
        contactid: lastid +=1,
        contactname:namee.value,
        contactphone:phone.value,
        contactemail:email.value,
        contactaddress:address.value,});
    console.log(contactlist);

}


let tbodytable=document.getElementById('tbody')
function rendercontacts(){
    let tr='';
//     contactlist.forEach(contact=>{
//     tr +=`
//     <tr data-id=${contact.contactid}>
//     <td>${contact.contactid}</td>
//     <td>${contact.contactname}</td>
//     <td>${contact.contactphone}</td>
//     <td>${contact.contactemail}</td>
//     <td>${contact.contactaddress}</td>
//     <td class="green">Edit</td>
//     <td class="red">Delete</td>
//     </tr>`
//      })
for(let i=0;i<contactlist.length;i++){
    tr += `
    <tr data-id=${contactlist[i].contactid}>
    <td>${contactlist[i].contactid}</td>
    <td>${contactlist[i].contactname}</td>
    <td>${contactlist[i].contactphone}</td>
    <td>${contactlist[i].contactemail}</td>
    <td>${contactlist[i].contactaddress}</td>
    <td class="green">Edit</td>
    <td class="red">Delete</td>
    </tr>`;
}
tbodytable.innerHTML = tr;
}
rendercontacts();
let reset=()=>{
    namee.value='';
    phone.value='';
    email.value='';
    address.value='';
    rendercontacts();
}

let addbtn=()=>{
    newcontact();
    localStorage.setItem("contact",JSON.stringify(contactlist));
    reset();
    rendercontacts();

    form.classList.remove('overlay');
    contactform.style.display='none';
    console.log("new")
    
        
    

}
add.onclick=function(){
    savebtn.innerHTML=`<i class="fas fa-save"></i> save`
}

let savebtn=document.querySelector('.save');
savebtn.addEventListener('click',addbtn)
let id;
let index
tbodytable.addEventListener('click',(e)=>{
if(e.target.classList.contains("green")){
    savebtn.innerHTML=`<i class="fas fa-save"></i> update`
    let tr=e.target.parentElement;
    id=tr.dataset.id;
    for(let i=0;i<contactlist.length;i++){
        if(parseInt(id) == contactlist[i].contactid){
            index=i;
        }
    }
 
    console.log(id)

    namee.value=contactlist[index].contactname;
    phone.value=contactlist[index].contactphone;
    email.value=contactlist[index].contactemail;
    address.value=contactlist[index].contactaddress;
    form.classList.add('overlay');
    contactform.style.display='block';
    let Updatebtn=()=>{
    let updated={
        contactid: parseInt(id),
        contactname:namee.value,
        contactphone:phone.value,
        contactemail:email.value,
        contactaddress:address.value,
    }
    contactlist[index]=updated;
    localStorage.setItem("contact",JSON.stringify(contactlist));
    form.classList.remove('overlay');
    contactform.style.display='none'; 

    rendercontacts();
    reset();

    console.log("edit")
   
    savebtn.removeEventListener("click",Updatebtn )
    savebtn.addEventListener('click',addbtn)
 

    } 
    savebtn.removeEventListener('click',addbtn)

    savebtn.addEventListener("click",Updatebtn ) 

}
if(e.target.classList.contains("red")){
    let tr=e.target.parentElement;
    id=tr.dataset.id;
    for (let i = 0; i < contactlist.length; i++) {
      if (parseInt(id) == contactlist[i].contactid) {
        index = i;
      }
    }
    contactlist.splice(index,1)
    localStorage.setItem("contact",JSON.stringify(contactlist));
        rendercontacts();
    
}
})
   


let search=document.getElementById("search");
let formsearch=search.parentElement;
formsearch.addEventListener('submit',e=>e.preventDefault())
let trs=document.querySelectorAll('tbody tr');

search.addEventListener('keyup',()=>{

    let searchvalue=search.value.toLowerCase()
    trs.forEach(tr=>{
        trname=tr.children[1].textContent.toLowerCase()
        if(trname.includes(searchvalue)){
            tr.style.display=""
        }else{
            tr.style.display='none'
        }
    })
})
