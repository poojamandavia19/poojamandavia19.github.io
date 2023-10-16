// let api_key = "pat0bkVL8VQJizhZA.7e7cda2dc3ba5dd9e2fb945b9fa1ce217fb15a640c57bef9bd841e6ea9900476";
let api_key = "patBWMSLb3bbPBKZo.13639f1100fd160e1f6559dfe04f47ac2a1deb5525c18e928da1658fec58d51d"; //12/10/23
// "patZoVMI7TcZMpmTA.486e70dda7668a3e5ecb4542fd86f85696774086d776bb92fb5930057cdda263"; //12/10/23
// patBWMSLb3bbPBKZo.cb11a8555f3f0edf2345f5ed75f40b98469ddad15b4786cc2a6ca2e637e3df0c
//patBWMSLb3bbPBKZo.d9b50e772e0f9697cca3fe8a81c191dbb580abb091bfd71d5a0831e0612cca0f

document.addEventListener("DOMContentLoaded", () => {
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
             data.records.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `Title: ${item.id}, Body: ${item.fields.FirstName || " "} ${item.fields.LastName || " "}`;
                dataList.appendChild(li);
            }); 
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