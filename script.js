var dropdown_menu = document.getElementById("lang");
var run_button = document.getElementById("compile");
console.log(run_button);
var langCode;
var option = document.getElementsByClassName("options");
var codebox = document.getElementById("codebox");
var outputbox = document.getElementById("outputbox");

dropdown_menu.onchange = function ()
{
    langCode = dropdown_menu.value;
}
// run_button.addEventListener("click", function () {
//     alert("hello");
// });
run_button.addEventListener("click",function()
{
    console.log("I will run");
    obj =
    {
        code: codebox.value,
        langId:langCode,
    }
    var request = new XMLHttpRequest();
    request.open("POST"," https://codequotient.com/api/executeCode");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(obj));
    request.addEventListener("load", function (event) {
        var codeId=JSON.parse(event.target.responseText).codeId;
       console.log(codeId);
        if (codeId === undefined)
        {
        outputbox.innerHTML= JSON.parse(event.target.responseText).error;
        }
        else{
          setTimeout(function(){
          var requests = new XMLHttpRequest();
          requests.open("GET" , `https://codequotient.com/api/codeResult/${codeId}`)
          requests.send();
          requests.addEventListener("load" , function(events){
          var result = JSON.parse(events.target.responseText).data;
          var errors=JSON.parse(result).errors;
          var output=JSON.parse(result).output;
          console.log(result,errors);
          if(errors===''){
              outputbox.innerHTML=output;
          }else{
              outputbox.innerHTML=errors; 
          }
          })
          }, 3000)
            outputbox.innerHTML="Compiling";
    //   consoleData.innerHTML="Compiling the program ...";
      }
    })

}
);


