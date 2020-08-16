document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
// Submit Issue
function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value; // getInputValue means a function
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    total();
    close();
    e.preventDefault();
}
// Close Issue
const closeIssue = id => {
        const issues = JSON.parse(localStorage.getItem('issues')); //real obj
        //console.log(issues);
        const currentIssue = issues.find((issue) => {
            return issue.id == id
        });
        currentIssue.description = currentIssue.description.strike();
        currentIssue.status = 'Closed';
        localStorage.setItem('issues', JSON.stringify(issues));
        total();
        close();
        fetchIssues();
    }
    // Delete Issue
const deleteIssue = id => {
        const issues = JSON.parse(localStorage.getItem('issues'));
        //console.log(issues);
        const remainingIssues = issues.filter(a => {
                return a.id != id;
            })
            //console.log(remainingIssues);
        localStorage.setItem('issues', JSON.stringify(remainingIssues));
        total();
        close();
        fetchIssues();
    }
    // Fetch Issue
const fetchIssues = () => {
        total();
        close();
        const issues = JSON.parse(localStorage.getItem('issues')); //pure obj
        //console.log(issues);   //really obj er array 
        const issuesList = document.getElementById('issuesList');
        issuesList.innerHTML = ''; //very important this line

        for (var i = 0; i < issues.length; i++) {
            const { id, description, severity, assignedTo, status } = issues[i];

            issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
        }
    }
    // Total Count
const total = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    document.getElementById("total").innerText = issues.length;
}
const close = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    let close = 0;
    issues.map(v => {
        if (v.description[0] == '<') {
            close++;
        }
    })
    document.getElementById("close").innerText = close;
}