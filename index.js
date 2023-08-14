const plusButton = document.getElementById("plusbutton");
const modall = document.getElementById("modal");
const closeButton = document.getElementById("close");
const saveButton = document.getElementById("save");
const titleSave = document.getElementById("title");
const descriptionSave = document.getElementById("description");
const noteCard = document.getElementsByClassName("notcard")[0];
const alert = document.getElementById("alert");
let idState=-1;
const stringData = localStorage.getItem("data");
const parsedData = JSON.parse(stringData);

if (parsedData) {
  parsedData.forEach((element) => {
    cardCreater(element.title, element.desc, element.id);
  });
}

function cardCreater(tText, dText, id) {
  const clonElement = noteCard.cloneNode(true);
  const nTitleClon = clonElement.getElementsByClassName("title-note")[0];
  const nDesClon = clonElement.getElementsByClassName("des-note")[0];
  nTitleClon.innerHTML = tText;
  nDesClon.innerHTML = dText;
  clonElement.style.display = "flex";
  clonElement.setAttribute("data-id", id);
  document.body.appendChild(clonElement);
  clonElement.addEventListener("click", () => {
    idState = id;
    modall.style.display = "flex";
    titleSave.value = tText;
    descriptionSave.value = dText;
  });
}

plusButton.addEventListener("click", () => {
  modall.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  modall.style.display = "none";
});

saveButton.addEventListener("click", (value) => {
  if (titleSave.value == "") {
    document.getElementById("alert").innerHTML =
      "Lütfen Tüm Bölümleri Doldurunuz!!";
  } else {
    const data2 = localStorage.getItem("data");
    let data3 = [];
    if (data2) {
      data3 = JSON.parse(data2);
    }

    // const fondElement = data3.find((value) => {
    //   return value.id === idState;
    // });
    if (idState!==-1) {
     const updateObject=document.querySelector("idState");
     const upObTitle = updateObject.getAttribute("title-note");
     const upObDes = updateObject.getAttribute("des-note");
     upObTitle.innerHTML=titleSave.value;
     upObDes.innerHTML=descriptionSave.value;
     const data = {
      title: titleSave.value,
      desc: descriptionSave.value,
      id: idState }
     
    }else if (idState==-1) {const data = {
      title: titleSave.value,
      desc: descriptionSave.value,
      id: data3.length }}
     
    
    cardCreater(titleSave.value, descriptionSave.value, data3.length);
    data3.push(data);
    localStorage.setItem("data", JSON.stringify(data3));
    titleSave.value = "";
    descriptionSave.value = "";
    modall.style.display = "none";
  }
});

