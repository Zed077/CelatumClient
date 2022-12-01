var message = "Hello, World!";
// create a new heading 1 element
var heading = document.createElement("h1");
heading.textContent = message;
// add the heading the document
document.body.appendChild(heading);
var content = document.createElement("h2");
content.textContent = "doishfaosh";
/*
fetch("http://localhost:12689/Celatum/HelloWorld")
  .then((response) => response.json())
  .then((data) => content.textContent = data);
*/ document.body.appendChild(content);
fetch("http://localhost:12689/Celatum/HelloWorld")//fetch('style.css', {mode: 'no-cors'})
.then((response)=>{
    if (!response.ok) throw new Error("Network response was not OK " + response.status + " " + response.statusText);
    return response.blob();
}).then((myBlob)=>{
    console.log(myBlob);
}).catch((error)=>{
    console.error("There has been a problem with your fetch operation:", error);
});

//# sourceMappingURL=index3.7c0ccee6.js.map
