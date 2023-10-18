// let api_key = "pat0bkVL8VQJizhZA.7e7cda2dc3ba5dd9e2fb945b9fa1ce217fb15a640c57bef9bd841e6ea9900476";
let api_key = "patBWMSLb3bbPBKZo.13639f1100fd160e1f6559dfe04f47ac2a1deb5525c18e928da1658fec58d51d"; //12/10/23
// "patZoVMI7TcZMpmTA.486e70dda7668a3e5ecb4542fd86f85696774086d776bb92fb5930057cdda263"; //12/10/23
// patBWMSLb3bbPBKZo.cb11a8555f3f0edf2345f5ed75f40b98469ddad15b4786cc2a6ca2e637e3df0c
//patBWMSLb3bbPBKZo.d9b50e772e0f9697cca3fe8a81c191dbb580abb091bfd71d5a0831e0612cca0f

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
            data.records.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `Title: ${item.id}, Body: ${item.fields?.FirstName || " "} ${item.fields?.LastName || " "}`;
                dataList.appendChild(li);
            }); 
            return data.records;
        })
        .then((data)=>{
            setDataInCards(data);
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
        openDialog();
    } else {
        closeDialog();
    }
});

function openDialog() {
    document.getElementById('myModal').style.display = 'block';
}

function closeDialog() {
    document.getElementById('myModal').style.display = 'none';
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
  const closeModalButtons = document.querySelectorAll('.close-button')
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

  closeModalButtons.forEach(a => {
    a.addEventListener('click', () => {
      const modal = a.closest('.modal')
      closeModal(modal)
    })
  })

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
    data.forEach((i)=> {
        //Create Card
        let card = document.createElement("a");
        // card.setAttribute("data-modal-target", "#" + i.modalName);
        card.setAttribute("data-modal-target", "#" + i.id);
        card.setAttribute("class", "open-modal");
        //Card should have category and should stay hidden initially
        card.classList.add("card", i.fields?.MainDiscipline);
        //heroImage div
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("heroImage-container");
        //img tag
        let heroImage = document.createElement("img");
        heroImage.setAttribute("src", i.fields?.HeroImage && i.fields?.HeroImage.length ? i.fields?.HeroImage[0].url: null); // Get hero image of the 
        heroImage.setAttribute("id", "hero-image")
        imgContainer.appendChild(heroImage);
        card.appendChild(imgContainer);
        //container
        let container = document.createElement("div");
        container.classList.add("container");
        //work title
        let name = document.createElement("h3");
        name.innerText = i.fields?.workTitle?.toUpperCase();
        container.appendChild(name);
        //author
        let author = document.createElement("h4");
        card.classList.add("search-result");
        author.innerText = i.fields?.author?.replace(
          /\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
        let authorPreferredName = document.createElement("span");
        authorPreferredName.innerText = " (" + i.fields?.FirstName + ")".replace(
          /\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
  
        author.appendChild(authorPreferredName);
        container.appendChild(author);
  
        // check if preferred name exists
        var authorPreferredNameCheck = i.fields?.hasOwnProperty('FirstName');
        if (authorPreferredNameCheck) { } else {
          authorPreferredName.setAttribute("class", "hidden");
        }
  
  
        card.appendChild(container);
        document.getElementById("works").appendChild(card);
  
        // create modal section
        const modalSection = document.createElement("section");
        modalSection.setAttribute("id", i.id);
        modalSection.setAttribute("class", i.fields?.MainDiscipline + "border");
        modalSection.classList.add("modal");
        // create author introduction holder div
        const authorDetailHolder = document.createElement("div")
        authorDetailHolder.setAttribute("id", "author-detail");
        // create a div holding x and head shot
        const headShotHolder = document.createElement("div");
        // create a div holding close button
        const closeButton = document.createElement("a");
        closeButton.classList.add("close-button");
        // draw a cross sign
        const crossSign = document.createElement("strong");
        crossSign.innerHTML = "&times;";
        // include the cross sign to close button
        closeButton.appendChild(crossSign);
        // create the head shot img
        const headImage = document.createElement("img");
        headImage.setAttribute("loading", "lazy");
        headImage.setAttribute("id", "head-shot");
        headImage.setAttribute("src", i.fields?.HeatShot && i.fields?.HeatShot.length?i.fields?.HeatShot[0].url: null);
        headImage.setAttribute("alt", i.fields?.FirstName);
        // include the x and head shot img to author detail div
        headShotHolder.appendChild(closeButton);
        headShotHolder.appendChild(headImage);
  
        // create author bio div
        const authorBioHolder = document.createElement("div");
        authorBioHolder.setAttribute("id", "author-bio");
        // create author name
        const authorName = document.createElement("h2");
        authorName.setAttribute("id", "author");
        // match author
        authorName.innerText = i.fields?.author;
        // create preferred name span
        const preferredName = document.createElement("em");
        preferredName.setAttribute("id", "preferred-name");
        // match preferred name
        preferredName.innerText = " (" + i.fields?.FirstName + ")";
        // include preferred name into author
        authorName.appendChild(preferredName);
        // create graduate
        const graduate = document.createElement("span");
        graduate.innerText = "Graduate: " + i.fields?.IsGraduated;
        // create student number
        const studNo = document.createElement("span");
        studNo.setAttribute("id", "student-number");
        // match student number
        studNo.innerText = i.fields?.StudentNo;
        // create a line break
        const lineBreak = document.createElement("p");
        // create personal site link
        const personalSite = document.createElement("a");
        personalSite.setAttribute("id", "social-media");
        personalSite.setAttribute("target", "_blank");
        personalSite.setAttribute("href", i.fields?.Link1);
        // personalSite.innerText = "Website";
        // create personal website icon
        const personalSiteIcon = document.createElement("img");
        personalSiteIcon.setAttribute("id", "social-media-icons");
        personalSiteIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f40e24a1ae4f75a4099e/1667298318947/personalSite_author.png");
        // create Instagram link
        const instagram = document.createElement("a");
        instagram.setAttribute("id", "social-media");
        instagram.setAttribute("target", "_blank");
        instagram.setAttribute("href", i.fields?.instagram);
        // instagram.innerText = "Instagram";
        // create instagram icon
        const instagramIcon = document.createElement("img");
        instagramIcon.setAttribute("id", "social-media-icons");
        instagramIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f4261d399d27641f41d1/1667298342648/instagram_author.png");
        // create Facebook link
        const facebook = document.createElement("a");
        facebook.setAttribute("id", "social-media");
        facebook.setAttribute("target", "_blank");
        facebook.setAttribute("href", i.fields?.facebook);
        // facebook.innerText = "Facebook";
        // create facebook icon
        const facebookIcon = document.createElement("img");
        facebookIcon.setAttribute("id", "social-media-icons");
        facebookIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f43434338e670253e4eb/1667298356871/facebook_author.png");
        // create Twitter link
        const twitter = document.createElement("a");
        twitter.setAttribute("id", "social-media");
        twitter.setAttribute("target", "_blank");
        twitter.setAttribute("href", i.fields?.twitter);
        // twitter.innerText = "Twitter";
        // create twitter icon
        const twitterIcon = document.createElement("img");
        twitterIcon.setAttribute("id", "social-media-icons");
        twitterIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f4414792ed0d832ddf7e/1667298369540/twitter_author.png");
        // create YoutubePage link
        const youtubePage = document.createElement("a");
        youtubePage.setAttribute("id", "social-media");
        youtubePage.setAttribute("target", "_blank");
        youtubePage.setAttribute("href", i.fields?.youtubePage);
        // youtubePage.innerText = "YouTube";
        // create youtubepage icon
        const youtubePageIcon = document.createElement("img");
        youtubePageIcon.setAttribute("id", "social-media-icons");
        youtubePageIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f44e1d399d27641f4802/1667298382814/youtube_author.png");
        // create LinkedIn Link
        const linkedin = document.createElement("a");
        linkedin.setAttribute("id", "social-media");
        linkedin.setAttribute("target", "_blank");
        linkedin.setAttribute("href", i.fields?.linkedin);
        // linkedin.innerText = "LinkedIn";
        // create linkedin icon
        const linkedinIcon = document.createElement("img");
        linkedinIcon.setAttribute("id", "social-media-icons");
        linkedinIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f45aa69bb60c6523042e/1667298394232/linkedin_author.png");
        // create behance
        const behance = document.createElement("a");
        behance.setAttribute("id", "social-media");
        behance.setAttribute("target", "_blank");
        behance.setAttribute("href", i.fields?.behance);
        // behance.innerText = "Behance";
        // create behance icon
        const behanceIcon = document.createElement("img");
        behanceIcon.setAttribute("id", "social-media-icons");
        behanceIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f4657f89ac738b389064/1667298405366/behance_author.png");
        // create bilibili link
        const bilibili = document.createElement("a");
        bilibili.setAttribute("id", "social-media");
        bilibili.setAttribute("target", "_blank");
        bilibili.setAttribute("href", i.fields?.bilibili);
        // bilibili.innerText = "Bilibili";
        // create bilibili icon
        const bilibiliIcon = document.createElement("img");
        bilibiliIcon.setAttribute("id", "social-media-icons");
        bilibiliIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f46f3905a45d7f133c88/1667298415953/bilibili_author.png");
        // create tiktok link
        const tiktok = document.createElement("a");
        tiktok.setAttribute("id", "social-media");
        tiktok.setAttribute("target", "_blank");
        tiktok.setAttribute("href", i.fields?.tiktok);
        // tiktok.innerText = "TikTok";
        // create tiktok icon
        const tiktokIcon = document.createElement("img");
        tiktokIcon.setAttribute("id", "social-media-icons");
        tiktokIcon.setAttribute("src", "https://static1.squarespace.com/static/5f641f58c0c0c9743de8d1ff/t/6360f47b7f89ac738b389099/1667298427594/tiktok_author.png");
  
        // include social media icons
        personalSite.appendChild(personalSiteIcon);
        instagram.appendChild(instagramIcon);
        facebook.appendChild(facebookIcon);
        twitter.appendChild(twitterIcon);
        youtubePage.appendChild(youtubePageIcon);
        linkedin.appendChild(linkedinIcon);
        behance.appendChild(behanceIcon);
        bilibili.appendChild(bilibiliIcon);
        tiktok.appendChild(tiktokIcon);
  
  
        // check if preferred name has values
        var preferredNameCheck = i.fields?.hasOwnProperty('FirstName');
        if (preferredNameCheck) { } else {
          preferredName.setAttribute("class", "hidden");
        }
  
        // check if social media has values
        var personalSiteCheck = i.hasOwnProperty('personalSite');
        if (personalSiteCheck) { } else {
          personalSite.setAttribute("class", "hidden");
        }
  
        var instagramCheck = i.hasOwnProperty('instagram');
        if (instagramCheck) { } else {
          instagram.setAttribute("class", "hidden");
        }
  
        var facebookCheck = i.hasOwnProperty('facebook');
        if (facebookCheck) { } else {
          facebook.setAttribute("class", "hidden");
        }
  
        var twitterCheck = i.hasOwnProperty('twitter');
        if (twitterCheck) { } else {
          twitter.setAttribute("class", "hidden");
        }
  
        var youtubePageCheck = i.hasOwnProperty('youtubePage');
        if (youtubePageCheck) { } else {
          youtubePage.setAttribute("class", "hidden");
        }
  
        var linkedinCheck = i.hasOwnProperty('linkedin');
        if (linkedinCheck) { } else {
          linkedin.setAttribute("class", "hidden");
        }
  
        var behanceCheck = i.hasOwnProperty('behance');
        if (behanceCheck) { } else {
          behance.setAttribute("class", "hidden");
        }
  
        var bilibiliCheck = i.hasOwnProperty('bilibili');
        if (bilibiliCheck) { } else {
          bilibili.setAttribute("class", "hidden");
        }
  
        var tiktokCheck = i.hasOwnProperty('tiktok');
        if (tiktokCheck) { } else {
          tiktok.setAttribute("class", "hidden");
        }
  
        // create bio
        const bio = document.createElement("p");
        bio.setAttribute("id", "bio");
        // match bio
        bio.innerText = i.fields?.Bio;
        // include all elements to author bio
        authorBioHolder.appendChild(authorName);
        authorBioHolder.appendChild(graduate);
        authorBioHolder.appendChild(studNo);
        authorBioHolder.appendChild(lineBreak);
        authorBioHolder.appendChild(personalSite);
        authorBioHolder.appendChild(instagram);
        authorBioHolder.appendChild(facebook);
        authorBioHolder.appendChild(twitter);
        authorBioHolder.appendChild(youtubePage);
        authorBioHolder.appendChild(linkedin);
        authorBioHolder.appendChild(behance);
        authorBioHolder.appendChild(bilibili);
        authorBioHolder.appendChild(tiktok);
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
        category.innerText = i.fields?.MainDiscipline;
        // create work title
        const workTitle = document.createElement("h1");
        workTitle.setAttribute("id", "work-title");
        // match workTitle
        workTitle.innerText = i.fields?.workTitle;
        // create a video iframe
        const youtube = document.createElement("iframe");
        youtube.setAttribute("frameborder", "0");
        youtube.setAttribute("class", "desktop-only");
        youtube.setAttribute("loading", "lazy");
        youtube.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen");
        // match video iframe
        youtube.setAttribute("src", i.youtube);
        // create brief p
        const brief = document.createElement("p");
        brief.setAttribute("id", "brief");
        // match brief
        brief.innerText = i.brief;
        // create relevant image 1
        const relevantImageOne = document.createElement("img");
        relevantImageOne.setAttribute("src", i.relevantImageOne);
        relevantImageOne.setAttribute("loading", "lazy");
        // create relevant image 2
        const relevantImageTwo = document.createElement("img");
        relevantImageTwo.setAttribute("src", i.relevantImageTwo);
        relevantImageTwo.setAttribute("loading", "lazy");
        // create relevant image 3
        const relevantImageThree = document.createElement("img");
        relevantImageThree.setAttribute("src", i.relevantImageThree);
        relevantImageThree.setAttribute("loading", "lazy");
        // create relevant image 4
        const relevantImageFour = document.createElement("img");
        relevantImageFour.setAttribute("src", i.relevantImageFour);
        relevantImageFour.setAttribute("loading", "lazy");
        // create relevant image 5
        const relevantImageFive = document.createElement("img");
        relevantImageFive.setAttribute("src", i.relevantImageFive);
        relevantImageFive.setAttribute("loading", "lazy");
  
        // check if relevant image exists
        var relevantImageOneCheck = i.hasOwnProperty('relevantImageOne');
        if (relevantImageOneCheck) { } else {
          relevantImageOne.setAttribute("class", "hidden");
        }
  
        var relevantImageTwoCheck = i.hasOwnProperty('relevantImageTwo');
        if (relevantImageTwoCheck) { } else {
          relevantImageTwo.setAttribute("class", "hidden");
        }
  
        var relevantImageThreeCheck = i.hasOwnProperty('relevantImageThree');
        if (relevantImageThreeCheck) { } else {
          relevantImageThree.setAttribute("class", "hidden");
        }
  
        var relevantImageFourCheck = i.hasOwnProperty('relevantImageFour');
        if (relevantImageFourCheck) { } else {
          relevantImageFour.setAttribute("class", "hidden");
        }
  
        var relevantImageFiveCheck = i.hasOwnProperty('relevantImageFive');
        if (relevantImageFiveCheck) { } else {
          relevantImageFive.setAttribute("class", "hidden");
        }
  
        // check if embed video link exists
        var youtubeCheck = i.hasOwnProperty('youtube');
        if (youtubeCheck) { } else {
          youtube.setAttribute("class", "hidden");
        }
  
        // include all elements to work detail div
        workDetailHolder.appendChild(category);
        workDetailHolder.appendChild(workTitle);
        workDetailHolder.appendChild(youtube);
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
  
      })
  }