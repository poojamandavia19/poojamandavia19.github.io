// let api_key = "pat0bkVL8VQJizhZA.7e7cda2dc3ba5dd9e2fb945b9fa1ce217fb15a640c57bef9bd841e6ea9900476";
// let api_key = "patBWMSLb3bbPBKZo.13639f1100fd160e1f6559dfe04f47ac2a1deb5525c18e928da1658fec58d51d"; //12/10/23
// "patZoVMI7TcZMpmTA.486e70dda7668a3e5ecb4542fd86f85696774086d776bb92fb5930057cdda263"; //12/10/23
// patBWMSLb3bbPBKZo.cb11a8555f3f0edf2345f5ed75f40b98469ddad15b4786cc2a6ca2e637e3df0c
//patBWMSLb3bbPBKZo.d9b50e772e0f9697cca3fe8a81c191dbb580abb091bfd71d5a0831e0612cca0f

let api_key = "patVKblZfAGWYZJVI.ce2c55fd2190a22dab4c276f2d1d352d1ce9fee298a3ab06a405458a5826baa0"; //Production Token
let studentTableId = "tblo1Uy6qYCc0VmAY";
let baseId = "appo5ug4IJkVex4Oc";
let allProjects = [];

document.addEventListener("DOMContentLoaded", () => {
    const dataList = document.getElementById("works");
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`, // Replace with your actual token
            'Content-Type': 'application/json'
        }
    };

    // API URL
    const apiUrl = `https://api.airtable.com/v0/${studentTableId}/Students?maxRecords=10`;
    const testApiUrl = 'https://api.airtable.com/v0/appo5ug4IJkVex4Oc/Students?maxRecords=10&view=Grid%20view'

    // Fetch data from the API
    fetch(testApiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Display data in the list
            /* data.records.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `Title: ${item.id}, Body: ${item.fields?.FirstName || " "} ${item.fields?.LastName || " "}`;
                dataList.appendChild(li);
            }); 
            return data.records; */
            return getHomePageData();
        })
        .then((data)=>{
            // setDataInCardsNew(data);
            allProjects = data;
            setDataInCards(data);
        })
        .then(()=>{
          const urlSegments = window.location.hash.split('/');
            console.log(`urlSegments -> ${urlSegments}   ---> ${urlSegments.length} -> ${urlSegments[0]} | ${urlSegments[1]} | ${urlSegments[2]}`)
            if (urlSegments.length === 1) {
                const projectId = urlSegments[0].replace("#", "");
                // const contentElement = document.getElementById(`user/${userId}`);
                const contentElement = document.getElementById(`${projectId}`);
                console.log("HERE -----------")
                if (contentElement) {
                    console.log("Open Dialog");
                    const content = contentElement.innerHTML;
                    openDialog(projectId, content);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function showPage(pageId) {
    // Hide all pages
    const pages = document.getElementsByClassName('page-content');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

function getData(id) {
    // Hide all pages
    const dataList = document.getElementById("data-list");
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`, // Replace with your actual token
            'Content-Type': 'application/json'
        }
    };

    // API URL
    const apiUrl = "https://api.airtable.com/v0/appo6H7gBHY7NC6zm/Participants";

    // Fetch data from the API
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Display data in the list
             /* data.records.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `Title: ${item.id}, Body: ${item.fields.FirstName || " "} ${item.fields.LastName || " "}`;
                dataList.appendChild(li);
            });  */
            return data.records[3];
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

window.addEventListener('hashchange', function () {
    if (window.location.hash === '#openDialog') {
        console.log("Open dialog from -> window.addEventListener('hashchange',")
        openDialog();
    } else {
        closeDialog();
    }
});

/* function openDialog(data) {
    document.getElementById('myModal').style.display = 'block';
} */

function closeDialog(modalId) {
  document.getElementById('myModal').style.display = 'none';
}

function closeDialogEventHandler(){
  return function(){
    // document.getElementById(modalId).style.display = 'none';
    // modal.style.display = "none";
    alert("Button clicked with value: ");
  }
}

//parameter passed from button (Parameter same as category)
function filterCategory(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("button-active");
      } else {
        button.classList.remove("button-active");
      }
    });

    //select all cards
    let elements = document.querySelectorAll(".card");
    //loop through all cards
    elements.forEach((element) => {
      //display all cards on 'all' button click
      if (value == "all") {
        element.classList.remove("hide");
      } else {
        //Check if element contains category class
        if (element.classList.contains(value)) {
          //display element based on category
          element.classList.remove("hide");
        } else {
          //hide other elements
          element.classList.add("hide");
        }
      }
    });
  }

  //parameter passed from button (Parameter same as category)
function filterCategoryByDiscipline(value) {
  if(allProjects.length){
    let dataToFilter = allProjects.filter((n, i)=>{
      return n.MainDisciplineOfWork===value;
    });
    let worksElement = document.getElementById("works")
    worksElement.innerHTML="";
    setDataInCards(dataToFilter);
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("button-active");
      } else {
        button.classList.remove("button-active");
      }
    });
  }else{

  }
}

  //Search button click
  document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".search-result");
    let cards = document.querySelectorAll(".card");

    //loop through all elements
    elements.forEach((element, index) => {
      //because it checks case as well, it unifies the search text's format with the target's format, and then check if text includes the search value
      if (element.innerText.includes(searchInput.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      ))) {
        //display matching card
        cards[index].classList.remove("hide");
      } else {
        //hide others
        cards[index].classList.add("hide");
      }
    });
  });

  //Initially display all works
  window.onload = () => {
    filterCategory("all");
  };


  // collect all data-modal-target elements
  const openModalButtons = document.querySelectorAll('[data-modal-target]')
  // const closeModalButtons = document.querySelectorAll('.close-button')
  const overlay = document.getElementById('overlay')
  const closeArea = document.getElementById('close-area')
  const body = document.body


  openModalButtons.forEach(a => {
    a.addEventListener('click', () => {
      const modal = document.querySelector(a.dataset.modalTarget)
      openModal(modal)
    })
  })

  closeArea.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })

  /* closeModalButtons.forEach(a => {
    a.addEventListener('click', () => {
      const modal = a.closest('.modal')
      closeModal(modal)
    })
  }) */

  function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
    body.classList.add('active')
  }

  function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    body.classList.remove('active')
  }

  

  function setDataInCards(data){
    data.forEach((dataObject)=> {
        //Create Card
        let createCardModalNav = document.createElement('nav');
        let createCardModalUl = document.createElement('ul')
        createCardModalNav.appendChild(createCardModalUl);
      
    
        let card = document.createElement("a");
        // card.setAttribute("data-modal-target", "#" + i.modalName);
        card.setAttribute("data-modal-target", "#" + dataObject.id);
        card.setAttribute("class", "open-modal");
        //Card should have category and should stay hidden initially
        card.classList.add("card", dataObject?.MainDisciplineOfWork);

        card.setAttribute("href", `#${dataObject.id}`);
        card.setAttribute("id", `${dataObject.id}`);

        //heroImage div
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("heroImage-container");
        
        //img tag
        //TODO: Remove headshot with hero image
        let heroImage = document.createElement("img");
        heroImage.setAttribute("src", dataObject?.HeroImage ? dataObject?.HeroImage?.url: null); // Get hero image of the 
        //heroImage.setAttribute("src", i.fields?.HeroImage && i.fields?.HeroImage.length ? i.fields?.HeroImage[0].url: null); // Get hero image of the 
        heroImage.setAttribute("id", "hero-image")
        imgContainer.appendChild(heroImage);
        card.appendChild(imgContainer);
        
        
        //container
        let container = document.createElement("div");
        container.classList.add("container");

        //work title
        //TODO: Change the worktitle to actual worktitle
        let name = document.createElement("h3");
        name.innerText = dataObject?.ProjectTitle?.toUpperCase();
        name.style.fontSize = "1.5rem";
        container.appendChild(name);
        
        //author
        //TODO: What is this field ?
        let author = document.createElement("h4");
        author.style.fontSize = "1.2rem";
        card.classList.add("search-result");
        author.innerText = `${dataObject?.StudentFirstName} ${dataObject?.StudentLastName}`?.replace(
          /\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
        let authorPreferredName = document.createElement("span");
        authorPreferredName.innerText = " (" + dataObject?.StudentFirstName + ")".replace(
          /\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
  
        author.appendChild(authorPreferredName);
        container.appendChild(author);
  
        // check if preferred name exists
        var authorPreferredNameCheck = dataObject?.hasOwnProperty('StudentFirstName');
        if (authorPreferredNameCheck) { } else {
          authorPreferredName.setAttribute("class", "hidden");
        }
  
  
        card.appendChild(container);
        createCardModalUl.appendChild(card);
        // createCardModalNav
        // document.getElementById("works").appendChild(card);
        card.addEventListener("click", createEventHandlerForOpenDialog(dataObject.id));
        document.getElementById("works").appendChild(createCardModalNav);
  
      })
  }

  function getHomePageData (){
    // API URL
    const apiUrl = `https://api.airtable.com/v0/${baseId}/Projects`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`, // Replace with your actual token
            'Content-Type': 'application/json'
        }
    };
    const fieldsToFetch = 'fields%5B%5D=StudentFirstName&fields%5B%5D=StudentLastName&fields%5B%5D=ProjectTitle&fields%5B%5D=HeroImage&fields%5B%5D=MainDisciplineOfWork&fields%5B%5D=LinkedStudentRecordId'
    const maxRecords = "";//'maxRecords=10';

    // Fetch data from the API
    return fetch(`${apiUrl}?${fieldsToFetch}&${maxRecords}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display data in the list
            let projectDetails = [];
            data.records.forEach(item => {
                projectDetails.push({
                    id: item.id,
                    StudentFirstName: item.fields.StudentFirstName && item.fields.StudentFirstName.length ? item.fields.StudentFirstName[0]: '',
                    StudentLastName: item.fields.StudentLastName && item.fields.StudentLastName.length ? item.fields.StudentLastName[0]: '',
                    ProjectTitle: item.fields.ProjectTitle,
                    MainDisciplineOfWork: item.fields.MainDisciplineOfWork,
                    author: `${item.fields.StudentFirstName && item.fields.StudentFirstName.length ? item.fields.StudentFirstName[0]: ''} 
                    ${item.fields.StudentLastName && item.fields.StudentLastName.length ? item.fields.StudentLastName[0]: ''}`,
                    HeroImage: item.fields.HeroImage && item.fields.HeroImage.length ? item.fields.HeroImage[0]: '',
                    LinkedStudentRecordId: item.fields.LinkedStudentRecordId && item.fields.LinkedStudentRecordId.length ? item.fields.LinkedStudentRecordId[0]: '',
                })
            }); 
            return projectDetails;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getStudentInformationByRecordId(recordId, currentProjectId){
    // API URL
    const apiUrl = `https://api.airtable.com/v0/${baseId}/Students/${recordId}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`, 
            'Content-Type': 'application/json'
        }
    };
    
    // Fetch data from the API
    return fetch(`${apiUrl}?`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display data in the list
            return {
                id:data.id,
                ...data.fields
            };
        })
        .then((studentDetails)=>{
            //Get related records from projects
            
            return GetRelatedProject(recordId)
                    .then((relatedProjects)=>{
                        studentDetails.relatedProjects = relatedProjects;
                        return studentDetails;
                    });
        })
        .then((finalResponse)=>{
            if(currentProjectId){
                finalResponse = finalResponse.relatedProjects.filter(project => project.id !== currentProjectId);
            }
            console.log("finalResponse -> ");
            console.log(finalResponse);
            return finalResponse;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function GetRelatedProject(relatedRecordForStudentId, recordToRemove){

    // API URL
    const apiUrl = `https://api.airtable.com/v0/${baseId}/Projects`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`, // Replace with your actual token
            'Content-Type': 'application/json'
        }
    };
    const fieldsToFetch = 'fields%5B%5D=StudentFirstName&fields%5B%5D=StudentLastName&fields%5B%5D=ProjectTitle&fields%5B%5D=HeroImage&fields%5B%5D=LinkedStudentRecordId'
    const fieldsToFetchArr = ['StudentFirstName', 'StudentLastName', 'ProjectTitle', 'HeroImage', 'LinkedStudentRecordId'];
    const maxRecords = 'maxRecords=10';

    // Fetch data from the API

    // `${apiUrl}?${fieldsToFetch}&${maxRecords}&LinkedStudentRecordId=${relatedRecordForStudentId}`

    //https://api.airtable.com/v0/appo5ug4IJkVex4Oc/tblgELmnJBr2DKFen?fields%5B%5D=StudentFirstName&fields%5B%5D=StudentLastName&fields%5B%5D=ProjectTitle&fields%5B%5D=HeroImage&fields%5B%5D=LinkedStudentRecordId&filterByFormula=LinkedStudentRecordId%3DrecN55j34e92kaisi&maxRecords=10
    return fetch(`${apiUrl}?filterByFormula=LinkedStudentRecordId%3D'${relatedRecordForStudentId}'`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display data in the list
            let projectDetails = [];
            data.records.forEach(item => {
                projectDetails.push({
                    id: item.id,
                    StudentFirstName: item.fields.StudentFirstName && item.fields.StudentFirstName.length ? item.fields.StudentFirstName[0]: '',
                    StudentLastName: item.fields.StudentLastName && item.fields.StudentLastName.length ? item.fields.StudentLastName[0]: '',
                    ProjectTitle: item.fields.ProjectTitle,
                    HeroImage: item.fields.HeroImage && item.fields.HeroImage.length ? item.fields.HeroImage[0]: '',
                    LinkedStudentRecordId: item.fields.LinkedStudentRecordId && item.fields.LinkedStudentRecordId.length ? item.fields.LinkedStudentRecordId[0]: '',
                })
            }); 
            return projectDetails;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getProjectDetailsByRecordId(recordId){
  // API URL
  const apiUrl = `https://api.airtable.com/v0/${baseId}/Projects/${recordId}`;
  const requestOptions = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${api_key}`, // Replace with your actual token
          'Content-Type': 'application/json'
      }
  };

  // Fetch data from the API
  return fetch(`${apiUrl}?`, requestOptions)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Display data in the list
          let projectDetails = {
            id: data.id,
            ...data.fields,
            StudentFirstName: data.fields.StudentFirstName && data.fields.StudentFirstName.length ? data.fields.StudentFirstName[0]: '',
            StudentLastName: data.fields.StudentLastName && data.fields.StudentLastName.length ? data.fields.StudentLastName[0]: '',
            ProjectTitle: data.fields.ProjectTitle,
            MainDisciplineOfWork: data.fields.MainDiscipline,
            author: `${data.fields.StudentFirstName && data.fields.StudentFirstName.length ? data.fields.StudentFirstName[0]: ''} 
            ${data.fields.StudentLastName && data.fields.StudentLastName.length ? data.fields.StudentLastName[0]: ''}`,
            HeroImage: data.fields.HeroImage && data.fields.HeroImage.length ? data.fields.HeroImage[0]: '',
            LinkedStudentRecordId: data.fields.LinkedStudentRecordId && data.fields.LinkedStudentRecordId.length ? data.fields.LinkedStudentRecordId[0]: '',
        };
        return projectDetails;
      })
      .then((projectDetails)=>{
        return getStudentInfoByRecordId(projectDetails.LinkedStudentRecordId)
          .then((studentsInfo)=>{
            projectDetails.StudentInfo = studentsInfo;
            return projectDetails;
          }); 
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function getStudentInfoByRecordId(recordId){
  // API URL
  const apiUrl = `https://api.airtable.com/v0/${baseId}/Students/${recordId}`;
  const requestOptions = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${api_key}`, // Replace with your actual token
          'Content-Type': 'application/json'
      }
  };

  // Fetch data from the API
  return fetch(`${apiUrl}?`, requestOptions)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Display data in the list
          let studentsDetails = {
            id: data.id,
            ...data.fields,
          };
        return studentsDetails;
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function setDataInCardsNew(data){

  data.forEach((dataObject)=>{
    //Create Card

    let card = document.createElement("a");
    // card.setAttribute("data-modal-target", "#" + i.modalName);
    card.setAttribute("data-modal-target", "#" + dataObject.id);
    card.setAttribute("class", "open-modal");
    //Card should have category and should stay hidden initially
    card.classList.add("card", dataObject?.MainDiscipline);
    //container
    let container = document.createElement("div");
    container.classList.add("container");

    //work title
    //TODO: Change the worktitle to actual worktitle
    let name = document.createElement("h3");
    name.innerText = dataObject?.StudentFirstName?.toUpperCase();
    container.appendChild(name);

    //author
    //TODO: What is this field ?
    let author = document.createElement("h4");
    card.classList.add("search-result");
    author.innerText = dataObject?.StudentFirstName?.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
    let authorPreferredName = document.createElement("span");
    authorPreferredName.innerText = " (" + dataObject?.StudentFirstName + ")".replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );

    author.appendChild(authorPreferredName);
    container.appendChild(author);

    // check if preferred name exists
    var authorPreferredNameCheck = dataObject?.hasOwnProperty('StudentFirstName');
    if (authorPreferredNameCheck) { } else {
      authorPreferredName.setAttribute("class", "hidden");
    }


    card.appendChild(container);
    document.getElementById("works").appendChild(card);
  })
  

}

function openDialog(projectId, contentData) {

  console.log("Dialog should be opened");
  const dialogContent = document.getElementById("dialogContent");
  return getProjectDetailsByRecordId(projectId)
    .then((projectData)=>{
      setProjectDataInModal(projectData);
      dialogContent.innerHTML = document.getElementById(projectId).innerHTML;
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
    })
}

function createEventHandlerForOpenDialog(projectId, contentData) {
  return function(event) {
    console.log("Dialog should be opened");
    const dialogContent = document.getElementById("dialogContent");
    return getProjectDetailsByRecordId(projectId)
      .then((projectData)=>{
        setProjectDataInModal(projectData);
        dialogContent.innerHTML = document.getElementById(projectId).innerHTML;
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';
      })
  };
}

function handleAnchorClick() {
  alert("Anchor clicked!");
}

function setProjectDataInModal(projectData){

  // create modal section
  const modalSection = document.createElement("section");
  modalSection.setAttribute("id", projectData.recordId);
  modalSection.setAttribute("class", projectData?.DevelopedIn + "border");
  modalSection.classList.add("modal");

  // create author introduction holder div
  const authorDetailHolder = document.createElement("div")
  authorDetailHolder.setAttribute("id", "author-detail");
  // create a div holding x and head shot
  const headShotHolder = document.createElement("div");
  // create a div holding close button
  const closeButton = document.createElement("a");
  /* closeButton.addEventListener("click", () => {
    const modal = closeButton.closest('.modal')
    closeModal(modal);
  }); */
  // closeDialogEventHandler
  closeButton.href = "#"; // Set the href attribute to avoid page reload
    
  closeButton.addEventListener("click", function(event) {
    event.preventDefault();
    alert("Dynamically generated button clicked!");
});
  // a.addEventListener('click', )
  closeButton.classList.add("close-button");
  closeButton.setAttribute("style", "padding: 20px;");
  // draw a cross sign
  const crossSign = document.createElement("strong");
  crossSign.innerHTML = "&times;";
  
  
  // include the cross sign to close button
  closeButton.appendChild(crossSign);
  // create the head shot img
  const headImage = document.createElement("img");
  headImage.setAttribute("loading", "lazy");
  headImage.setAttribute("id", "head-shot");
  headImage.setAttribute("src", projectData.StudentInfo?.HeadShot.length?projectData.StudentInfo?.HeadShot[0].url: null);
  headImage.setAttribute("alt", projectData.StudentFirstName);
  // include the x and head shot img to author detail div
  headShotHolder.appendChild(closeButton);
  headShotHolder.appendChild(headImage);


  // create author bio div
  const authorBioHolder = document.createElement("div");
  authorBioHolder.setAttribute("id", "author-bio");
  authorBioHolder.setAttribute("class", "authorSection");
  // create author name
  const authorName = document.createElement("h2");
  authorName.setAttribute("id", "author");
  // match author
  authorName.innerText = projectData?.author;
  // create preferred name span
  const preferredName = document.createElement("em");
  preferredName.setAttribute("id", "preferred-name");
  // match preferred name
  preferredName.innerText = " (" + projectData?.StudentFirstName + ")";
  // include preferred name into author
  authorName.appendChild(preferredName);
  // create graduate
  const graduate = document.createElement("span");
  graduate.innerText = "Graduate: " + projectData.StudentInfo?.IsGraduated? "Yes": "No";
  // create student number
  const studNo = document.createElement("span");
  studNo.setAttribute("id", "student-number");
  // match student number
  studNo.innerText = projectData?.StudentNo;
  // create a line break
  const lineBreak = document.createElement("p");
  // create personal site link
  const personalSite = document.createElement("a");
  personalSite.setAttribute("id", "social-media");
  personalSite.setAttribute("target", "_blank");
  personalSite.setAttribute("href", projectData.StudentInfo?.PersonalPortfolioLink);
  // personalSite.innerText = "Website";
  // create personal website icon
  const personalSiteIcon = document.createElement("img");
  personalSiteIcon.setAttribute("id", "social-media-icons");
  personalSiteIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f40e24a1ae4f75a4099e/1667298318947/personalSite_author.png");
  
  // create Instagram link
  const instagram = document.createElement("a");
  instagram.setAttribute("id", "social-media");
  instagram.setAttribute("target", "_blank");
  instagram.setAttribute("href", projectData.StudentInfo?.InstagramLink);
  // instagram.innerText = "Instagram";
  // create instagram icon
  const instagramIcon = document.createElement("img");
  instagramIcon.setAttribute("id", "social-media-icons");
  instagramIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f4261d399d27641f41d1/1667298342648/instagram_author.png");
  // create Facebook link
  // const facebook = document.createElement("a");
  // facebook.setAttribute("id", "social-media");
  // facebook.setAttribute("target", "_blank");
  // facebook.setAttribute("href", projectData.StudentInfo?.FacebookLink);
  // // facebook.innerText = "Facebook";
  // // create facebook icon
  // const facebookIcon = document.createElement("img");
  // facebookIcon.setAttribute("id", "social-media-icons");
  // facebookIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f43434338e670253e4eb/1667298356871/facebook_author.png");
  
  // create Twitter link
  const twitter = document.createElement("a");
  twitter.setAttribute("id", "social-media");
  twitter.setAttribute("target", "_blank");
  twitter.setAttribute("href", projectData.StudentInfo?.TwitterLink);
  // twitter.innerText = "Twitter";
  // create twitter icon
  const twitterIcon = document.createElement("img");
  twitterIcon.setAttribute("id", "social-media-icons");
  twitterIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f4414792ed0d832ddf7e/1667298369540/twitter_author.png");
  // // create YoutubePage link
  // const youtubePage = document.createElement("a");
  // youtubePage.setAttribute("id", "social-media");
  // youtubePage.setAttribute("target", "_blank");
  // youtubePage.setAttribute("href", i.fields?.youtubePage);
  // // youtubePage.innerText = "YouTube";
  // // create youtubepage icon
  // const youtubePageIcon = document.createElement("img");
  // youtubePageIcon.setAttribute("id", "social-media-icons");
  // youtubePageIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f44e1d399d27641f4802/1667298382814/youtube_author.png");
  // create LinkedIn Link
  const linkedin = document.createElement("a");
  linkedin.setAttribute("id", "social-media");
  linkedin.setAttribute("target", "_blank");
  linkedin.setAttribute("href", projectData.StudentInfo?.LinkedInLink);
  // linkedin.innerText = "LinkedIn";
  // create linkedin icon
  const linkedinIcon = document.createElement("img");
  linkedinIcon.setAttribute("id", "social-media-icons");
  linkedinIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f45aa69bb60c6523042e/1667298394232/linkedin_author.png");
  // create behance
  const behance = document.createElement("a");
  behance.setAttribute("id", "social-media");
  behance.setAttribute("target", "_blank");
  behance.setAttribute("href", projectData.StudentInfo?.BehanceLink);
  // behance.innerText = "Behance";
  // create behance icon
  const behanceIcon = document.createElement("img");
  behanceIcon.setAttribute("id", "social-media-icons");
  behanceIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f4657f89ac738b389064/1667298405366/behance_author.png");
  // create bilibili link
  // const bilibili = document.createElement("a");
  // bilibili.setAttribute("id", "social-media");
  // bilibili.setAttribute("target", "_blank");
  // bilibili.setAttribute("href", i.fields?.bilibili);
  // // bilibili.innerText = "Bilibili";
  // // create bilibili icon
  // const bilibiliIcon = document.createElement("img");
  // bilibiliIcon.setAttribute("id", "social-media-icons");
  // bilibiliIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f46f3905a45d7f133c88/1667298415953/bilibili_author.png");
  // create tiktok link
  // const tiktok = document.createElement("a");
  // tiktok.setAttribute("id", "social-media");
  // tiktok.setAttribute("target", "_blank");
  // tiktok.setAttribute("href", i.fields?.tiktok);
  // // tiktok.innerText = "TikTok";
  // // create tiktok icon
  // const tiktokIcon = document.createElement("img");
  // tiktokIcon.setAttribute("id", "social-media-icons");
  // tiktokIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f47b7f89ac738b389099/1667298427594/tiktok_author.png");


  // include social media icons
  personalSite.appendChild(personalSiteIcon);
  instagram.appendChild(instagramIcon);
  // facebook.appendChild(facebookIcon);
  twitter.appendChild(twitterIcon);
  // youtubePage.appendChild(youtubePageIcon);
  linkedin.appendChild(linkedinIcon);
  behance.appendChild(behanceIcon);
  // bilibili.appendChild(bilibiliIcon);
  // tiktok.appendChild(tiktokIcon);


  // check if preferred name has values
  var preferredNameCheck = projectData?.hasOwnProperty('StudentFirstName');
  if (preferredNameCheck) { } else {
    preferredName.setAttribute("class", "hidden");
  }

  // check if social media has values
  var personalSiteCheck = projectData.StudentInfo.hasOwnProperty('PersonalPortfolioLink');
  if (personalSiteCheck) { } else {
    personalSite.setAttribute("class", "hidden");
  }

  var instagramCheck = projectData.StudentInfo.hasOwnProperty('InstagramLink');
  if (instagramCheck) { } else {
    instagram.setAttribute("class", "hidden");
  }

  /* var facebookCheck = projectData.StudentInfo.hasOwnProperty('facebook');
  if (facebookCheck) { } else {
    facebook.setAttribute("class", "hidden");
  } */

  var twitterCheck = projectData.StudentInfo.hasOwnProperty('TwitterLink');
  if (twitterCheck) { } else {
    twitter.setAttribute("class", "hidden");
  }

  /* var youtubePageCheck = i.hasOwnProperty('youtubePage');
  if (youtubePageCheck) { } else {
    youtubePage.setAttribute("class", "hidden");
  } */

  var linkedinCheck = projectData.StudentInfo.hasOwnProperty('LinkedInLink');
  if (linkedinCheck) { } else {
    linkedin.setAttribute("class", "hidden");
  }

  var behanceCheck = projectData.StudentInfo.hasOwnProperty('BehanceLink');
  if (behanceCheck) { } else {
    behance.setAttribute("class", "hidden");
  }

  /* var bilibiliCheck = i.hasOwnProperty('bilibili');
  if (bilibiliCheck) { } else {
    bilibili.setAttribute("class", "hidden");
  }

  var tiktokCheck = i.hasOwnProperty('tiktok');
  if (tiktokCheck) { } else {
    tiktok.setAttribute("class", "hidden");
  } */

  // create bio
  const bio = document.createElement("p");
  bio.setAttribute("id", "bio");
  // match bio
  bio.innerText = projectData.StudentInfo?.Bio;
  // include all elements to author bio
  authorBioHolder.appendChild(authorName);
  authorBioHolder.appendChild(graduate);
  authorBioHolder.appendChild(studNo);
  authorBioHolder.appendChild(lineBreak);
  authorBioHolder.appendChild(personalSite);
  authorBioHolder.appendChild(instagram);
  // authorBioHolder.appendChild(facebook);
  authorBioHolder.appendChild(twitter);
  // authorBioHolder.appendChild(youtubePage);
  authorBioHolder.appendChild(linkedin);
  authorBioHolder.appendChild(behance);
  // authorBioHolder.appendChild(bilibili);
  // authorBioHolder.appendChild(tiktok);
  authorBioHolder.appendChild(bio);
  // include author bio holder to author detail holder
  authorDetailHolder.appendChild(headShotHolder);
  authorDetailHolder.appendChild(authorBioHolder);



  // create work detail holder
  const workDetailHolder = document.createElement("div");
  workDetailHolder.setAttribute("id", "work-detail");
  // create category
  const category = document.createElement("h4");
  category.setAttribute("id", "category");
  // match category
  category.innerText = projectData.StudentInfo?.MainDiscipline;
  // create work title
  const workTitle = document.createElement("h1");
  workTitle.setAttribute("id", "work-title");
  // match workTitle
  workTitle.innerText = projectData?.ProjectTitle;

  // create a video iframe
  const videoLink = document.createElement("iframe");
  videoLink.setAttribute("frameborder", "0");
  videoLink.setAttribute("class", "desktop-only");
  videoLink.setAttribute("loading", "lazy");
  videoLink.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
  // match video iframe
  videoLink.setAttribute("src", projectData.VideoLink);
  // create brief p
  const brief = document.createElement("p");
  brief.setAttribute("id", "brief");
  // match brief
  brief.innerText = projectData.ProjectAbstract;
  // create relevant image 1
  const relevantImageOne = document.createElement("img");
  relevantImageOne.setAttribute("src", projectData.RelevantImages?.[0]?.url);
  relevantImageOne.setAttribute("loading", "lazy");
  // create relevant image 2
  const relevantImageTwo = document.createElement("img");
  relevantImageTwo.setAttribute("src", projectData.RelevantImages?.[1]?.url);
  relevantImageTwo.setAttribute("loading", "lazy");
  // create relevant image 3
  const relevantImageThree = document.createElement("img");
  relevantImageThree.setAttribute("src", projectData.RelevantImages?.[2]?.url);
  relevantImageThree.setAttribute("loading", "lazy");
  // create relevant image 4
  const relevantImageFour = document.createElement("img");
  relevantImageFour.setAttribute("src", projectData.RelevantImages?.[3]?.url);
  relevantImageFour.setAttribute("loading", "lazy");
  // create relevant image 5
  const relevantImageFive = document.createElement("img");
  relevantImageFive.setAttribute("src", projectData.RelevantImages?.[4]?.url);
  relevantImageFive.setAttribute("loading", "lazy");

  // check if relevant image exists
  var relevantImageOneCheck = projectData.hasOwnProperty('RelevantImages') && projectData.RelevantImages[0];
  if (relevantImageOneCheck) { } else {
    relevantImageOne.setAttribute("class", "hidden");
  }

  var relevantImageTwoCheck = projectData.hasOwnProperty('relevantImageTwo') && projectData.RelevantImages[1];
  if (relevantImageTwoCheck) { } else {
    relevantImageTwo.setAttribute("class", "hidden");
  }

  var relevantImageThreeCheck = projectData.hasOwnProperty('relevantImageThree') && projectData.RelevantImages[2];
  if (relevantImageThreeCheck) { } else {
    relevantImageThree.setAttribute("class", "hidden");
  }

  var relevantImageFourCheck = projectData.hasOwnProperty('relevantImageFour') && projectData.RelevantImages[3];
  if (relevantImageFourCheck) { } else {
    relevantImageFour.setAttribute("class", "hidden");
  }

  var relevantImageFiveCheck = projectData.hasOwnProperty('relevantImageFive') && projectData.RelevantImages[4];
  if (relevantImageFiveCheck) { } else {
    relevantImageFive.setAttribute("class", "hidden");
  }

  // check if embed video link exists
  var videoLinkCheck = projectData.hasOwnProperty('VideoLink');
  if (videoLinkCheck) { } else {
    videoLink.setAttribute("class", "hidden");
  }

  // include all elements to work detail div
  workDetailHolder.appendChild(category);
  workDetailHolder.appendChild(workTitle);
  workDetailHolder.appendChild(videoLink);
  workDetailHolder.appendChild(brief);
  workDetailHolder.appendChild(relevantImageOne);
  workDetailHolder.appendChild(relevantImageTwo);
  workDetailHolder.appendChild(relevantImageThree);
  workDetailHolder.appendChild(relevantImageFour);
  workDetailHolder.appendChild(relevantImageFive);

  // include two holders to section
  modalSection.appendChild(authorDetailHolder);
  modalSection.appendChild(workDetailHolder);

  document.getElementById("overlay").appendChild(modalSection);



}
