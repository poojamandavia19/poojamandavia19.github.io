let api_key = "patVKblZfAGWYZJVI.ce2c55fd2190a22dab4c276f2d1d352d1ce9fee298a3ab06a405458a5826baa0"; //Production Token
let studentTableId = "tblo1Uy6qYCc0VmAY";
let projectTableId = "tblgELmnJBr2DKFen";
let baseId = "appo5ug4IJkVex4Oc"


getHomePageData();
// getStudentInformationByRecordId("recN55j34e92kaisi", "recpTnaGPsukQTTxK");

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
    const fieldsToFetch = 'fields%5B%5D=StudentFirstName&fields%5B%5D=StudentLastName&fields%5B%5D=ProjectTitle&fields%5B%5D=HeroImage&fields%5B%5D=LinkedStudentRecordId'
    const fieldsToFetchArr = ['StudentFirstName', 'StudentLastName', 'ProjectTitle', 'HeroImage', 'LinkedStudentRecordId'];
    const maxRecords = 'maxRecords=10';

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
                    HeroImage: item.fields.HeroImage && item.fields.HeroImage.length ? item.fields.HeroImage[0]: '',
                    LinkedStudentRecordId: item.fields.LinkedStudentRecordId && item.fields.LinkedStudentRecordId.length ? item.fields.LinkedStudentRecordId[0]: '',
                })
            }); 
            console.log(projectDetails);
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
    const fieldsToFetch = 'fields%5B%5D=StudentFirstName&fields%5B%5D=StudentLastName&fields%5B%5D=ProjectTitle&fields%5B%5D=HeroImage&fields%5B%5D=LinkedStudentRecordId'
    const maxRecords = 'maxRecords=10';

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