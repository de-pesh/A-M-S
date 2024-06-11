function login() {

    var output = document.getElementById("output");
    
    var id = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var name;
    var user;
    var loggedIn;

    fetch("users.csv")
      .then((response) => response.text())
      .then((text) => {

        const rows = text.split("\n");
        const csvData = rows.map((row) => row.split(","));
        
        for(i=0;i<csvData.length;i++){
            if (id == csvData[i][1] && pass == csvData[i][2] && csvData[i][3] == 'a'){
                name = csvData[i][0];
                user = 1;
                loggedIn = true;
                break;
            } else if(id == csvData[i][1] && pass == csvData[i][2] && csvData[i][3] == 'u'){
                name = csvData[i][0];
                user = 0;
                loggedIn = true;
                break;
                
            }
        }
        if(loggedIn && user == 1){
            window.location.href = "/admin.html";
        } else if(loggedIn && user == 0){
            window.location.href = "/user.html";
        }
            
      }).catch((error) => console.error("Error loading CSV:", error));
      output.textContent = "Invalid UserId or Password";
}

function write(){

    const data = [
        ['Name', 'Age', 'City'],
        ['Alice', '30', 'New York'],
        ['Bob', '25', 'Los Angeles'],
        ['Charlie', '35', 'Chicago']
    ];

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    a.click();

}
