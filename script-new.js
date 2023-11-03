let api_key = "patVKblZfAGWYZJVI.ce2c55fd2190a22dab4c276f2d1d352d1ce9fee298a3ab06a405458a5826baa0"; //Production Token
let studentTableId = "tblo1Uy6qYCc0VmAY";
let projectTableId = "tblgELmnJBr2DKFen";
let baseId = "appo5ug4IJkVex4Oc;"


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
    const apiUrl = `https://api.airtable.com/v0/${baseId}/Students?maxRecords=10`;
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


function getHomePageData (){
    // API URL
    const apiUrl = `https://api.airtable.com/v0/${baseId}/Projects?maxRecords=10`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${api_key}`, // Replace with your actual token
            'Content-Type': 'application/json'
        }
    };
    const queryParams = ''

    // Fetch data from the API
    return fetch(apiUrl+encodeURI(queryParams), requestOptions)
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
}